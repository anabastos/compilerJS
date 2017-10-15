import { pipe, map, reduce, isEmpty } from 'ramda'

import regexObj from '../utils/lexicalRegex'
import errorHelper from '../utils/errorHelper'

const splitToArray = content => content.split('')

const tokenizer = file => pipe(
    splitToArray,
    map(makeTokensByRegex))(file)

const makeTokensByRegex = item => {
    const token = reduce((acc, regex) => item.match(regex) 
            ? makeToken(item, regex)
            : acc, {})
            (Object.keys(regexObj))
    return isEmpty(token) ? errorHelper('Léxico', `Token ${item} não existente.`) : token
}

const makeToken = (item, regex) => ({ type: regexObj[regex], value: item })

export default tokenizer