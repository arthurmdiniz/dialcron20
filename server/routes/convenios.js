const express = require('express')
const router = express.Router()
const { query } = require('../db')

router.get('/', async (req, res) => {
  try {
    const sql = "SELECT ID, DES_CONVENIO FROM MED_CONVENIO WHERE ATIVO = 'S' ORDER BY DES_CONVENIO"
    const results = await query(sql)
    res.json(results)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
