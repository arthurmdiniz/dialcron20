const express = require('express')
const cors = require('cors')
const medicosRouter = require('./routes/medicos')
const especialidadesRouter = require('./routes/especialidades')

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.use('/api/medicos', medicosRouter)
app.use('/api/especialidades', especialidadesRouter)

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
