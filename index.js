import { rainbow, bgCyan, bold, random } from 'colors';
import { curry } from 'ramda';
import { promisify } from 'util';
import fs from 'fs';

import lexan from './handlers/lexicalAnalysis';
import parser from './handlers/syntaxAnalysis';
import tst from './handlers/tst/tst';

console.log(bold('COMP NA8 - PUC SP 2017'));
console.log('  ');
console.log(bgCyan('|-=-=-=-=-=-=-=-|'));
console.log(bgCyan('||') + bold(rainbow('COMPILADOR JS')) + bgCyan('||'));
console.log(bgCyan('|-=-=-=-=-=-=-=-|'));
console.log(bold(random('Iniciando...')));
console.log('  ');

const readFile = path => promisify(fs.readFile)(path);

const logTokens = curry((info, tokens) => {
  info === '#list_token_on' && console.log(tokens);
  return tokens;
});

const compile = (input, info) => {
  readFile(input)
    .then(lexan(info))
    .then(logTokens(info))
    .then(parser)
    .then(console.log)
    .catch(console.error);
};

// INFOS: #list_token_on | #list_token_off | #list_tst | #list_tnt | #list_tgrf |
// #list_source_on | #list_source_off
const file = process.env.npm_package_config_file;
console.log(`Compiling ${file}`);
compile(`${file}.txt`, '#list_token_on', 'tst/output/test_1');
// compile(`${process.env.npm_config_file || 'test2'}.txt`, '#list_token_on', 'tst/output/test_1');

console.log(bgCyan('-=-=-=-=-=-=-=-'));
