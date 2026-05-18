import { useState, useEffect } from 'react'
import '../../styles/telasCadastros.css'

const API_URL = 'http://localhost:3001/api/medicos'

export default function CadastroMedicos({ onClose }) {
  const [registros, setRegistros] = useState([])
  const [especialidadesMedico, setEspecialidadesMedico] = useState([])
  const [todasEspecialidades, setTodasEspecialidades] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)
  const [sucesso, setSucesso] = useState('')

  const [formData, setFormData] = useState({
    nroCRM: '', ufCRM: 'SP', cliente: '1', nome: '',
    dddTelefone: '', telefone: '', dddCelular: '', celular: '',
    dddOutros: '', telefoneOutros: '', ativo: 'S'
  })
  const [editando, setEditando] = useState(false)

  useEffect(() => {
    carregarMedicos()
    carregarTodasEspecialidades()
  }, [])

  const carregarMedicos = async () => {
    try {
      setCarregando(true)
      const res = await fetch(`${API_URL}/todos`)
      if (!res.ok) throw new Error('Erro ao carregar médicos')
      const data = await res.json()
      setRegistros(data)
      setErro(null)
    } catch (error) {
      setErro('Erro ao conectar com o servidor: ' + error.message)
    } finally {
      setCarregando(false)
    }
  }

  const carregarTodasEspecialidades = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/especialidades')
      if (!res.ok) throw new Error('Erro ao carregar especialidades')
      setTodasEspecialidades(await res.json())
    } catch (error) {
      console.error('Erro ao carregar especialidades:', error)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleNovo = () => {
    setFormData({
      nroCRM: '', ufCRM: 'SP', cliente: '1', nome: '',
      dddTelefone: '', telefone: '', dddCelular: '', celular: '',
      dddOutros: '', telefoneOutros: '', ativo: 'S'
    })
    setEspecialidadesMedico([])
    setEditando(false)
  }

  const handleEditar = async (registro) => {
    try {
      const res = await fetch(`${API_URL}/${registro.NRO_CRM}`)
      if (!res.ok) throw new Error('Erro ao buscar médico')
      const medico = await res.json()

      setFormData({
        nroCRM: medico.nroCRM.toString(),
        ufCRM: medico.ufCRM || 'SP',
        cliente: medico.cliente?.toString() || '1',
        nome: medico.nome || '',
        dddTelefone: medico.dddTelefone?.toString() || '',
        telefone: medico.telefone?.toString() || '',
        dddCelular: medico.dddCelular?.toString() || '',
        celular: medico.celular?.toString() || '',
        dddOutros: medico.dddOutros?.toString() || '',
        telefoneOutros: medico.telefoneOutros?.toString() || '',
        ativo: medico.ativo || 'S'
      })

      const resEsp = await fetch(`${API_URL}/${registro.NRO_CRM}/especialidades`)
      if (resEsp.ok) {
        const esp = await resEsp.json()
        setEspecialidadesMedico(esp)
      }

      setEditando(true)
    } catch (error) {
      setErro('Erro ao carregar médico: ' + error.message)
    }
  }

  const toggleEspecialidade = async (idEsp) => {
    if (!formData.nroCRM || !editando) return

    const jaPossui = especialidadesMedico.includes(idEsp)

    try {
      if (jaPossui) {
        const res = await fetch(`${API_URL}/${formData.nroCRM}/especialidades/${idEsp}`, {
          method: 'DELETE'
        })
        if (!res.ok) throw new Error('Erro ao remover especialidade')
        setEspecialidadesMedico(especialidadesMedico.filter(id => id !== idEsp))
      } else {
        const res = await fetch(`${API_URL}/${formData.nroCRM}/especialidades`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ idEspecialidade: idEsp })
        })
        if (!res.ok) throw new Error('Erro ao adicionar especialidade')
        setEspecialidadesMedico([...especialidadesMedico, idEsp])
      }
      setErro(null)
    } catch (error) {
      setErro('Erro: ' + error.message)
    }
  }

  const handleSalvar = async (e) => {
    e.preventDefault()
    try {
      const payload = {
        nroCRM: parseInt(formData.nroCRM),
        ufCRM: formData.ufCRM,
        cliente: parseInt(formData.cliente),
        nome: formData.nome,
        dddTelefone: formData.dddTelefone ? parseInt(formData.dddTelefone) : null,
        telefone: formData.telefone ? parseInt(formData.telefone) : null,
        dddCelular: formData.dddCelular ? parseInt(formData.dddCelular) : null,
        celular: formData.celular ? parseInt(formData.celular) : null,
        dddOutros: formData.dddOutros ? parseInt(formData.dddOutros) : null,
        telefoneOutros: formData.telefoneOutros ? parseInt(formData.telefoneOutros) : null,
        ativo: formData.ativo
      }

      let res
      if (editando) {
        res = await fetch(`${API_URL}/${formData.nroCRM}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        })
      } else {
        res = await fetch(`${API_URL}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        })
      }

      if (!res.ok) throw new Error('Erro ao salvar médico')

      await carregarMedicos()
      handleNovo()
      setErro(null)
      setSucesso('Registro salvo com sucesso!')
      setTimeout(() => setSucesso(''), 3000)
    } catch (error) {
      setErro('Erro ao salvar: ' + error.message)
    }
  }

  const handleExcluir = async (crm) => {
    if (!window.confirm('Deseja realmente excluir este médico?')) return

    try {
      const res = await fetch(`${API_URL}/${crm}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, nroCRM: parseInt(crm), ativo: 'N' })
      })

      if (!res.ok) throw new Error('Erro ao inativar médico')

      await carregarMedicos()
      if (parseInt(formData.nroCRM) === crm) handleNovo()
    } catch (error) {
      setErro('Erro ao excluir: ' + error.message)
    }
  }

  return (
    <div className="cadmedico-container">
      <div className="cadmedico-header">
        <h1>Cadastro de Médicos</h1>
        <div className="header-right">
          {sucesso && <div className="mensagem-sucesso">{sucesso}</div>}
          <button className="btn-fechar" onClick={onClose}>✕</button>
        </div>
      </div>

      {erro && <div className="mensagem-erro">{erro}</div>}

      <div className="cadastrosmedicos-content">
        <div className="tabela-wrapper">
          <div className="tabela">
            <div className="tabela-linha tabela-cabecalho">
              <div className="tabela-celula">CRM</div>
              <div className="tabela-celula">Nome</div>
            </div>

            {carregando ? (
              <p>Carregando...</p>
            ) : (
              registros.map((reg) => (
                <div key={reg.NRO_CRM} className="tabela-linha" onClick={() => handleEditar(reg)} style={{cursor:'pointer'}}>
                  <div className="tabela-celula">{reg.UF_CRM ? `${reg.UF_CRM}/${reg.NRO_CRM}` : reg.NRO_CRM}</div>
                  <div className="tabela-celula">{reg.NOME}</div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="formulario-wrapper">
          <h2>{editando ? 'Editar Cadastro' : 'Novo Cadastro'}</h2>

          <form className="formulario" onSubmit={handleSalvar}>
            <div className="form-row">
              <div className="form-group" style={{ flex: 1 }}>
                <label>CRM:</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <select name="ufCRM" value={formData.ufCRM} onChange={handleChange} style={{ width: '60px' }} required>
                    <option value="">UF</option>
                    <option value="AC">AC</option>
                    <option value="AL">AL</option>
                    <option value="AM">AM</option>
                    <option value="AP">AP</option>
                    <option value="BA">BA</option>
                    <option value="CE">CE</option>
                    <option value="DF">DF</option>
                    <option value="ES">ES</option>
                    <option value="GO">GO</option>
                    <option value="MA">MA</option>
                    <option value="MG">MG</option>
                    <option value="MS">MS</option>
                    <option value="MT">MT</option>
                    <option value="PA">PA</option>
                    <option value="PB">PB</option>
                    <option value="PE">PE</option>
                    <option value="PI">PI</option>
                    <option value="PR">PR</option>
                    <option value="RJ">RJ</option>
                    <option value="RN">RN</option>
                    <option value="RO">RO</option>
                    <option value="RR">RR</option>
                    <option value="RS">RS</option>
                    <option value="SC">SC</option>
                    <option value="SE">SE</option>
                    <option value="SP">SP</option>
                    <option value="TO">TO</option>
                  </select>
                  <input
                    type="number" name="nroCRM" value={formData.nroCRM}
                    onChange={handleChange} placeholder="Número" style={{ flex: 1 }} required
                  />
                </div>
              </div>

              <div className="form-group" style={{ flex: 1 }}>
                <label>Cliente:</label>
                <input type="number" name="cliente" value={formData.cliente} onChange={handleChange} required />
              </div>

              <div className="form-group form-group-toggle">
                <label>Ativo:</label>
                <label className="toggle-switch">
                  <input
                    type="checkbox" name="ativo"
                    checked={formData.ativo === 'S'}
                    onChange={(e) => setFormData({ ...formData, ativo: e.target.checked ? 'S' : 'N' })}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>

            <div className="form-group">
              <label>Nome:</label>
              <input type="text" name="nome" value={formData.nome} onChange={handleChange} required />
            </div>

            <div className="form-row">
              <div className="form-group" style={{ flex: 1 }}>
                <label>Telefone:</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input type="number" name="dddTelefone" value={formData.dddTelefone} onChange={handleChange} placeholder="DDD" style={{ width: '70px' }} />
                  <input type="number" name="telefone" value={formData.telefone} onChange={handleChange} placeholder="Número" style={{ flex: 1 }} />
                </div>
              </div>

              <div className="form-group" style={{ flex: 1 }}>
                <label>Celular:</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input type="number" name="dddCelular" value={formData.dddCelular} onChange={handleChange} placeholder="DDD" style={{ width: '70px' }} />
                  <input type="number" name="celular" value={formData.celular} onChange={handleChange} placeholder="Número" style={{ flex: 1 }} />
                </div>
              </div>

              <div className="form-group" style={{ flex: 1 }}>
                <label>Outros:</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input type="number" name="dddOutros" value={formData.dddOutros} onChange={handleChange} placeholder="DDD" style={{ width: '70px' }} />
                  <input type="number" name="telefoneOutros" value={formData.telefoneOutros} onChange={handleChange} placeholder="Número" style={{ flex: 1 }} />
                </div>
              </div>
            </div>

            <div className="form-column">
              <button type="button" className="btn-novo" onClick={handleNovo} style={{marginRight:'0.5rem'}}>Novo Cadastro</button>
              <button type="submit" className="btn-salvar">
                {editando ? 'Atualizar' : 'Cadastrar'}
              </button>
            </div>
          </form>

          {/* Seção de Especialidades */}
          {editando && (
            <div className="especialidades-wrapper">
              <h3>Especialidades do Médico</h3>
              <div className="especialidades-grid">
                {todasEspecialidades.map(esp => {
                  const selecionada = especialidadesMedico.includes(esp.ID)
                  return (
                    <div
                      key={esp.ID}
                      className={`especialidade-item ${selecionada ? 'selecionada' : ''}`}
                      onClick={() => toggleEspecialidade(esp.ID)}
                      style={{cursor:'pointer'}}
                    >
                      {esp.DES_ESPECIALIDADE}
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
