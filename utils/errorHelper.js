import { red } from 'colors'

export default (type, line, error) => console.log(red(`Erro ${type} na linha ${line} - ${error}`))