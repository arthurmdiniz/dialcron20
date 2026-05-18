const express = require('express')
const router = express.Router()
const { pool } = require('../db')

router.get('/data/:data', async (req, res) => {
  const dataSelecionada = req.params.data
  try {
    const inicio = `${dataSelecionada} 00:00:00`
    const fim = `${dataSelecionada} 23:59:59`

    const [rows] = await pool.query(
      `SELECT 
        a.ID, a.MEDICO, m.NOME as NOME_MEDICO, a.CLIENTE, c.NOME as NOME_CLIENTE,
        c.DTA_NASCIMENTO, a.DTA_AGENDAMENTO, a.SITUACAO
       FROM MED_AGENDA a
       INNER JOIN MED_MEDICO m ON a.MEDICO = m.ID
       INNER JOIN GER_CLIENTE c ON a.CLIENTE = c.CLIENTE
       WHERE a.DTA_AGENDAMENTO >= ? AND a.DTA_AGENDAMENTO <= ?
       AND a.SITUACAO <> 'C'
       ORDER BY a.DTA_AGENDAMENTO`,
      [inicio, fim]
    )
    res.json(rows)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT 
        a.ID, a.MEDICO, m.NOME as NOME_MEDICO, a.CLIENTE, c.NOME as NOME_CLIENTE,
        a.DTA_AGENDAMENTO, c.DTA_NASCIMENTO, c.TELEFONE_DDD, c.TELEFONE, c.CELULAR_DDD, c.CELULAR,
        a.CONVENIO, v.DES_CONVENIO, a.ESPECIALIDADE, e.DES_ESPECIALIDADE,
        c.SEXO, a.SITUACAO, a.OBSERVACAO, a.TIPO_ATENDIMENTO
       FROM MED_AGENDA a
       INNER JOIN MED_MEDICO m ON a.MEDICO = m.ID
       INNER JOIN GER_CLIENTE c ON a.CLIENTE = c.CLIENTE
       INNER JOIN MED_ESPECIALIDADE e ON a.ESPECIALIDADE = e.ID
       LEFT JOIN MED_CONVENIO v ON a.CONVENIO = v.ID
       WHERE a.ID = ?`,
      [req.params.id]
    )
    if (rows && rows.length > 0) {
      res.json(rows[0])
    } else {
      res.json(null)
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.post('/', async (req, res) => {
  try {
    const { medico, cliente, dtaAgendamento, observacao } = req.body
    if (!medico || !cliente || !dtaAgendamento) {
      return res.status(400).json({ message: 'Médico, cliente e data/hora são obrigatórios' })
    }

    const [result] = await pool.query(
      `INSERT INTO MED_AGENDA (MEDICO, CLIENTE, DTA_AGENDAMENTO, SITUACAO, OBSERVACAO)
       VALUES (?, ?, ?, 'A', ?)`,
      [medico, cliente, dtaAgendamento, observacao || null]
    )

    res.status(201).json({ message: 'Agendamento criado com sucesso', id: result.insertId })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
