const mysql = require('mysql2/promise')

const config = {
  host: 'e15',
  port: 3306,
  database: 'dialcron1',
  user: 'dialcron1',
  password: '0c?£8Na.leP8',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  multipleStatements: true,
}

const pool = mysql.createPool(config)

async function getConnection() {
  try {
    const connection = await pool.getConnection()
    return connection
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error.message)
    throw error
  }
}

async function query(sql, params = []) {
  try {
    const [results] = await pool.execute(sql, params)
    return results
  } catch (error) {
    console.error('Erro na consulta:', error.message)
    throw error
  }
}

module.exports = { getConnection, query, pool }
