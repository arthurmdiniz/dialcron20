const express = require('express')
const router = express.Router()
const { query } = require('../db')

// Listar todas (incluindo inativas)
router.get('/todos', async (req, res) => {
  try {
    const sql = 'SELECT ID, DES_ESPECIALIDADE, ATIVO FROM MED_ESPECIALIDADE ORDER BY DES_ESPECIALIDADE'
    const results = await query(sql)
    res.json(results)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Listar ativas
router.get('/', async (req, res) => {
  try {
    const sql = "SELECT ID, DES_ESPECIALIDADE FROM MED_ESPECIALIDADE WHERE ATIVO = 'S' ORDER BY DES_ESPECIALIDADE"
    const results = await query(sql)
    res.json(results)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Buscar por ID
router.get('/:id', async (req, res) => {
  try {
    const sql = 'SELECT * FROM MED_ESPECIALIDADE WHERE ID = ?'
    const results = await query(sql, [req.params.id])
    if (results.length === 0) return res.status(404).json({ error: 'Não encontrada' })
    
    const row = results[0]
    res.json({
      id: row.ID,
      desEspecialidade: row.DES_ESPECIALIDADE,
      ativo: row.ATIVO
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Incluir
router.post('/', async (req, res) => {
  try {
    const { desEspecialidade } = req.body
    const sql = "INSERT INTO MED_ESPECIALIDADE (DES_ESPECIALIDADE, ATIVO) VALUES (?, 'S')"
    await query(sql, [desEspecialidade])
    res.status(201).json({ message: 'Cadastrada com sucesso' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Atualizar
router.put('/:id', async (req, res) => {
  try {
    const { desEspecialidade, ativo } = req.body
    const sql = 'UPDATE MED_ESPECIALIDADE SET DES_ESPECIALIDADE = ?, ATIVO = ? WHERE ID = ?'
    await query(sql, [desEspecialidade, ativo, req.params.id])
    res.json({ message: 'Atualizada com sucesso' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
