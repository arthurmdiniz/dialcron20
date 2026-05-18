const express = require('express')
const cors = require('cors')
const medicosRouter = require('./routes/medicos')
const especialidadesRouter = require('./routes/especialidades')
const usuariosRouter = require('./routes/usuarios')
const tipoAtendimentoRouter = require('./routes/tipo-atendimento')
const empresasRouter = require('./routes/empresas')
const clientesRouter = require('./routes/clientes')
const agendaRouter = require('./routes/agenda')
const conveniosRouter = require('./routes/convenios')
const exportarRouter = require('./routes/exportar')

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.use('/api/medicos', medicosRouter)
app.use('/api/especialidades', especialidadesRouter)
app.use('/api/usuarios', usuariosRouter)
app.use('/api/tipo-atendimento', tipoAtendimentoRouter)
app.use('/api/empresas', empresasRouter)
app.use('/api/clientes', clientesRouter)
app.use('/api/agenda', agendaRouter)
app.use('/api/convenios', conveniosRouter)
app.use('/api/exportar', exportarRouter)

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
