
const multDiv = ['*', '/'];
const plusMinus = ['+', '-'];

const ident = 'NT';
const number = 'NT';
const comparation = 'NT';

const factor = [
  [ident],
  [number],
  ['(', expression, ')'],
];

const term = [
  [factor],
  [factor, multDiv, factor],
];

const expression = [
  [term],
  [plusMinus, term],
];

const condition = [
  [expression, comparation, expression],
];

const block = [
  ['var', ident, '=', number, ';'],
  ['var', ident, ';'],
  [statement, ";"],
];

const statement = [
  ['call', ident],
  ['goto', ident],
  ['if', condition, 'then', statement],
  ['while', condition, 'then', statement],
  ['return', expression],
];

const S = block;

export default S;
