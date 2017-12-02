import { map, addIndex, reduce, concat } from 'ramda';

import { EOF, LAMBDA } from '../utils/specialSymbol';
import grammar from '../utils/grammar';


// Conjuntos de first e follow
let firstSets = {};
let followSets = {};

// Se recebe S -> A retorna S
const getLHS = production => production.split('->')[0].replace(/\s+/g, '');
// Se recebe S -> A retorna A
const getRHS = production => production.split('->')[1].replace(/\s+/g, '');

const buildSet = builder => map(production => builder(production[0]), grammar);

const buildFirstSets = () => {
  firstSets = {};
  return buildSet(firstOf);
};

const buildFollowSets = () => {
  followSets = {};
  return buildSet(followOf);
};

const isTerminal = symbol => !/[A-Z]/.test(symbol);

const merge = (to, from, exclude = []) =>
  addIndex(map)(
    (item, index) => (exclude.indexOf(index) === -1 ? item : to[index]),
    from,
  );

const firstOf = (symbol) => {
  if (firstSets[symbol]) firstSets[symbol];

  let first = (firstSets[symbol] = {});

  if (isTerminal(symbol)) {
    first[symbol] = true;
    return firstSets[symbol];
  }

  const productionsForSymbol = getProductionsBySymbol(symbol);
  const rightProductions = map(getRHS, productionsForSymbol);
  map((productionSymbol) => {
    if (productionSymbol === LAMBDA) {
      first[LAMBDA] = true;
    } else {
      const firstOfNonTerminal = firstOf(productionSymbol);
      if (!firstOfNonTerminal[LAMBDA]) {
        first = merge(first, firstOfNonTerminal);
      } else {
        first = merge(first, firstOfNonTerminal, [LAMBDA]);
      }
    }
  }, rightProductions);
  return first;
};

function getProductionsBySymbol(symbol) {
  let productionsForSymbol = {};
  for (let k in grammar) {
    if (grammar[k][0] === symbol) {
      productionsForSymbol[k] = grammar[k];
    }
  }
  return productionsForSymbol;
}

const followOf = (symbol) => {
  if (followSets[symbol]) return followSets[symbol];

  let follow = (followSets[symbol] = {});

  if (symbol === EOF) {
    follow[EOF] = true;
  }

  const productionsWithSymbol = getProductionsWithSymbol(symbol);
  map((productionSymbol) => {
    let newFollow;
    const rightProduction = getRHS(productionsWithSymbol);
    if (rightProduction.length === 1) { // {$}
      const LHS = getLHS(productionSymbol);
      if (LHS !== productionSymbol) { // To avoid cases like: B -> aB
        newFollow = merge(follow, followOf(LHS));
      }
    }
    const symbolIndex = rightProduction.indexOf(symbol);
    const followIndex = symbolIndex + 1;
    const followSymbol = rightProduction[followIndex];
    const firstOfFollow = firstOf(followSymbol);
    if (!firstOfFollow[LAMBDA]) {
      newFollow = merge(follow, firstOfFollow);
    }
    newFollow = merge(follow, firstOfFollow, [LAMBDA]);
    return newFollow;
  }, productionsWithSymbol);

  return follow;
};

const getProductionsWithSymbol = (symbol) => {
  return reduce(
    (acc, production) => {
      const RHS = getRHS(production);
      return RHS.includes(symbol)
        ? concat(acc, [production])
        : acc;
    },
    [],
    grammar,
  );
};

export default { buildFirstSets, buildFollowSets };
