import { pipe, map, reduce } from 'ramda'
import { promisify } from 'util'
import fs from 'fs'

import tst from './tst/tst'
import regexObj from '../utils/lexicalRegex'
import errorHelper from '../utils/errorHelper'

// Separa em linhas
const splitReaderToLines = content => content.toString().split('\n')

// to_char()
const toChar = content => content.map(line => line.split(' '))


const readLines = arr => {
    const table = tst.hashTable();
    return getReservedItens().then(
        reservedItems => {
            const formatReserved = reservedItems.toString().split('\n')
            return arr.map((line, lineIndex) => {
                const filteredline = filterLine(line)
                return readSimbol(filteredline, lineIndex, table, formatReserved)})
        }
    ).catch(console.error)
}

// ler_simbolo() 
//Gera token
const readSimbol = (item, line, table, reservedItems) => item.map((char, index) => {
    const typeOfChar = getTypeByRegex(char)
    const tstIndex = table.actionTable('I', char)
    const type = checkIfReserved(char, reservedItems) || typeOfChar

    const accepted = type !== null;
    // accepted 
        // ? console.log(`Cadeia aceita ${item}`)
        // : console.log(`Cadeia rejeitada ${item}`)

    // accepted || errorHelper('Léxico', line, `Simbolo ${item}  inexistente no alfabeto.`)
    return makeTokenObj(char, type, tstIndex, {line, index})
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

const checkIfReservedWord = (value, words) => words.includes(value) ? 'WORD' : null
const checkIfReservedSimbol = (value, words) => words.includes(value) ? 'SIMBOL' : null

const makeTokenObj = (item, type, tstIndex, position) => ({ type: type, value: item, tst: tstIndex, position: `${position.line}:${position.index}`})

const lexan = file => pipe(
    splitReaderToLines,
    toChar,
    readLines)(file)

export default lexan


// todo

// errorHelper('Léxico', line, `Simbolo ${item}  inexistente no alfabeto.`)
// errorHelper('Léxico', line, `Diretiva de compilação inexistente..`)
// errorHelper('Léxico', line, `Comentários sem fechamento..`)
// errorHelper('Léxico', line, `Constante alfanumerica sem encerramento..`)

//[x] considerar só um espaço
//[x] considerar comentarios
// considerar comentarios multilinha
// abrir e fechar de delimitadores
//[x] checar se num reservado
//[x] checar se simbolo reservado

// definicao de constantes
// NUMBER
// - ALPHA
// - IDENT
// - EOF
// - FLOAT