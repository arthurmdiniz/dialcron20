const express = require('express')
const router = express.Router()
const { query } = require('../db')

router.get('/', async (req, res) => {
  try {
    const rows = await query('SELECT ID, NOME_FANTASIA FROM GER_UNIDADE')
    res.json(rows)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const [rows] = await query('SELECT * FROM GER_UNIDADE WHERE ID = ?', [req.params.id])
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
  const {
    cliente, nomeFantasia, razaoSocial, cnpj,
    inscEstadual, inscMunicipal, cep, logradouro,
    numero, bairro, complemento, municipio,
    uf, pais, email, ddd, telefone
  } = req.body
  try {
    const result = await query(
      `INSERT INTO GER_UNIDADE (CLIENTE, NOME_FANTASIA, RAZAO_SOCIAL, CNPJ, 
        INSC_ESTADUAL, INSC_MUNICIPAL, CEP, LOGRADOURO, NUMERO, BAIRRO, 
        COMPLEMENTO, MUNICIPIO, UF, PAIS, EMAIL, DDD, TELEFONE) 
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [cliente, nomeFantasia, razaoSocial, cnpj, inscEstadual, inscMunicipal,
        cep, logradouro, numero, bairro, complemento, municipio, uf, pais,
        email, ddd, telefone]
    )
    res.json({ success: true, id: result.insertId })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

router.put('/:id', async (req, res) => {
  const {
    cliente, nomeFantasia, razaoSocial, cnpj,
    inscEstadual, inscMunicipal, cep, logradouro,
    numero, bairro, complemento, municipio,
    uf, pais, email, ddd, telefone
  } = req.body
  try {
    await query(
      `UPDATE GER_UNIDADE SET CLIENTE = ?, NOME_FANTASIA = ?, RAZAO_SOCIAL = ?, CNPJ = ?, 
        INSC_ESTADUAL = ?, INSC_MUNICIPAL = ?, CEP = ?, LOGRADOURO = ?, NUMERO = ?, BAIRRO = ?, 
        COMPLEMENTO = ?, MUNICIPIO = ?, UF = ?, PAIS = ?, EMAIL = ?, DDD = ?, TELEFONE = ? 
       WHERE ID = ?`,
      [cliente, nomeFantasia, razaoSocial, cnpj, inscEstadual, inscMunicipal,
        cep, logradouro, numero, bairro, complemento, municipio, uf, pais,
        email, ddd, telefone, req.params.id]
    )
    res.json({ success: true })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

module.exports = router