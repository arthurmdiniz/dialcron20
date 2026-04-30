const express = require('express')
const router = express.Router()
const { query } = require('../db')

router.get('/data/:data', async (req, res) => {
  const dataSelecionada = req.params.data
  try {
    const rows = await query(
      `SELECT 
        a.ID, a.MEDICO, m.NOME as NOME_MEDICO, a.CLIENTE, c.NOME as NOME_CLIENTE,
        c.DTA_NASCIMENTO, a.DTA_AGENDAMENTO, a.SITUACAO
       FROM MED_AGENDA a
       INNER JOIN MED_MEDICO m ON a.MEDICO = m.ID
       INNER JOIN GER_CLIENTE c ON a.CLIENTE = c.CLIENTE
       WHERE DATE(a.DTA_AGENDAMENTO) BETWEEN ? AND ?
       AND a.SITUACAO <> 'C'
       ORDER BY a.DTA_AGENDAMENTO`,
      [dataSelecionada, dataSelecionada]
    )
    res.json(rows)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const [rows] = await query(
      `SELECT 
        a.ID, a.MEDICO, m.NOME as NOME_MEDICO, a.CLIENTE, c.NOME as NOME_CLIENTE,
        c.DTA_NASCIMENTO, c.TELEFONE_DDD, c.TELEFONE, c.CELULAR_DDD, c.CELULAR,
        a.CONVENIO, v.DES_CONVENIO, a.ESPECIALIDADE, e.DES_ESPECIALIDADE, c.SEXO, a.SITUACAO
       FROM MED_AGENDA a
       INNER JOIN MED_MEDICO m ON a.MEDICO = m.ID
       INNER JOIN GER_CLIENTE c ON a.CLIENTE = c.CLIENTE
       INNER JOIN MED_ESPECIALIDADE e ON a.ESPECIALIDADE = e.ID
       LEFT JOIN MED_CONVENIO v ON a.CONVENIO = v.ID
       WHERE a.ID = ?`,
      [req.params.id]
    )
    if (rows) {
      res.json(rows)
    } else {
      res.json(null)
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router