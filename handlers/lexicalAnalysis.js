import { pipe, map, reduce, flatten, curry, concat } from 'ramda';
import { promisify } from 'util';
import fs from 'fs';

import tst from './tst/tst';
import regexObj from '../utils/lexicalRegex';
import errorHelper from '../utils/errorHelper';

// Separa em linhas
const splitReaderToLines = content => content.toString().split('\n');

// to_char()
const toChar = content => content.map(line => line.split(' '));

const readLines = async (info, arr) => {
  // const table = tst.hashTable()
  const table = await tst.createPopulatedTable()  

  const tokenizer = arr.reduce(
    (acc, line, lineIndex) => {
      // começa processo de ler simbolos
      if (line.includes('%{')) {
        acc.deps = ' %{';
        const index = arr.indexOf('%{');
      }
      if (line.includes('%}')) {
        acc.deps === '%{'
          ? (acc.deps = null)
          : errorHelper.lexError('%}', 'comment', `${lineIndex}`);
      }
      const filteredline = filterLine(line);

      const tokenAcc = {
        tokens: [generateToken(filteredline, lineIndex, table), ...acc.tokens],
        deps: acc.deps
      };
      return tokenAcc;
    },
    { tokens: [], deps: null }
  ).tokens;

  const tokens = flatToken(tokenizer);
  info === '#list_tst' && table.printTable();
  return tokens;
};

const generateToken = (filteredline, lineIndex, table) => {
  const token = readSimbol(filteredline, lineIndex, table);
  return token;
};

// ler_simbolo()
//Gera token
const readSimbol = (item, line, table) =>
  item.map((char, index) => {
    const typeOfChar = getTypeByRegex(char);
    const checkedReserved = checkIfReserved(char, table);

    const type = checkedReserved.type || typeOfChar;
    const position = `${line}:${index}`;

    const token = { value: char, type, tst: checkedReserved.tst, position };
    
    return errorHelper.lexRegex(char, type, position) || token;
  });

// Pega o tipo do token por regex
const getTypeByRegex = item => {
  const checkedByRegex = Object.keys(regexObj).reduce((acc, regex) => {
    return item.match(regex) ? regexObj[regex] : acc;
  }, null);

  return checkedByRegex;
};

const filterLine = line =>
  pipe(filterSpaces, removeTabsAndLF, filterSingleComments)(line);

const removeTabsAndLF = arr =>
  arr.filter(token => token.type !== ('LF' || 'tab'));

const filterSpaces = arr => arr.filter(item => item !== '');
// const filterSpaces = arr => arr.filter((item, i, arr) => arr[i - 1] !== ' ' || item !== ' ');

const filterSingleComments = arr => {
  const index = arr.indexOf('//');
  return !!~index ? arr.splice(0, index) : arr;
};

const checkIfReserved = (value, table) => {
  const filteredValue =
    value[0] === '#' || value[0] === '@' ? value.slice(1) : value;
  const tstIndex = table.actionTable('C', filteredValue);
  
  const type = !!~tstIndex ? checkTypeOfReserved(filteredValue) : null
  return { type: type, tst: tstIndex };
};

const checkTypeOfReserved = value =>
  value.match('[a-zA-Z]+') ? 'WORD' : 'SIMBOL';

const getReservedItens = () => {
  return promisify(fs.readFile)('./utils/reservedWords.txt');
};

const lexan = (info, file) => {
  return pipe(splitReaderToLines, toChar, curry(readLines)(info))(file);
};

const flatToken = lines => [].concat.apply([], lines);

export default lexan;