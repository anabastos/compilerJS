import { append, curry, take, map, propEq } from 'ramda';
import errorHelper from '../utils/errorHelper';

const parser = tokenObj =>
  propEq('error', 'lexical')(tokenObj) ? tokenObj : topDown(tokenObj);

const topDown = obj => map(curry(parsingTable)(obj.table), obj.tokens);

const parsingTable = (table, token, defStack = ['$']) => {
  const lambda = 'λ'; // vazio
  const TST = table;
  const tokenSimbol = token;
  const stackChain = defStack;

  const firstSet = {};
  const followSet = {};

  const getProduction = simbol => simbol;

  const stack = simbol => append(simbol, stackChain);
  const pop = simbol => take(-1, stackChain);
  const isTerminal = simbol => simbol.type;

  const first = simbol => {};
  const follow = simbol => {};
  return {
    reset: (token, chain) => {
      simbol = token;
      pilha = chain;
    },
    walk: simbol => isTerminal(simbol),
  };
};

export default parser;
