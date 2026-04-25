import { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import './Agendamento.css'

export default function Agendamento() {
  const [data, setData] = useState(new Date())
  const [hora, setHora] = useState('09:00')
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  const [servico, setServico] = useState('consulta')
  const [agendamentos, setAgendamentos] = useState([])
  const [mensagem, setMensagem] = useState('')

  const handleAgendar = (e) => {
    e.preventDefault()

    if (!nome || !email || !telefone) {
      setMensagem('Por favor, preencha todos os campos!')
      return
    }

    const novoAgendamento = {
      id: Date.now(),
      nome,
      email,
      telefone,
      servico,
      data: data.toLocaleDateString('pt-BR'),
      hora,
    }

    setAgendamentos([...agendamentos, novoAgendamento])
    setMensagem('Agendamento realizado com sucesso!')

    // Limpar formulário
    setNome('')
    setEmail('')
    setTelefone('')
    setServico('consulta')
    setHora('09:00')
    setData(new Date())

    setTimeout(() => setMensagem(''), 3000)
  }

  const handleCancelar = (id) => {
    setAgendamentos(agendamentos.filter((ag) => ag.id !== id))
  }

  return (
    <div className="agendamento-container" id="atendimento">
      <h1>Sistema de Atendimento</h1>

      <div className="agendamento-content">
        <form className="formulario" id="formulario" onSubmit={handleAgendar}>
          <h2>Agendar Atendimento</h2>

          <div className="form-group">
            <label htmlFor="nome">Nome:</label>
            <input
              type="text"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Seu nome completo"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="telefone">Telefone:</label>
            <input
              type="tel"
              id="telefone"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              placeholder="(00) 99999-9999"
            />
          </div>

          <div className="form-group">
            <label htmlFor="servico">Serviço:</label>
            <select
              id="servico"
              value={servico}
              onChange={(e) => setServico(e.target.value)}
            >
              <option value="consulta">Consulta</option>
              <option value="exame">Exame</option>
              <option value="procedimento">Procedimento</option>
              <option value="avaliacao">Avaliação</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="hora">Hora:</label>
            <input
              type="time"
              id="hora"
              value={hora}
              onChange={(e) => setHora(e.target.value)}
            />
          </div>

          <button type="submit" className="btn-agendar">
            Confirmar Agendamento
          </button>

          {mensagem && <p className="mensagem">{mensagem}</p>}
        </form>

        <div className="calendario-wrapper">
          <h2>Selecione a Data</h2>
          <Calendar value={data} onChange={setData} />
          <p className="data-selecionada">
            Data selecionada: {data.toLocaleDateString('pt-BR')}
          </p>
        </div>
      </div>

      {agendamentos.length > 0 && (
        <div className="agendamentos-lista">
          <h2>Agendamentos Realizados ({agendamentos.length})</h2>
          <div className="lista-items">
            {agendamentos.map((ag) => (
              <div key={ag.id} className="agendamento-item">
                <div className="agendamento-info">
                  <h3>{ag.nome}</h3>
                  <p>
                    <strong>Email:</strong> {ag.email}
                  </p>
                  <p>
                    <strong>Telefone:</strong> {ag.telefone}
                  </p>
                  <p>
                    <strong>Serviço:</strong> {ag.servico}
                  </p>
                  <p>
                    <strong>Data:</strong> {ag.data} às {ag.hora}
                  </p>
                </div>
                <button
                  className="btn-cancelar"
                  onClick={() => handleCancelar(ag.id)}
                >
                  Cancelar
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Seção de Consultas */}
      <div className="secao-consultas" id="consultas">
        <h2>🏥 Consultas Disponíveis</h2>
        <div className="consultas-grid">
          <div className="consulta-card">
            <h3>Consulta Geral</h3>
            <p>Avaliação médica completa</p>
            <span className="preco">R$ 150,00</span>
          </div>
          <div className="consulta-card">
            <h3>Consulta Especializada</h3>
            <p>Atendimento com especialista</p>
            <span className="preco">R$ 250,00</span>
          </div>
          <div className="consulta-card">
            <h3>Retorno</h3>
            <p>Acompanhamento de tratamento</p>
            <span className="preco">R$ 100,00</span>
          </div>
        </div>
      </div>

      {/* Seção de Exames */}
      <div className="secao-exames" id="exames">
        <h2>🧪 Exames Disponíveis</h2>
        <div className="exames-grid">
          <div className="exame-card">
            <h3>Hemograma Completo</h3>
            <p>Análise do sangue</p>
            <span className="preco">R$ 80,00</span>
          </div>
          <div className="exame-card">
            <h3>Raio-X</h3>
            <p>Exame radiológico</p>
            <span className="preco">R$ 120,00</span>
          </div>
          <div className="exame-card">
            <h3>Ultrassonografia</h3>
            <p>Exame por ultrassom</p>
            <span className="preco">R$ 200,00</span>
          </div>
        </div>
      </div>
    </div>
  )
}
