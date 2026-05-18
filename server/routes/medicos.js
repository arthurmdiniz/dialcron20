const express = require('express')
const router = express.Router()
const { query } = require('../db')

// Listar todos os médicos (incluindo inativos)
router.get('/todos', async (req, res) => {
  try {
    const sql = "SELECT ID, NRO_CRM, NOME FROM MED_MEDICO ORDER BY NOME"
    const results = await query(sql)
    res.json(results)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Listar médicos ativos
router.get('/', async (req, res) => {
  try {
    const sql = "SELECT ID, NRO_CRM, NOME FROM MED_MEDICO WHERE ATIVO = 'S' ORDER BY NOME"
    const results = await query(sql)
    res.json(results)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Buscar médico por CRM
router.get('/:crm', async (req, res) => {
  try {
    const sql = "SELECT * FROM MED_MEDICO WHERE NRO_CRM = ?"
    const results = await query(sql, [req.params.crm])
    
    if (results.length === 0) {
      return res.status(404).json({ error: 'Médico não encontrado' })
    }
    
    const medico = results[0]
    res.json({
      nroCRM: medico.NRO_CRM,
      ufCRM: medico.UF_CRM,
      cliente: medico.CLIENTE,
      nome: medico.NOME,
      dddTelefone: medico.DDD_TELEFONE,
      telefone: medico.TELEFONE,
      dddCelular: medico.DDD_CELULAR,
      celular: medico.CELULAR,
      dddOutros: medico.DDD_OUTROS,
      telefoneOutros: medico.TELEFONE_OUTROS,
      ativo: medico.ATIVO
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Buscar especialidades do médico
router.get('/:crm/especialidades', async (req, res) => {
  try {
    const sql = "SELECT ID_ESPECIALIDADE FROM MED_ESPECIAL_MEDICO WHERE NRO_CRM = ?"
    const results = await query(sql, [req.params.crm])
    res.json(results.map(r => r.ID_ESPECIALIDADE))
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Incluir médico
router.post('/', async (req, res) => {
  try {
    const {
      nroCRM, ufCRM, cliente, nome,
      dddTelefone, telefone, dddCelular, celular,
      dddOutros, telefoneOutros
    } = req.body

    const sql = `INSERT INTO MED_MEDICO 
      (NRO_CRM, UF_CRM, CLIENTE, NOME, DDD_TELEFONE, TELEFONE, 
       DDD_CELULAR, CELULAR, DDD_OUTROS, TELEFONE_OUTROS, ATIVO) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'S')`

    await query(sql, [
      nroCRM, ufCRM, cliente, nome,
      dddTelefone || null, telefone || null,
      dddCelular || null, celular || null,
      dddOutros || null, telefoneOutros || null
    ])

    res.status(201).json({ message: 'Médico cadastrado com sucesso' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Atualizar médico
router.put('/:crm', async (req, res) => {
  try {
    const {
      nroCRM, ufCRM, cliente, nome,
      dddTelefone, telefone, dddCelular, celular,
      dddOutros, telefoneOutros, ativo
    } = req.body

    const sql = `UPDATE MED_MEDICO SET 
      NRO_CRM=?, UF_CRM=?, CLIENTE=?, NOME=?, 
      DDD_TELEFONE=?, TELEFONE=?, DDD_CELULAR=?, CELULAR=?, 
      DDD_OUTROS=?, TELEFONE_OUTROS=?, ATIVO=? 
      WHERE NRO_CRM=?`

    await query(sql, [
      nroCRM, ufCRM, cliente, nome,
      dddTelefone || null, telefone || null,
      dddCelular || null, celular || null,
      dddOutros || null, telefoneOutros || null,
      ativo || 'S', req.params.crm
    ])

    res.json({ message: 'Médico atualizado com sucesso' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Associar especialidade ao médico
router.post('/:crm/especialidades', async (req, res) => {
  try {
    const { idEspecialidade } = req.body
    const sql = "INSERT INTO MED_ESPECIAL_MEDICO (NRO_CRM, ID_ESPECIALIDADE) VALUES (?, ?)"
    await query(sql, [req.params.crm, idEspecialidade])
    res.status(201).json({ message: 'Especialidade associada com sucesso' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Remover especialidade do médico
router.delete('/:crm/especialidades/:idEsp', async (req, res) => {
  try {
    const sql = "DELETE FROM MED_ESPECIAL_MEDICO WHERE NRO_CRM = ? AND ID_ESPECIALIDADE = ?"
    await query(sql, [req.params.crm, req.params.idEsp])
    res.json({ message: 'Especialidade removida com sucesso' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
