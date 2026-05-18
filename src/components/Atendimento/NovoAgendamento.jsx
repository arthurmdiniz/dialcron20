import { useState, useEffect } from 'react'
import '../../styles/Modal.css'

const API_CLIENTES = 'http://localhost:3001/api/clientes'
const API_AGENDA = 'http://localhost:3001/api/agenda'

export default function NovoAgendamento({ onClose, data, horario, medico }) {
  const [passo, setPasso] = useState(1)
  const [busca, setBusca] = useState('')
  const [resultados, setResultados] = useState([])
  const [paciente, setPaciente] = useState(null)
  const [observacao, setObservacao] = useState('')
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState(null)
  const [sucesso, setSucesso] = useState(false)

  useEffect(() => {
    if (!busca.trim()) return
    const timer = setTimeout(handleBuscar, 300)
    return () => clearTimeout(timer)
  }, [busca])

  const handleBuscar = async () => {
    if (!busca.trim()) return
    setCarregando(true)
    setErro(null)
    try {
      const res = await fetch(`${API_CLIENTES}?busca=${encodeURIComponent(busca)}`)
      if (!res.ok) throw new Error('Erro ao buscar pacientes')
      const data = await res.json()
      setResultados(data || [])
    } catch (err) {
      setErro('Erro: ' + err.message)
    } finally {
      setCarregando(false)
    }
  }

  const handleSelecionar = (pac) => {
    setPaciente(pac)
    setPasso(2)
  }

  const handleSalvar = async () => {
    setCarregando(true)
    setErro(null)
    try {
      const dtaAgendamento = `${data}T${horario}:00`
      const res = await fetch(API_AGENDA, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          medico: medico.ID,
          cliente: paciente.CLIENTE,
          dtaAgendamento,
          observacao: observacao.trim() || null
        })
      })
      if (!res.ok) throw new Error('Erro ao criar agendamento')
      setSucesso(true)
      setTimeout(onClose, 1000)
    } catch (err) {
      setErro('Erro: ' + err.message)
    } finally {
      setCarregando(false)
    }
  }

  const calcularIdade = (dtaNascimento) => {
    if (!dtaNascimento) return null
    const nasc = new Date(dtaNascimento)
    let idade = new Date().getFullYear() - nasc.getFullYear()
    const mes = new Date().getMonth() - nasc.getMonth()
    if (mes < 0 || (mes === 0 && new Date().getDate() < nasc.getDate())) idade--
    return idade
  }

  const formatarTelefone = (ddd, tel) => {
    if (!tel) return ''
    return ddd ? `(${ddd}) ${tel}` : tel
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={e => e.stopPropagation()} style={{ width: '560px' }}>
        <button className="modal-close-btn" onClick={onClose}>Fechar</button>

        <h2 style={{ color: '#277bbc', marginBottom: '1rem' }}>
          Novo Agendamento
        </h2>

        <div style={{ fontSize: '0.9rem', color: '#555', marginBottom: '1rem' }}>
          {medico.NOME} — {data} às {horario}
        </div>

        {erro && <div className="mensagem-erro" style={{ marginBottom: '0.8rem' }}>{erro}</div>}
        {sucesso && <div className="mensagem-sucesso" style={{ marginBottom: '0.8rem' }}>Agendamento criado com sucesso!</div>}

        {passo === 1 && !sucesso && (
          <div>
            <p style={{ marginBottom: '0.8rem', fontWeight: 600 }}>Passo 1: Selecione o paciente</p>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              <input
                type="text"
                placeholder="Buscar por nome, CPF ou telefone..."
                value={busca}
                onChange={e => setBusca(e.target.value)}
                style={{ flex: 1, height: '36px', padding: '0 0.5rem', fontSize: '0.85rem' }}
              />
              <button onClick={handleBuscar} disabled={carregando}
                style={{ height: '36px', padding: '0 1rem', background: '#277bbc', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                Buscar
              </button>
            </div>

            {carregando && <p>Buscando...</p>}

            {resultados.length > 0 && (
              <div style={{ maxHeight: '300px', overflowY: 'auto', border: '1px solid #ddd', borderRadius: '5px' }}>
                {resultados.map(pac => (
                  <div key={pac.CLIENTE}
                    onClick={() => handleSelecionar(pac)}
                    style={{ padding: '0.6rem', cursor: 'pointer', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#f0f7ff'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                    <div>
                      <div style={{ fontWeight: 600 }}>
                        {pac.NOME}
                        {calcularIdade(pac.DTA_NASCIMENTO) !== null && ` (${calcularIdade(pac.DTA_NASCIMENTO)} anos)`}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#666' }}>
                        {pac.CPF_CNPJ && `CPF: ${pac.CPF_CNPJ} | `}
                        {formatarTelefone(pac.TELEFONE_DDD, pac.TELEFONE)}
                        {formatarTelefone(pac.TELEFONE_DDD, pac.TELEFONE) && formatarTelefone(pac.CELULAR_DDD, pac.CELULAR) ? ' | ' : ''}
                        {formatarTelefone(pac.CELULAR_DDD, pac.CELULAR)}
                      </div>
                    </div>
                    <span style={{ color: '#277bbc', fontSize: '0.8rem' }}>Selecionar →</span>
                  </div>
                ))}
              </div>
            )}

            {!carregando && busca && resultados.length === 0 && (
              <p style={{ color: '#999' }}>Nenhum paciente encontrado.</p>
            )}
          </div>
        )}

        {passo === 2 && !sucesso && (
          <div style={{ width: '100%' }}>
            <p style={{ marginBottom: '0.8rem', fontWeight: 600 }}>Passo 2: Observações</p>

            <div style={{ marginBottom: '1rem', padding: '0.6rem', background: '#f5f5f5', borderRadius: '5px' }}>
              <strong>Paciente:</strong> {paciente.NOME}{calcularIdade(paciente.DTA_NASCIMENTO) !== null && ` (${calcularIdade(paciente.DTA_NASCIMENTO)} anos)`}
            </div>

            <div className="form-group" style={{ width: '100%' }}>
             
              <textarea
                rows="4"
                value={observacao}
                onChange={e => setObservacao(e.target.value)}
                placeholder="Observações sobre o agendamento (opcional)"
                style={{ width: '100%', boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
              <button onClick={() => setPasso(1)}
                style={{ height: '36px', padding: '0 1rem', background: '#ccc', color: '#333', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                Voltar
              </button>
              <button onClick={handleSalvar} disabled={carregando}
                style={{ height: '36px', padding: '0 1rem', background: '#277bbc', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                {carregando ? 'Salvando...' : 'Confirmar Agendamento'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
