const express = require('express')
const router = express.Router()
const { query } = require('../db')

// Listar todos os pacientes
router.get('/', async (req, res) => {
  try {
    const { busca } = req.query
    let sql = 'SELECT * FROM GER_CLIENTE'
    let params = []
    if (busca) {
      sql += ' WHERE NOME LIKE ? OR CPF_CNPJ LIKE ? OR TELEFONE LIKE ? OR CELULAR LIKE ?'
      params = [`%${busca}%`, `%${busca}%`, `%${busca}%`, `%${busca}%`]
    }
    sql += ' ORDER BY NOME'
    const results = await query(sql, params)
    res.json(results)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Buscar paciente por ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await query(
      'SELECT * FROM GER_CLIENTE WHERE CLIENTE = ?',
      [req.params.id]
    )
    if (rows) {
      res.json(rows)
    } else {
      res.json(null)
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Incluir paciente
router.post('/', async (req, res) => {
  try {
    const {
      nome, cgc, endereco, uf,
      dddTelefone, telefone, dddCelular, celular,
      dataNascimento, sexo, email
    } = req.body

    const sql = `INSERT INTO GER_CLIENTE 
      (NOME, CPF_CNPJ, LOGRADOURO, TELEFONE_DDD, TELEFONE, 
       CELULAR_DDD, CELULAR, DTA_NASCIMENTO, SEXO, EMAIL) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

    const result = await query(sql, [
      nome, cgc || null, endereco || null,
      dddTelefone || null, telefone || null,
      dddCelular || null, celular || null,
      dataNascimento || null, sexo || null, email || null
    ])

    res.status(201).json({ message: 'Paciente cadastrado com sucesso', id: result.insertId })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Atualizar paciente
router.put('/:id', async (req, res) => {
  try {
    const {
      nome, cgc, endereco, uf,
      dddTelefone, telefone, dddCelular, celular,
      dataNascimento, sexo, email
    } = req.body

    const sql = `UPDATE GER_CLIENTE SET 
      NOME=?, CPF_CNPJ=?, LOGRADOURO=?,
      TELEFONE_DDD=?, TELEFONE=?, CELULAR_DDD=?, CELULAR=?,
      DTA_NASCIMENTO=?, SEXO=?, EMAIL=?
      WHERE CLIENTE=?`

    await query(sql, [
      nome, cgc || null, endereco || null,
      dddTelefone || null, telefone || null,
      dddCelular || null, celular || null,
      dataNascimento || null, sexo || null, email || null,
      req.params.id
    ])

    res.json({ message: 'Paciente atualizado com sucesso' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
