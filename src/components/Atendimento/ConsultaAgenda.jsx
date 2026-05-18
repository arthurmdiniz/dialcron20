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

      <div style={{ display: 'flex', gap: '0.8rem', flex: 1, minHeight: 0 }}>
        <div className="tabela-wrapper" style={{ flex: 1, maxHeight: 'none' }}>
          {carregando ? (
            <p>Carregando...</p>
          ) : (
            <div style={{ overflowX: 'auto', overflowY: 'auto', maxHeight: 'calc(100vh - 200px)' }}>
              <table className="agenda-tabela">
                <thead>
                  <tr>
                    <th style={{ minWidth: '60px', position: 'sticky', top: 0, zIndex: 2, background: '#f0f0f0' }}>HORÁRIO</th>
                    {medicos.map((m, idx) => (
                      <th key={m.ID} style={{ minWidth: '140px', position: 'sticky', top: 0, zIndex: 2, background: '#f0f0f0', borderRight: idx < medicos.length - 1 ? '2px solid #bbb' : 'none' }}>
                        {m.NOME}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {gerarHorarios().map(horario => (
                    <tr key={horario}>
                      <td style={{ textAlign: 'center', fontWeight: 600, padding: '0.3rem', borderBottom: '1px solid #ddd', background: '#fafafa' }}>{horario}</td>
                      {medicos.map((m, idx) => {
                        const agendamentosCelula = getAgendamentoNaCelula(m.ID, horario)
                        return (
                          <td
                            key={`${m.ID}_${horario}`}
                            style={{
                              padding: '0.3rem',
                              borderBottom: '1px solid #ddd',
                              borderRight: idx < medicos.length - 1 ? '2px solid #e0e0e0' : 'none',
                              textAlign: 'center',
                              cursor: 'pointer',
                              height: '3.2rem',
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
                              <div style={{ fontSize: '0.8rem', lineHeight: '1.3' }}>
                                <div>{agendamentosCelula[0].NOME_CLIENTE}</div>
                                <div style={{ fontSize: '0.7rem', color: '#666' }}>
                                  {agendamentosCelula[0].DTA_NASCIMENTO ? (() => {
                                    const nasc = new Date(agendamentosCelula[0].DTA_NASCIMENTO)
                                    let idade = new Date().getFullYear() - nasc.getFullYear()
                                    const mes = new Date().getMonth() - nasc.getMonth()
                                    if (mes < 0 || (mes === 0 && new Date().getDate() < nasc.getDate())) idade--
                                    return `(${idade} anos - Id:${agendamentosCelula[0].ID})`
                                  })() : `Id:${agendamentosCelula[0].ID}`}
                                </div>
                              </div>
                            ) : <div style={{ fontSize: '0.8rem', lineHeight: '1.3' }}>&nbsp;</div>}
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

        <div style={{ width: '280px', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          <div className="agenda-calendar" style={{ background: '#f5f5f5', padding: '0.6rem', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <Calendar value={dataSelecionada} onChange={setDataSelecionada} calendarType="gregory" />
          </div>

          <div style={{ background: '#f9f9f9', padding: '0.8rem', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <h3 style={{ margin: '0 0 0.5rem', color: '#277bbc', fontSize: '1rem' }}>Legendas</h3>
            {Object.entries(STATUS).map(([sigla, { label, color }]) => (
              <div key={sigla} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem', fontSize: '0.9rem' }}>
                <span style={{ display: 'inline-block', width: '16px', height: '16px', background: color, border: '1px solid #ccc', borderRadius: '3px' }}></span>
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
