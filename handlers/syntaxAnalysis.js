import { append, curry, dropLast, map, reduce, propEq, addIndex } from 'ramda';

import errorHelper from '../utils/errorHelper';
import { EOF, LAMBDA } from '../utils/specialSymbol';
import sets from './firstFollow';
import S from '../utils/CFG';
import TNT from './tst/tst';

const stack = (symbol, arr) => append({ value: symbol.value, type: symbol.type }, arr);
const pop = arr => dropLast(1, arr);
const getTop = arr => arr[-1];
// 1 para terminal, 0 para não terminal
const isTerminal = symbol => symbol == ('SIMBOL' || 'WORD') ? 1 : 0;
const isEOF = tgrf => getTop(tgrf.registry) === EOF;
const isLambda = symbol => symbol === LAMBDA;

const rotSemantic = () => {};
const grafoAlt = () => {};

const topDown = (obj) => {
  const tables = { TST: obj.table, TNT: TNT.hashTable() };
  const TGRFTabled = curry(TGRF)(tables);
  return reduce(TGRFTabled, {
    registry: [EOF],
    itgrf: -1,
    accepted: false,
    itgrfErro: -1, // Apontador pro nó da lista de tokens em erro
  }, obj.tokens);
};

const constructParsingTable = () => {};

const parser = tokenObj => propEq('error', 'lexical')(tokenObj) ? tokenObj : topDown(tokenObj);

// table => tst tnt
// registry => ADT
// token => cadeia
// itgrf => aponta pro nó corrente
const TGRF = (tables, acc, token) => {
  let lookahead = token.value;
  if (!isEOF(acc)) {    
    if (isLambda(token.value)) {
      rotSemantic();
      acc.itgrfErro = token.tst;
    } else {
      if (isTerminal(token.type)) {
        acc.itgrf = token.tst;
        if (lookahead === token.value) {
          rotSemantic(acc);
          acc.itgrfErro = token.tst;
          lookahead = token.value
        } else {
          grafoAlt() || errorHelper.syntaxError(token.position, `Erro sintático em ${token.value}`)
        }
      } else {
        acc.registry = stack(token, acc.registry);
        tables.TNT.actionTable('I', token.value);
      }
    }
  } else {
    if (acc.registry.length > 1) {
      acc.registry = pop(acc.registry);
      rotSemantic();
    } else {
      acc.accepted = (isEOF(acc)) ? acc : { erro: 1 };
    }
  }
  return acc;
};

export default parser;
