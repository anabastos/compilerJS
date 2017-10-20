import { pipe, map, reduce } from 'ramda'
import { promisify } from 'util'
import fs from 'fs'

import tst from './tst/tst'
import regexObj from '../utils/lexicalRegex'
import errorHelper from '../utils/errorHelper'

// Separa em linhas
const splitReaderToLines = content => content.toString().split('\n')

// to_char()
const toChar = content => content.map(line => line.split(''))

// ler_simbolo() 
//Gera token
const readSimbol = (item, line, table, reservedItems) => item.map((char, index) => {
    const typeOfChar = getTypeOfToken(char)
    const tstIndex = table.actionTable('I', char)
    typeOfChar || errorHelper('Léxico', line, `Simbolo ${item}  inexistente no alfabeto.`)
    return makeTokenObj(char, typeOfChar, tstIndex, {line, index})
})

const readLines = arr => {
    const table = tst.hashTable();
    return getReservedItens().then(
        reservedItems => arr.map((char, line) => readSimbol(char, line, table, reservedItems.toString().split('\n')))
    ).catch(console.error)
}

// Pega o tipo do token por regex
const getTypeOfToken = item => {
    const checkedByRegex = Object.keys(regexObj).reduce((acc, regex) => {
        return item.match(regex) 
            ? regexObj[regex] 
            : acc
    }, null)
    
    const type = checkIfReserved(checkedByRegex)

    const accepted = type !== null;
    accepted 
        ? console.log(`Cadeia aceita ${item}`)
        : console.log(`Cadeia rejeitada ${item}`)

    return type
}


// todo

// errorHelper('Léxico', line, `Simbolo ${item}  inexistente no alfabeto.`)
// errorHelper('Léxico', line, `Diretiva de compilação inexistente..`)
// errorHelper('Léxico', line, `Comentários sem fechamento..`)
// errorHelper('Léxico', line, `Constante alfanumerica sem encerramento..`)

// considerar só um espaço
// considerar comentarios
// abrir e fechar de delimitadores

// definicao de constantes
// NUMBER
// - ALPHA
// - IDENT
// - EOF
// - FLOAT


const checkIfReservedWord = value => {
    // palavra reservada ou simbolo reservado
    return value
}

const checkIfSimbol = value => {
    // palavra reservada ou simbolo reservado
    return value
}

const removeTabsAndLF = arr => arr.filter(token => token.type !== ('LF' || 'tab'))

const filterSpaces = arr => arr.filter(token => token.type !== 'b')

const getReservedItens = () => {
    return promisify(fs.readFile)('./utils/reservedWords.txt')
}

// a) Item Léxico: cadeia de caracteres referente ao token.
// b) Valor numérico do inteiro.
// c) Valor numérico do tipo float.
// d) O conteúdo armazenado na TST referente ao índice retornado. Não tem utilidade
// para fins de compilador. Apenas para verificação do funcionamento do Lexan.
const makeTokenObj = (item, type, tstIndex) => ({ type: type, value: item, tst: tstIndex})

const lexan = file => pipe(
    splitReaderToLines,
    toChar,
    readLines)(file)

export default lexan