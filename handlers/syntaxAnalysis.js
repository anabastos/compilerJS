import { append, curry, take, map, reduce, propEq, addIndex } from 'ramda';

// inserir no tnt
// corrigir automatos

import errorHelper from '../utils/errorHelper';
import { EOF, LAMBDA } from '../utils/specialSymbol';
import TNT from './tst/tst';

// const first = symbol => {};
// const getProduction = symbol => symbol;
// const firstSet = {};
// const followSet = {};

// Simbolo inicial (indice do TNT)
const S = 1;

const stack = (symbol, arr) => append(symbol, arr);
const pop = arr => take(-1, arr);

// 1 para terminal, 0 para não terminal
const isTerminal = symbol => symbol ? 1 : 0;
const isEOF = symbol => symbol === EOF;
const isLambda = symbol => symbol === LAMBDA;

const rotSemantic = () => {};
const grafoAlt = () => {};

// table => tst tnt
// registry => ADT
// token => cadeia
// itgrf => aponta pro nó corrente
const TGRF = (tables, acc, token, itgrf) => {
  if (!isEOF(token.value)) {
    acc.registry[-1]; //checa se vazio
    if (!isLambda(token.value)) {
      rotSemantic();
      acc.itgrfErro = token.tst;
    } else {
      if (isTerminal(token.value)) {
        if (lookahead(token.value)) {
          rotSemantic();
          acc.itgrfErro = token.tst;
        } else {
          grafoAlt() || errorHelper.syntaxError(token.position, `Erro sintático em ${token.value}`)
        }
      } else {
        acc.registry = stack(token, registry);
        tables.TNT.actionTable('I', token.value);
      }
    }
  } else {
    if (acc.stack[-1]){
      pop(acc.stack);
      rotSemantic();
    } else {
      return (isEOF(lookahead(token.value))) ? acc : {erro: 1}
    }
  }
};

const topDown = (obj) => {
  const tables = { TST: obj.table, TNT: TNT.hashTable() };
  return addIndex(reduce)(curry(TGRF)(tables), {
    stackChain: [],
    registry: [],
    itgrfErro: -1, // Apontador pro nó da lista de tokens em erro
  }, obj.tokens);
};

const parser = tokenObj => propEq('error', 'lexical')(tokenObj) ? tokenObj : topDown(tokenObj);

export default parser;
