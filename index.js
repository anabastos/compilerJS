import { rainbow, bgCyan, bold, random } from 'colors'
import { pipe } from 'ramda'

import tokenizer from './handlers/lexicalAnalysis'
import lexicalScan from './handlers/syntaxAnalysis'

console.log(bold('COMP NA8 - PUC SP 2017'))
console.log('  ')
console.log(bgCyan('|-=-=-=-=-=-=-=-|'))
console.log(bgCyan('||') + bold(rainbow('COMPILADOR JS')) + bgCyan('||'))
console.log(bgCyan('|-=-=-=-=-=-=-=-|'))
console.log(bold(random('Iniciando...')))
console.log('  ')

const readFile = () => '( ana 8'

const parser = pipe(
    readFile,
    tokenizer,
    console.log
)
parser()

console.log(bgCyan('-=-=-=-=-=-=-=-'))
