import { pipe, map, reduce, flatten, curry, concat } from 'ramda'
import { promisify } from 'util'
import fs from 'fs'

import tst from './tst/tst'
import regexObj from '../utils/lexicalRegex'
import errorHelper from '../utils/errorHelper'

// Separa em linhas
const splitReaderToLines = content => content.toString().split('\n')

// to_char()
const toChar = content => content.map(line => line.split(' '))

const readLines = (info, arr) => {
    const table = tst.hashTable();
    const tokens = getReservedItens()
        .then(reservedItems => {
                const formatReserved = reservedItems.toString().split('\n')
                return arr.map((line, lineIndex) => {
                    const filteredline = filterLine(line)
                    // começa processo de ler simbolos
                    return generateToken(filteredline, lineIndex, table, formatReserved)})
            })
        .then(flatToken)
        .catch(console.error)
    info === '#list_tst' && table.printTable()
    return tokens
}

const generateToken = (filteredline, lineIndex, table, formatReserved) => readSimbol(filteredline, lineIndex, table, formatReserved)

// ler_simbolo() 
//Gera token
const readSimbol = (item, line, table, reservedItems) => item.map((char, index) => {
    const typeOfChar = getTypeByRegex(char)
    const tstIndex = table.actionTable('I', char)
    const type = checkIfReserved(char, reservedItems) || typeOfChar
    const position = `${line}:${index}`

    const token = {value: char, type, tst: tstIndex, position}
    
    return errorHelper.lex(char, type, position) || token
})

// Pega o tipo do token por regex
const getTypeByRegex = item => {
    const checkedByRegex = Object.keys(regexObj).reduce((acc, regex) => {
        return item.match(regex) 
            ? regexObj[regex] 
            : acc
    }, null)
    
    return checkedByRegex
}

const filterLine = line => pipe(
    filterSpaces,
    removeTabsAndLF,
    filterSingleComments
)(line)

const removeTabsAndLF = arr => arr.filter(token => token.type !== ('LF' || 'tab'))

const filterSpaces = arr => arr.filter((item) => item !== '');
// const filterSpaces = arr => arr.filter((item, i, arr) => arr[i - 1] !== ' ' || item !== ' ');

const filterSingleComments = arr => {
    const index = arr.indexOf('//')
    return !!~index ? arr.splice(0, index) : arr
}

const checkIfReserved = (value, reserved) => {
    var indexToSplit = reserved.indexOf('-=');
    
    var words = reserved.slice(0, indexToSplit);
    var simbols = reserved.slice(indexToSplit);
    
    return checkIfReservedSimbol(value, simbols) || checkIfReservedWord(value, words)
}

const getReservedItens = () => {
    return promisify(fs.readFile)('./utils/reservedWords.txt')
}

const checkIfReservedWord = (value, words) => {
    const valueWord = value[0] === '#' ? value.slice(1) : value
    return words.includes(valueWord) ? 'WORD' : null
}
const checkIfReservedSimbol = (value, words) => words.includes(value) ? 'SIMBOL' : null

const lexan = (info, file) => {
    return pipe(
        splitReaderToLines,
        toChar,
        curry(readLines)(info))(file)
}

const flatToken = lines => [].concat.apply([], lines);

export default lexan

// TODO
//[x] agrupar chars
//[x] considerar só um espaço
//[x] considerar comentarios
// considerar comentarios multilinha
// abrir e fechar de delimitadores
// diretiva de compilação(#)
//[x] checar se num reservado
//[x] checar se simbolo reservado
