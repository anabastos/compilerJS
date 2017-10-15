import { pipe, map, reduce } from 'ramda'

import regexObj from '../utils/lexicalRegex'
import errorHelper from '../utils/errorHelper'

// Separa
const splitToArray = content => content.split('')

// Gera token
const getTokens = item => makeTokenObj(item, getTypeOfToken(item))

// Pega o tipo do token por regex
const getTypeOfToken = item => {
    const checkedByRegex = Object.keys(regexObj).reduce((acc, regex) => {
        return item.match(regex) 
            ? regexObj[regex] 
            : acc
    }, null)

    //TODO: checar palavras reservadas
    checkedByRegex || errorHelper('Léxico', `Token ${item} não existente.`)
    return checkedByRegex
}

// Faz o objeto token
const makeTokenObj = (item, type) => ({ type: type, value: item })

const tokenizer = file => pipe(
    splitToArray,
    map(getTokens))(file)

export default tokenizer