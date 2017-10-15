import fs from 'fs'
import { promisify } from 'util'

const N = 127

const hashTable = (debug = 'N') => {
    let table = []

    // Checa se Debug está ativado
    const checkDebug = (key, table, hash, action) => debug === 'N' ||
        console.log(`Simbolo:${key} Hashing:${hash} Posição:${hash} Ação:${action}`)
    
    // Cria hash
    const createHashIndex = (key, colision = 0) => {
        let hash = 0
        for (var i = 0; i < key.length; i++) {
            hash = (hash << 5) - hash + key.charCodeAt(i)
            hash = hash >>> 0
        }
        return colision == 0 ? Math.abs(hash % N) : N + Math.abs(hash % (2 * N))
    }

    // Adiciona na area de colisão
    const addToColisionArea = (hash, key) => {
        const colisionHash = createHashIndex(key, 1)
        table[hash].colision = colisionHash
        table[colisionHash] = { simbol: key, colision: -1 }
        return colisionHash
    }

    // Função que pega recursivamente o valor na table
    const get = key => {
        const value = table[key]
        if (!value) return -1
        return (value.colision === -1) ? key : get(value.colision)
    }

    // Consulta
    const retrieve = key => {
        const hashIndex = get(createHashIndex(key))
        checkDebug(key, table, hashIndex, 'Consulta')     
        return hashIndex
    }
    
    // Inserção
    const insert = key => {
        let hash = createHashIndex(key)
        table[hash]
            ? hash = addToColisionArea(retrieve(key), key)
            : table[hash] = { simbol: key, colision: -1 }
        checkDebug(key, table, hash, 'Inserção')
        return hash
    }
    return {
        // Reinicializa hashtable
        resetTable: (value = []) => table = value,
        // imprime_tst: para fins de depuração
        printTable: () => console.log(table),
        // Faz ação
        actionTable: (action, key) => action == 'I' ? insert(key) : retrieve(key)
    }
}

// grava_TST_binario
// cria arquivo de binario da table
const convertToBinary = (table, pathName) => promisify(fs.writeFile)(pathName, JSON.stringify(table), 'utf16le')

// le_tst_binario
// le e insere na table um arquivo de binario
const  readFromBinary = path => promisify(fs.readFile)(path)

const test = () => {
    const tableTest = hashTable('S')
    const fileTest = ['a', 'b', 'c']
    fileTest.map((item, index) => lineTest(tableTest, item, index))

    // Tenta com as opções de consulta com os dados contidos no arquivo do 2 parametro \/    
    readFromBinary(`${__dirname}/output/test_1`)
        .then(table => tableTest.resetTable(table.toString('utf8')))
    tableTest.actionTable('C', "b")
    tableTest.printTable()
}

const lineTest = (table, item, index) => {
    table.actionTable('I', item)
    convertToBinary(table, `${__dirname}/output/test_${index}`)
    table.resetTable()
}

test()