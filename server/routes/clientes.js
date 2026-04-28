const express = require('express')
const router = express.Router()
const { query } = require('../db')

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
    res.status(500).json({ message: error.message })
  }
})

module.exports = router