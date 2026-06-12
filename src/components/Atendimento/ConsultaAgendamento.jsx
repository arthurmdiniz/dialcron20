import { useState, useEffect } from 'react'
import '../../styles/Modal.css'

const API_URL = 'http://localhost:3001/api/agenda'

export default function ConsultaAgendamento({ id, onClose }) {
  const [dados, setDados] = useState(null)
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

  useEffect(() => {
    carregarAgendamento()
  }, [id])

  const carregarAgendamento = async () => {
    try {
      setCarregando(true)
      const res = await fetch(`${API_URL}/${id}`)
      if (!res.ok) throw new Error('Erro ao carregar agendamento')
      const data = await res.json()
      setDados(data)
      setErro(null)
    } catch (error) {
      setErro('Erro ao conectar com o servidor: ' + error.message)
    } finally {
      setCarregando(false)
    }
  }

  const calcularIdade = (dataNascimento) => {
    if (!dataNascimento) return ''
    const nasc = new Date(dataNascimento)
    const hoje = new Date()
    let idade = hoje.getFullYear() - nasc.getFullYear()
    const mes = hoje.getMonth() - nasc.getMonth()
    if (mes < 0 || (mes === 0 && hoje.getDate() < nasc.getDate())) idade--
    return `(${idade} anos)`
  }

  const parseDate = (val) => {
    if (!val) return null
    if (typeof val === 'string' && val.includes('-')) {
      const [datePart, timePart] = val.replace('T', ' ').split(' ')
      if (datePart) {
        const [y, m, d] = datePart.split('-').map(Number)
        if (timePart) {
          const [hh, mm, ss] = timePart.split(':').map(Number)
          return new Date(y, m - 1, d, hh || 0, mm || 0, ss || 0)
        }
        return new Date(y, m - 1, d)
      }
    }
    const dt = new Date(val)
    return isNaN(dt.getTime()) ? null : dt
  }

  const formatarData = (data) => {
    const d = parseDate(data)
    if (!d) return ''
    return d.toLocaleDateString('pt-BR')
  }

  const formatarDataHora = (data) => {
    const d = parseDate(data)
    if (!d) return ''
    return d.toLocaleDateString('pt-BR') + ' ' + d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container consulta-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>✕ Fechar</button>

        <h2>
          {carregando ? 'Carregando...' : dados ? `Consulta Agenda - ${dados.NOME_MEDICO}` : 'Agendamento não encontrado'}
        </h2>

        {erro && <div className="mensagem-erro">{erro}</div>}

        {carregando ? (
          <p>Carregando...</p>
        ) : dados ? (
          <>
            <fieldset>
              <legend>Dados do Agendamento</legend>

              <table className="modal-table">

                <tbody>
                  <tr>
                    <td colSpan={2}>
                      <label>ID:</label>
                      <input type="text" value={dados.ID || ''} readOnly />
                    </td>
                    <td colSpan={6}>
                      <label>Nome:</label>
                      <input type="text" value={dados.NOME_CLIENTE || ''} readOnly />
                    </td>
                    <td colSpan={4}>
                      <label>Data Agendamento:</label>
                      <input type="text" value={formatarDataHora(dados.DTA_AGENDAMENTO)} readOnly />
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={4}>
                      <label>Data Nascimento:</label>
                      <input type="text" value={`${formatarData(dados.DTA_NASCIMENTO)} ${calcularIdade(dados.DTA_NASCIMENTO)}`} readOnly />
                    </td>
                    <td colSpan={2}>
                      <label>Sexo:</label>
                      <input type="text" value={dados.SEXO || ''} readOnly className="sexo-input" />
                    </td>
                    <td colSpan={3}>
                      <label>Telefone:</label>
                      <input type="text" value={dados.TELEFONE_DDD ? `(${dados.TELEFONE_DDD}) ${dados.TELEFONE}` : ''} readOnly />
                    </td>
                    <td colSpan={3}>
                      <label>Celular:</label>
                      <input type="text" value={dados.CELULAR_DDD ? `(${dados.CELULAR_DDD}) ${dados.CELULAR}` : ''} readOnly />
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={6}>
                      <label>Convênio:</label>
                      <input type="text" value={dados.DES_CONVENIO || ''} readOnly />
                    </td>
                    <td colSpan={6}>
                      <label>Especialidade:</label>
                      <input type="text" value={dados.DES_ESPECIALIDADE || ''} readOnly />
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={12}>
                      <label>Observações:</label>
                      <textarea
                        value={dados.OBSERVACAO || ''}
                        readOnly
                        rows={4}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </fieldset>
          </>
        ) : (
          <p>Agendamento não encontrado</p>
        )}
      </div>
    </div>
  )
}
