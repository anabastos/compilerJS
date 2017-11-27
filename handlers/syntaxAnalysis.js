import { append, curry, take, map, propEq } from 'ramda';
import errorHelper from '../utils/errorHelper';

const parser = tokenObj =>
  propEq('error', 'lexical')(tokenObj) ? tokenObj : topDown(tokenObj);

const topDown = obj => map(curry(parsingTable)(obj.table), obj.tokens);

const parsingTable = (table, token, stackChain = ['$']) => {
  const lambda = 'λ'; //vazio
  const TST = table;
  let simbol = token;
  let pilha = stackChain;

  const firstSet = {};
  const followSet = {};

  const getProduction = simbol => simbol;

  const stack = simbol => append(simbol, chainsStack);
  const pop = simbol => take(-1, chainsStack);
  const isTerminal = simbol => simbol.type;

  const first = simbol => {};
  const follow = simbol => {};
  return {
    reset: (token, chain) => {
      simbol = token;
      pilha = chain;
    },
    walk: () => {
      return isTerminal(simbol);
    }
  };
};

export default parser;
