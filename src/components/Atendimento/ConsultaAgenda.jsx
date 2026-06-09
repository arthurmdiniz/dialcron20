import { useState, useEffect } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import '../../styles/Agenda.css'
import ConsultaAgendamento from './ConsultaAgendamento'
import NovoAgendamento from './NovoAgendamento'

const API_AGENDA = 'http://localhost:3001/api/agenda'
const API_MEDICOS = 'http://localhost:3001/api/medicos'

const STATUS = {
  A: { label: 'Agendado', color: '#FFF3CD' },
  C: { label: 'Confirmado', color: '#CFF4FC' },
  L: { label: 'Concluído', color: '#D1E7DD' },
  R: { label: 'Atrasado', color: '#F8D7DA' },
  N: { label: 'Não Compareceu', color: '#E2E3E5' }
}

export default function ConsultaAgenda({ onClose }) {
  const [dataSelecionada, setDataSelecionada] = useState(new Date())
  const [medicos, setMedicos] = useState([])
  const [agendamentos, setAgendamentos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)
  const [agendamentoId, setAgendamentoId] = useState(null)
  const [novoSlot, setNovoSlot] = useState(null)

  useEffect(() => {
    carregarDados()
  }, [dataSelecionada])

  const carregarDados = async () => {
    try {
      setCarregando(true)
      const dataStr = `${dataSelecionada.getFullYear()}-${String(dataSelecionada.getMonth()+1).padStart(2,'0')}-${String(dataSelecionada.getDate()).padStart(2,'0')}`

      const [resMedicos, resAgenda] = await Promise.all([
        fetch(API_MEDICOS),
        fetch(`${API_AGENDA}/data/${dataStr}`)
      ])

      if (!resMedicos.ok || !resAgenda.ok) throw new Error('Erro ao carregar dados')

      const medicosData = await resMedicos.json()
      const agendaData = await resAgenda.json()

      setMedicos(medicosData)
      setAgendamentos(agendaData)
      setErro(null)
    } catch (error) {
      setErro('Erro ao conectar com o servidor: ' + error.message)
    } finally {
      setCarregando(false)
    }
  }

  const gerarHorarios = () => {
    const horarios = []
    for (let h = 8; h < 16; h++) {
      for (let m = 0; m < 60; m += 20) {
        horarios.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`)
      }
    }
    return horarios
  }

  const getAgendamentoNaCelula = (medicoId, horario) => {
    const dataStr = `${dataSelecionada.getFullYear()}-${String(dataSelecionada.getMonth()+1).padStart(2,'0')}-${String(dataSelecionada.getDate()).padStart(2,'0')}`
    const dataHoroInicio = new Date(`${dataStr}T${horario}:00`)
    const dataHoraFim = new Date(dataHoroInicio.getTime() + 20 * 60 * 1000)

    return agendamentos.filter(a => {
      const dtaAg = new Date(a.DTA_AGENDAMENTO)
      return a.MEDICO === medicoId && dtaAg >= dataHoroInicio && dtaAg < dataHoraFim
    })
  }

  const getCorSituacao = (situacao) => {
    const s = STATUS[situacao]
    return s ? s.color : '#FFFFFF'
  }

  const formatarDataBR = (data) => {
    return data.toLocaleDateString('pt-BR')
  }

  return (
    <div className="cadmedico-container">
      <div className="cadmedico-header">
        <h1>Consulta Agenda - {formatarDataBR(dataSelecionada)}</h1>
        <div className="header-right">
          {erro && <div className="mensagem-erro">{erro}</div>}
          <button className="btn-fechar" onClick={onClose}>✕</button>
        </div>
      </div>

      <div className="consulta-agenda-body">
        <div className="consulta-agenda-table-wrapper">
          {carregando ? (
            <p>Carregando...</p>
          ) : (
            <div className="consulta-agenda-scroll">
              <table className="agenda-tabela">
                <thead>
                  <tr>
                    <th>HORÁRIO</th>
                    {medicos.map(m => (
                      <th key={m.ID}>{m.NOME}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {gerarHorarios().map(horario => (
                    <tr key={horario}>
                      <td>{horario}</td>
                      {medicos.map((m, idx) => {
                        const agendamentosCelula = getAgendamentoNaCelula(m.ID, horario)
                        return (
                          <td
                            key={`${m.ID}_${horario}`}
                            style={{
                              background: agendamentosCelula.length > 0 ? getCorSituacao(agendamentosCelula[0].SITUACAO) : '#FFFFFF'
                            }}
                            onClick={() => {
                              if (agendamentosCelula.length > 0) {
                                setAgendamentoId(agendamentosCelula[0].ID)
                              } else {
                                const hoje = new Date()
                                const dataCell = new Date(dataSelecionada.getFullYear(), dataSelecionada.getMonth(), dataSelecionada.getDate())
                                const hojeNormalizado = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate())
                                if (dataCell < hojeNormalizado) {
                                  alert('Não é permitido agendar para data anterior a hoje.')
                                  return
                                }
                                setNovoSlot({ medico: m, horario })
                              }
                            }}
                            title={
                              agendamentosCelula.length > 0
                                ? `${agendamentosCelula[0].NOME_CLIENTE} - ${STATUS[agendamentosCelula[0].SITUACAO]?.label || agendamentosCelula[0].SITUACAO}`
                                : ''
                            }
                          >
                            {agendamentosCelula.length > 0 ? (
                              <div className="agenda-cell-content">
                                <div>{agendamentosCelula[0].NOME_CLIENTE}</div>
                                <div className="agenda-cell-sub">
                                  {agendamentosCelula[0].DTA_NASCIMENTO ? (() => {
                                    const nasc = new Date(agendamentosCelula[0].DTA_NASCIMENTO)
                                    let idade = new Date().getFullYear() - nasc.getFullYear()
                                    const mes = new Date().getMonth() - nasc.getMonth()
                                    if (mes < 0 || (mes === 0 && new Date().getDate() < nasc.getDate())) idade--
                                    return `(${idade} anos - Id:${agendamentosCelula[0].ID})`
                                  })() : `Id:${agendamentosCelula[0].ID}`}
                                </div>
                              </div>
                            ) : <div className="agenda-cell-content">&nbsp;</div>}
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="consulta-agenda-sidebar">
          <div className="consulta-agenda-calendar-box">
            <Calendar value={dataSelecionada} onChange={setDataSelecionada} calendarType="gregory" />
          </div>

          <div className="consulta-agenda-legend-box">
            <h3 className="consulta-agenda-legend-title">Legendas</h3>
            {Object.entries(STATUS).map(([sigla, { label, color }]) => (
              <div key={sigla} className="consulta-agenda-legend-item">
                <span className="agenda-legend-color" style={{ background: color }}></span>
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {agendamentoId && (
        <ConsultaAgendamento
          id={agendamentoId}
          onClose={() => { setAgendamentoId(null); carregarDados() }}
        />
      )}

      {novoSlot && (() => {
        const dataStr = `${dataSelecionada.getFullYear()}-${String(dataSelecionada.getMonth()+1).padStart(2,'0')}-${String(dataSelecionada.getDate()).padStart(2,'0')}`
        return (
          <NovoAgendamento
            data={dataStr}
            horario={novoSlot.horario}
            medico={novoSlot.medico}
            onClose={() => { setNovoSlot(null); carregarDados() }}
          />
        )
      })()}
    </div>
  )
}
