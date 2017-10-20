import { rainbow, bgCyan, bold, random } from 'colors'
import { curry } from 'ramda'
import { promisify } from 'util'
import fs from 'fs'

import lexan from './handlers/lexicalAnalysis'
import transverser from './handlers/syntaxAnalysis'
import test from './handlers/tst/tst'

console.log(bold('COMP NA8 - PUC SP 2017'))
console.log('  ')
console.log(bgCyan('|-=-=-=-=-=-=-=-|'))
console.log(bgCyan('||') + bold(rainbow('COMPILADOR JS')) + bgCyan('||'))
console.log(bgCyan('|-=-=-=-=-=-=-=-|'))
console.log(bold(random('Iniciando...')))
console.log('  ')

const readFile = path => promisify(fs.readFile)(path)

const compile = (input, info, tst) => {
    readFile(input)
        .then(curry(lexan)(info))
        .then(tokens => info === '#list_token_on' && console.log(tokens) || tokens)     
        // .then(transverser)
        .catch(console.error)
}

// ATV 1: Testar TST 
// test()


// ATV 2: LEXAN
// INFOS: #list_token_on | #list_token_off | #list_tst | #list_tnt | #list_tgrf | #list_source_on | #list_source_off
compile('test.txt', '#list_token_on', 'tst/output/test_0')

console.log(bgCyan('-=-=-=-=-=-=-=-'))
