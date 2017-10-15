import { red } from 'colors'

export default (type, error) => console.log(red(`Erro ${type} - ${error}`))