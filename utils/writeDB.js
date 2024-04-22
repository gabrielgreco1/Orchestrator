import 'dotenv/config'
import insertData from '../database/insert.js'


export default async function write_start(automacao){
    const hora = new Date().toISOString()
    const status = 'Iniciada'

    const id = insertData(automacao, hora, status)
    return id
}

