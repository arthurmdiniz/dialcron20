const express = require('express')
const router = express.Router()
const { query } = require('../db')

router.post('/login', async (req, res) => {
  const { login, senha } = req.body
  try {
    const [rows] = await query(
      'SELECT SENHA FROM GER_USUARIO WHERE LOGIN = ? AND ATIVO = ?',
      [login, 'S']
    )
    if (rows && rows.SENHA === senha) {
      res.json({ success: true })
    } else {
      res.status(401).json({ success: false, message: 'Credenciais inválidas' })
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

router.get('/status/:login', async (req, res) => {
  try {
    const [rows] = await query(
      'SELECT ATIVO FROM GER_USUARIO WHERE LOGIN = ?',
      [req.params.login]
    )
    if (rows) {
      res.json({ status: rows.ATIVO })
    } else {
      res.json({ status: 'NAO_EXISTE' })
    }
  } catch (error) {
    res.status(500).json({ status: 'ERRO', message: error.message })
  }
})

router.get('/:login', async (req, res) => {
  try {
    const [rows] = await query(
      'SELECT ID, LOGIN, NOME, EMAIL, ATIVO FROM GER_USUARIO WHERE LOGIN = ?',
      [req.params.login]
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

router.get('/', async (req, res) => {
  try {
    const rows = await query('SELECT ID, LOGIN FROM GER_USUARIO')
    res.json(rows)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.get('/id/:id', async (req, res) => {
  try {
    const [rows] = await query('SELECT * FROM GER_USUARIO WHERE ID = ?', [req.params.id])
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
  const { login, senha, nome, perfil, grupo, ativo } = req.body
  try {
    const result = await query(
      'INSERT INTO GER_USUARIO (LOGIN, SENHA, NOME, PERFIL, GRUPO, ATIVO) VALUES (?, ?, ?, ?, ?, ?)',
      [login, senha, nome, perfil, grupo, ativo]
    )
    res.json({ success: true, id: result.insertId })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

router.put('/:id', async (req, res) => {
  const { login, senha, nome, perfil, grupo, ativo } = req.body
  try {
    await query(
      'UPDATE GER_USUARIO SET LOGIN = ?, SENHA = ?, NOME = ?, PERFIL = ?, GRUPO = ?, ATIVO = ? WHERE ID = ?',
      [login, senha, nome, perfil, grupo, ativo, req.params.id]
    )
    res.json({ success: true })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

module.exports = router