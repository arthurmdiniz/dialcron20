const express = require('express')
const router = express.Router()
const { pool } = require('../db')

function escapeValue(val) {
  if (val === null || val === undefined) return 'NULL'
  if (typeof val === 'number') return val.toString()
  const str = String(val)
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
  return `'${str}'`
}

function formatDate(d) {
  if (!d) return 'NULL'
  const dt = new Date(d)
  return `'${dt.getFullYear()}-${String(dt.getMonth()+1).padStart(2,'0')}-${String(dt.getDate()).padStart(2,'0')} ${String(dt.getHours()).padStart(2,'0')}:${String(dt.getMinutes()).padStart(2,'0')}:${String(dt.getSeconds()).padStart(2,'0')}'`
}

router.get('/', async (req, res) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  res.setHeader('Content-Disposition', 'attachment; filename=dialcron_backup_' + new Date().toISOString().split('T')[0] + '.sql')

  try {
    const [tables] = await pool.query('SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_SCHEMA = DATABASE()')

    res.write(`-- Dialcron Database Backup\n`)
    res.write(`-- Gerado em: ${new Date().toLocaleString('pt-BR')}\n\n`)
    res.write(`SET FOREIGN_KEY_CHECKS = 0;\n`)
    res.write(`SET SQL_MODE = 'NO_AUTO_VALUE_ON_ZERO';\n\n`)

    for (const row of tables) {
      const tableName = row.TABLE_NAME

      const [createRows] = await pool.query(`SHOW CREATE TABLE \`${tableName}\``)
      const createSql = createRows[0]['Create Table']

      res.write(`--\n-- Estrutura da tabela \`${tableName}\`\n--\n\n`)
      res.write(`DROP TABLE IF EXISTS \`${tableName}\`;\n`)
      res.write(`${createSql};\n\n`)

      const [dataRows] = await pool.query(`SELECT * FROM \`${tableName}\``)
      if (dataRows.length > 0) {
        const columns = Object.keys(dataRows[0])
        const colNames = columns.map(c => `\`${c}\``).join(', ')

        res.write(`--\n-- Dados da tabela \`${tableName}\`\n--\n\n`)

        for (let i = 0; i < dataRows.length; i += 50) {
          const batch = dataRows.slice(i, i + 50)
          const values = batch.map(row => {
            return '(' + columns.map(col => {
              const val = row[col]
              if (val === null || val === undefined) return 'NULL'
              if (val instanceof Date || (typeof val === 'string' && val.match(/^\d{4}-\d{2}-\d{2}/))) {
                return formatDate(val)
              }
              return escapeValue(val)
            }).join(', ') + ')'
          }).join(',\n')

          res.write(`INSERT INTO \`${tableName}\` (${colNames}) VALUES\n${values};\n\n`)
        }
      }
    }

    res.write(`SET FOREIGN_KEY_CHECKS = 1;\n`)
    res.end()
  } catch (error) {
    console.error('Erro ao exportar:', error.message)
    if (!res.headersSent) {
      res.status(500).json({ error: error.message })
    } else {
      res.end(`\n-- ERRO: ${error.message}`)
    }
  }
})

module.exports = router
