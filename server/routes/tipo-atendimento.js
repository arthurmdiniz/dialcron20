const express = require('express')
const router = express.Router()
const { query } = require('../db')

router.get('/', async (req, res) => {
  try {
    const rows = await query('SELECT ID, DES_ATENDIMENTO FROM MED_TIPO_ATENDIMENTO')
    res.json(rows)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.get('/ativas', async (req, res) => {
  try {
    const rows = await query(
      'SELECT ID, DES_ATENDIMENTO FROM MED_TIPO_ATENDIMENTO WHERE ATIVO = ? ORDER BY DES_ATENDIMENTO',
      ['S']
    )
    res.json(rows)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const [rows] = await query(
      'SELECT * FROM MED_TIPO_ATENDIMENTO WHERE ID = ?',
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

router.get('/descricao/:desAtendimento', async (req, res) => {
  try {
    const [rows] = await query(
      'SELECT * FROM MED_TIPO_ATENDIMENTO WHERE DES_ATENDIMENTO = ? AND ATIVO = ?',
      [req.params.desAtendimento, 'S']
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

router.post('/', async (req, res) => {
  const { desTipoAtendimento } = req.body
  try {
    const result = await query(
      'INSERT INTO MED_TIPO_ATENDIMENTO (DES_ATENDIMENTO, ATIVO) VALUES (?, ?)',
      [desTipoAtendimento, 'S']
    )
    res.json({ success: true, id: result.insertId })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

router.put('/:id', async (req, res) => {
  const { desTipoAtendimento, ativo } = req.body
  try {
    await query(
      'UPDATE MED_TIPO_ATENDIMENTO SET DES_ATENDIMENTO = ?, ATIVO = ? WHERE ID = ?',
      [desTipoAtendimento, ativo, req.params.id]
    )
    res.json({ success: true })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

module.exports = router