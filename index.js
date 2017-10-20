import { rainbow, bgCyan, bold, random } from 'colors'
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
        .then(lexan)
        .then(transverser)
        .catch(console.error)
}

// ATV 1: Testar TST 
// test()

// ATV 2: LEXAN
compile('test.txt', '', 'tst/output/test_0')

console.log(bgCyan('-=-=-=-=-=-=-=-'))
