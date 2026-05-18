import { useState, useEffect } from 'react'
import '../../styles/telasCadastros.css'

const API_URL = 'http://localhost:3001/api/clientes'

export default function CadastroPaciente({ onClose }) {
  const [registros, setRegistros] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)
  const [sucesso, setSucesso] = useState('')
  const [busca, setBusca] = useState('')

  const [formData, setFormData] = useState({
    cliente: '', nome: '', cgc: '', endereco: '', uf: 'SP',
    dddTelefone: '', telefone: '', dddCelular: '', celular: '',
    dataNascimento: '', sexo: '', email: ''
  })
  const [editando, setEditando] = useState(false)

  useEffect(() => {
    carregarPacientes()
  }, [])

  const carregarPacientes = async (termo) => {
    try {
      setCarregando(true)
      const url = termo ? `${API_URL}?busca=${encodeURIComponent(termo)}` : API_URL
      const res = await fetch(url)
      if (!res.ok) throw new Error('Erro ao carregar pacientes')
      const data = await res.json()
      setRegistros(data)
      setErro(null)
    } catch (error) {
      setErro('Erro ao conectar com o servidor: ' + error.message)
    } finally {
      setCarregando(false)
    }
  }

  const handleBusca = (e) => {
    e.preventDefault()
    carregarPacientes(busca)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleNovo = () => {
    setFormData({
      cliente: '', nome: '', cgc: '', endereco: '', uf: 'SP',
      dddTelefone: '', telefone: '', dddCelular: '', celular: '',
      dataNascimento: '', sexo: '', email: ''
    })
    setEditando(false)
  }

  const handleEditar = async (registro) => {
    try {
      const res = await fetch(`${API_URL}/${registro.CLIENTE}`)
      if (!res.ok) throw new Error('Erro ao buscar paciente')
      const p = await res.json()

      setFormData({
        cliente: p.CLIENTE?.toString() || '',
        nome: p.NOME || '',
        cgc: p.CPF_CNPJ || '',
        endereco: p.LOGRADOURO || '',
        uf: 'SP',
        dddTelefone: p.TELEFONE_DDD?.toString() || '',
        telefone: p.TELEFONE?.toString() || '',
        dddCelular: p.CELULAR_DDD?.toString() || '',
        celular: p.CELULAR?.toString() || '',
        dataNascimento: p.DTA_NASCIMENTO ? p.DTA_NASCIMENTO.split('T')[0] : '',
        sexo: p.SEXO || '',
        email: p.EMAIL || ''
      })
      setEditando(true)
    } catch (error) {
      setErro('Erro ao carregar paciente: ' + error.message)
    }
  }

  const handleSalvar = async (e) => {
    e.preventDefault()

    if (!formData.nome.trim()) {
      setErro('Informe o nome do paciente.')
      return
    }
    if (!formData.cgc.trim()) {
      setErro('Informe o CPF/CNPJ.')
      return
    }

    try {
      const payload = {
        nome: formData.nome,
        cgc: formData.cgc,
        endereco: formData.endereco,
        uf: formData.uf,
        dddTelefone: formData.dddTelefone ? parseInt(formData.dddTelefone) : null,
        telefone: formData.telefone ? parseInt(formData.telefone) : null,
        dddCelular: formData.dddCelular ? parseInt(formData.dddCelular) : null,
        celular: formData.celular ? parseInt(formData.celular) : null,
        dataNascimento: formData.dataNascimento || null,
        sexo: formData.sexo || null,
        email: formData.email || null
      }

      let res
      if (editando) {
        res = await fetch(`${API_URL}/${formData.cliente}`, {
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

      if (!res.ok) throw new Error('Erro ao salvar paciente')

      await carregarPacientes()
      handleNovo()
      setErro(null)
      setSucesso('Registro salvo com sucesso!')
      setTimeout(() => setSucesso(''), 3000)
    } catch (error) {
      setErro('Erro ao salvar: ' + error.message)
    }
  }

  return (
    <div className="cadmedico-container">
      <div className="cadmedico-header">
        <h1>Cadastro de Pacientes</h1>
        <div className="header-right">
          {sucesso && <div className="mensagem-sucesso">{sucesso}</div>}
          <button className="btn-fechar" onClick={onClose}>✕</button>
        </div>
      </div>

      {erro && <div className="mensagem-erro">{erro}</div>}

      <div className="cadastrosmedicos-content">
        <div className="tabela-wrapper">
          <form onSubmit={handleBusca} style={{ marginBottom: '0.8rem', display: 'flex', gap: '0.5rem' }}>
            <input
              type="text" value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar por nome ou CPF..."
              style={{ flex: 1, padding: '0.5rem', border: '2px solid #ddd', borderRadius: '5px' }}
            />
            <button type="submit" className="btn-novo" style={{ padding: '0.5rem 1rem' }}>Buscar</button>
          </form>

          <div className="tabela">
            <div className="tabela-linha tabela-cabecalho">
              <div className="tabela-celula">Código</div>
              <div className="tabela-celula">Nome</div>
              <div className="tabela-celula">CPF/CNPJ</div>
            </div>

            {carregando ? (
              <p>Carregando...</p>
            ) : (
              registros.map((reg) => (
                <div key={reg.CLIENTE} className="tabela-linha" onClick={() => handleEditar(reg)} style={{ cursor: 'pointer' }}>
                  <div className="tabela-celula">{reg.CLIENTE}</div>
                  <div className="tabela-celula">{reg.NOME}</div>
                  <div className="tabela-celula">{reg.CPF_CNPJ}</div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="formulario-wrapper">
          <h2>{editando ? 'Editar Paciente' : 'Novo Paciente'}</h2>

          <form className="formulario" onSubmit={handleSalvar}>
            <div className="form-row">
              <div className="form-group" style={{ flex: 1 }}>
                <label>Código:</label>
                <input type="text" name="cliente" value={formData.cliente} readOnly />
              </div>
              <div className="form-group" style={{ flex: 2 }}>
                <label>Nome completo:</label>
                <input type="text" name="nome" value={formData.nome} onChange={handleChange} required />
              </div>
              <div className="form-group" style={{ flex: 1 }}>
                <label>CPF/CNPJ:</label>
                <input type="text" name="cgc" value={formData.cgc} onChange={handleChange} required />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group" style={{ flex: 3 }}>
                <label>Logradouro:</label>
                <input type="text" name="endereco" value={formData.endereco} onChange={handleChange} />
              </div>
              <div className="form-group" style={{ flex: 1 }}>
                <label>UF:</label>
                <select name="uf" value={formData.uf} onChange={handleChange}>
                  <option value="">Selecione</option>
                  {['AC','AL','AM','AP','BA','CE','DF','ES','GO','MA','MG','MS','MT','PA','PB','PE','PI','PR','RJ','RN','RO','RR','RS','SC','SE','SP','TO'].map(u => (
                    <option key={u} value={u}>{u}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group" style={{ flex: 1 }}>
                <label>DDD Tel:</label>
                <input type="text" name="dddTelefone" value={formData.dddTelefone} onChange={handleChange} />
              </div>
              <div className="form-group" style={{ flex: 2 }}>
                <label>Telefone:</label>
                <input type="text" name="telefone" value={formData.telefone} onChange={handleChange} />
              </div>
              <div className="form-group" style={{ flex: 1 }}>
                <label>DDD Cel:</label>
                <input type="text" name="dddCelular" value={formData.dddCelular} onChange={handleChange} />
              </div>
              <div className="form-group" style={{ flex: 2 }}>
                <label>Celular:</label>
                <input type="text" name="celular" value={formData.celular} onChange={handleChange} />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group" style={{ flex: 1 }}>
                <label>Data Nascimento:</label>
                <input type="date" name="dataNascimento" value={formData.dataNascimento} onChange={handleChange} />
              </div>
              <div className="form-group" style={{ flex: 0.5 }}>
                <label>Sexo:</label>
                <select name="sexo" value={formData.sexo} onChange={handleChange}>
                  <option value=""> </option>
                  <option value="M">M</option>
                  <option value="F">F</option>
                </select>
              </div>
              <div className="form-group" style={{ flex: 2 }}>
                <label>E-mail:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} />
              </div>
            </div>

            <div className="form-column">
              <button type="button" className="btn-novo" onClick={handleNovo} style={{ marginRight: '0.5rem' }}>Novo Cadastro</button>
              <button type="submit" className="btn-salvar">
                {editando ? 'Atualizar' : 'Cadastrar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
