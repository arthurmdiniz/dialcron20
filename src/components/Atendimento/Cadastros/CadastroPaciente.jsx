import { useState, useEffect } from 'react'
import '../../../styles/telasCadastros.css'

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

  useEffect(() => { carregarTodos() }, [])

  const carregarTodos = async () => {
    try {
      setCarregando(true)
      const res = await fetch(API_URL)
      if (!res.ok) throw new Error('Erro ao carregar')
      setRegistros(await res.json())
      setErro(null)
    } catch (error) {
      setErro('Erro: ' + error.message)
    } finally {
      setCarregando(false)
    }
  }

  const handleBusca = async (e) => {
    e.preventDefault()
    if (!busca.trim()) {
      carregarTodos()
      return
    }
    try {
      setCarregando(true)
      const res = await fetch(`${API_URL}?busca=${encodeURIComponent(busca)}`)
      if (!res.ok) throw new Error('Erro na busca')
      setRegistros(await res.json())
      setErro(null)
    } catch (error) {
      setErro('Erro: ' + error.message)
    } finally {
      setCarregando(false)
    }
  }

  const handleNovo = () => {
    setFormData({
      cliente: '', nome: '', cgc: '', endereco: '', uf: 'SP',
      dddTelefone: '', telefone: '', dddCelular: '', celular: '',
      dataNascimento: '', sexo: '', email: ''
    })
    setEditando(false)
  }

  const handleEditar = async (reg) => {
    try {
      setCarregando(true)
      const res = await fetch(`${API_URL}/${reg.CLIENTE}`)
      if (!res.ok) throw new Error('Erro ao carregar')
      const data = await res.json()
      setFormData({
        cliente: String(data.CLIENTE),
        nome: data.NOME || '',
        cgc: data.CGC || '',
        endereco: data.ENDERECO || '',
        uf: data.UF || 'SP',
        dddTelefone: data.DDD_TELEFONE ? String(data.DDD_TELEFONE) : '',
        telefone: data.TELEFONE ? String(data.TELEFONE) : '',
        dddCelular: data.DDD_CELULAR ? String(data.DDD_CELULAR) : '',
        celular: data.CELULAR ? String(data.CELULAR) : '',
        dataNascimento: data.DATA_NASCIMENTO || '',
        sexo: data.SEXO || '',
        email: data.EMAIL || ''
      })
      setEditando(true)
    } catch (error) {
      setErro('Erro: ' + error.message)
    } finally {
      setCarregando(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSalvar = async (e) => {
    e.preventDefault()
    try {
      const payload = {
        cliente: parseInt(formData.cliente),
        nome: formData.nome,
        cgc: formData.cgc,
        endereco: formData.endereco,
        uf: formData.uf,
        dddTelefone: formData.dddTelefone ? parseInt(formData.dddTelefone) : null,
        telefone: formData.telefone ? parseInt(formData.telefone) : null,
        dddCelular: formData.dddCelular ? parseInt(formData.dddCelular) : null,
        celular: formData.celular ? parseInt(formData.celular) : null,
        dataNascimento: formData.dataNascimento,
        sexo: formData.sexo,
        email: formData.email
      }

      const method = editando ? 'PUT' : 'POST'
      const url = editando ? `${API_URL}/${formData.cliente}` : API_URL

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (!res.ok) throw new Error('Erro ao salvar')
      await carregarTodos()
      handleNovo()
      setErro(null)
      setSucesso('Registro salvo com sucesso!')
      setTimeout(() => setSucesso(''), 3000)
    } catch (error) {
      setErro('Erro: ' + error.message)
    }
  }

  return (
    <div className="cadastro-container">
      <div className="cadastro-header">
        <h1>Cadastro de Pacientes</h1>
        <div className="header-right">
          {sucesso && <div className="mensagem-sucesso">{sucesso}</div>}
          <button className="btn-fechar" onClick={onClose}>✕</button>
        </div>
      </div>

      {erro && <div className="mensagem-erro">{erro}</div>}

      <div className="cadastro-content">
        <div className="tabela-wrapper">
          <form onSubmit={handleBusca} className="search-form">
            <input
              type="text" value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar por nome ou CPF..."
              className="search-input"
            />
            <button type="submit" className="btn-novo">Buscar</button>
          </form>

          <table className="tabela">
            <thead>
              <tr className="tabela-cabecalho">
                <th className="tabela-celula">Código</th>
                <th className="tabela-celula">Nome</th>
              </tr>
            </thead>
            <tbody>
              {carregando ? (
                <tr><td className="tabela-celula" colSpan="2">Carregando...</td></tr>
              ) : (
                registros.map((reg) => (
                  <tr key={reg.CLIENTE} className="tabela-linha" onClick={() => handleEditar(reg)}>
                    <td className="tabela-celula">{reg.CLIENTE}</td>
                    <td className="tabela-celula">{reg.NOME}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="formulario-wrapper">
          <h2>{editando ? 'Editar Paciente' : 'Novo Paciente'}</h2>

          <form className="formulario" onSubmit={handleSalvar}>
            <div className="form-row">
              <div className="form-group form-group-flex">
                <label>Código:</label>
                <input type="text" name="cliente" value={formData.cliente} readOnly />
              </div>
              <div className="form-group form-group-flex-2">
                <label>Nome completo:</label>
                <input type="text" name="nome" value={formData.nome} onChange={handleChange} required />
              </div>
              <div className="form-group form-group-flex">
                <label>CPF/CNPJ:</label>
                <input type="text" name="cgc" value={formData.cgc} onChange={handleChange} required />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group form-group-flex-3">
                <label>Logradouro:</label>
                <input type="text" name="endereco" value={formData.endereco} onChange={handleChange} />
              </div>
              <div className="form-group form-group-flex">
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
              <div className="form-group form-group-flex">
                <label>DDD Tel:</label>
                <input type="text" name="dddTelefone" value={formData.dddTelefone} onChange={handleChange} />
              </div>
              <div className="form-group form-group-flex-2">
                <label>Telefone:</label>
                <input type="text" name="telefone" value={formData.telefone} onChange={handleChange} />
              </div>
              <div className="form-group form-group-flex">
                <label>DDD Cel:</label>
                <input type="text" name="dddCelular" value={formData.dddCelular} onChange={handleChange} />
              </div>
              <div className="form-group form-group-flex-2">
                <label>Celular:</label>
                <input type="text" name="celular" value={formData.celular} onChange={handleChange} />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group form-group-flex">
                <label>Data Nascimento:</label>
                <input type="date" name="dataNascimento" value={formData.dataNascimento} onChange={handleChange} />
              </div>
              <div className="form-group form-group-flex-half">
                <label>Sexo:</label>
                <select name="sexo" value={formData.sexo} onChange={handleChange}>
                  <option value=""> </option>
                  <option value="M">M</option>
                  <option value="F">F</option>
                </select>
              </div>
              <div className="form-group form-group-flex-2">
                <label>E-mail:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} />
              </div>
            </div>

            <div className="form-column">
              <button type="button" className="btn-novo" onClick={handleNovo}>Novo Cadastro</button>
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
