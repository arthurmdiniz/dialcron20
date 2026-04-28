import { useState, useEffect } from 'react'
import './telasCadastros.css'

const API_URL = 'http://localhost:3001/api/empresas'

export default function CadastroEmpresa({ onClose }) {
  const [registros, setRegistros] = useState([])
  const [formData, setFormData] = useState({
    id: '',
    cliente: '',
    nomeFantasia: '',
    razaoSocial: '',
    cnpj: '',
    ie: '',
    im: '',
    cep: '',
    logradouro: '',
    numero: '',
    bairro: '',
    complemento: '',
    municipio: '',
    uf: 'SP',
    pais: 'Brasil',
    email: '',
    ddd: '',
    telefone: ''
  })
  const [editando, setEditando] = useState(false)
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)
  const [sucesso, setSucesso] = useState('')

  const ufs = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 'RN', 'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO']

  useEffect(() => { carregarTodos() }, [])

  const carregarTodos = async () => {
    try {
      setCarregando(true)
      const res = await fetch(`${API_URL}`)
      if (!res.ok) throw new Error('Erro ao carregar')
      const data = await res.json()
      setRegistros(data || [])
      setErro(null)
    } catch (error) {
      setErro('Erro: ' + error.message)
      setRegistros([])
    } finally {
      setCarregando(false)
    }
  }

  const handleNovo = () => {
    setFormData({
      id: '',
      cliente: '',
      nomeFantasia: '',
      razaoSocial: '',
      cnpj: '',
      ie: '',
      im: '',
      cep: '',
      logradouro: '',
      numero: '',
      bairro: '',
      complemento: '',
      municipio: '',
      uf: 'SP',
      pais: 'Brasil',
      email: '',
      ddd: '',
      telefone: ''
    })
    setEditando(false)
  }

  const handleEditar = async (reg) => {
    try {
      const res = await fetch(`${API_URL}/${reg.ID}`)
      if (!res.ok) throw new Error('Erro ao buscar')
      const data = await res.json()
      setFormData({
        id: String(data.ID),
        cliente: String(data.CLIENTE || ''),
        nomeFantasia: data.NOME_FANTASIA || '',
        razaoSocial: data.RAZAO_SOCIAL || '',
        cnpj: data.CNPJ ? String(data.CNPJ) : '',
        ie: data.INSC_ESTADUAL ? String(data.INSC_ESTADUAL) : '',
        im: data.INSC_MUNICIPAL ? String(data.INSC_MUNICIPAL) : '',
        cep: data.CEP ? String(data.CEP) : '',
        logradouro: data.LOGRADOURO || '',
        numero: data.NUMERO ? String(data.NUMERO) : '',
        bairro: data.BAIRRO || '',
        complemento: data.COMPLEMENTO || '',
        municipio: data.MUNICIPIO || '',
        uf: data.UF || 'SP',
        pais: data.PAIS || 'Brasil',
        email: data.EMAIL || '',
        ddd: data.DDD ? String(data.DDD) : '',
        telefone: data.TELEFONE ? String(data.TELEFONE) : ''
      })
      setEditando(true)
    } catch (error) {
      setErro('Erro: ' + error.message)
    }
  }

  const handleSalvar = async (e) => {
    e.preventDefault()
    try {
      if (!formData.cliente) {
        setErro('Cliente obrigatório')
        return
      }
      if (!formData.nomeFantasia) {
        setErro('Nome fantasia obrigatório')
        return
      }
      if (!formData.razaoSocial) {
        setErro('Razão social obrigatória')
        return
      }
      if (!formData.cnpj) {
        setErro('CNPJ obrigatório')
        return
      }
      if (!formData.cep) {
        setErro('CEP obrigatório')
        return
      }
      if (!formData.logradouro) {
        setErro('Endereço obrigatório')
        return
      }
      if (!formData.numero) {
        setErro('Número obrigatório')
        return
      }
      if (!formData.bairro) {
        setErro('Bairro obrigatório')
        return
      }
      if (!formData.municipio) {
        setErro('Município obrigatório')
        return
      }
      if (!formData.uf) {
        setErro('UF obrigatória')
        return
      }
      if (!formData.pais) {
        setErro('País obrigatório')
        return
      }
      if (!formData.ddd) {
        setErro('DDD obrigatório')
        return
      }
      if (!formData.telefone) {
        setErro('Telefone obrigatório')
        return
      }

      const body = {
        cliente: formData.cliente,
        nomeFantasia: formData.nomeFantasia,
        razaoSocial: formData.razaoSocial,
        cnpj: formData.cnpj,
        inscEstadual: formData.ie,
        inscMunicipal: formData.im,
        cep: formData.cep,
        logradouro: formData.logradouro,
        numero: formData.numero,
        bairro: formData.bairro,
        complemento: formData.complemento,
        municipio: formData.municipio,
        uf: formData.uf,
        pais: formData.pais,
        email: formData.email,
        ddd: formData.ddd,
        telefone: formData.telefone
      }

      const method = editando ? 'PUT' : 'POST'
      const url = editando ? `${API_URL}/${formData.id}` : API_URL

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
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
    <div className="cadastro-especialidade-container">
      <div className="cadmedico-header">
        <h1>Cadastro de Empresa</h1>
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
              <div className="tabela-celula">ID</div>
              <div className="tabela-celula">Nome Fantasia</div>
            </div>

            {carregando ? <p>Carregando...</p> : registros.map(reg => (
              <div key={reg.ID} className="tabela-linha" onClick={() => handleEditar(reg)} style={{cursor:'pointer'}}>
                <div className="tabela-celula">{reg.ID}</div>
                <div className="tabela-celula">{reg.NOME_FANTASIA}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="formulario-wrapper">
          <h2>{editando ? 'Editar' : 'Novo Cadastro'}</h2>
          <form className="formulario" onSubmit={handleSalvar}>
            <div className="form-row-2">
              <div className="form-group">
                <label>ID:</label>
                <input type="text" value={formData.id} readOnly />
              </div>

              <div className="form-group">
                <label>Cliente:</label>
                <input 
                  type="text" 
                  value={formData.cliente} 
                  onChange={e => setFormData({...formData, cliente: e.target.value})}
                  required 
                />
              </div>
            </div>

            <div className="form-group">
              <label>Nome Fantasia:</label>
              <input 
                type="text" 
                value={formData.nomeFantasia} 
                onChange={e => setFormData({...formData, nomeFantasia: e.target.value})}
                required 
              />
            </div>

            <div className="form-group">
              <label>Razão Social:</label>
              <input 
                type="text" 
                value={formData.razaoSocial} 
                onChange={e => setFormData({...formData, razaoSocial: e.target.value})}
                required 
              />
            </div>

            <div className="form-row-3">
              <div className="form-group">
                <label>CNPJ:</label>
                <input 
                  type="text" 
                  value={formData.cnpj} 
                  onChange={e => setFormData({...formData, cnpj: e.target.value})}
                  required 
                />
              </div>

              <div className="form-group">
                <label>Insc. Estadual:</label>
                <input 
                  type="text" 
                  value={formData.ie} 
                  onChange={e => setFormData({...formData, ie: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>Insc. Municipal:</label>
                <input 
                  type="text" 
                  value={formData.im} 
                  onChange={e => setFormData({...formData, im: e.target.value})}
                />
              </div>
            </div>

            <div className="form-row-4">
              <div className="form-group">
                <label>CEP:</label>
                <input 
                  type="text" 
                  value={formData.cep} 
                  onChange={e => setFormData({...formData, cep: e.target.value})}
                  required 
                />
              </div>

              <div className="form-group">
                <label>Município:</label>
                <input 
                  type="text" 
                  value={formData.municipio} 
                  onChange={e => setFormData({...formData, municipio: e.target.value})}
                  required 
                />
              </div>

              <div className="form-group">
                <label>UF:</label>
                <select 
                  value={formData.uf} 
                  onChange={e => setFormData({...formData, uf: e.target.value})}
                  required
                >
                  {ufs.map(uf => (
                    <option key={uf} value={uf}>{uf}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>País:</label>
                <input 
                  type="text" 
                  value={formData.pais} 
                  onChange={e => setFormData({...formData, pais: e.target.value})}
                  required 
                />
              </div>
            </div>

            <div className="form-row-3">
              <div className="form-group" style={{gridColumn: 'span 2'}}>
                <label>Endereço:</label>
                <input 
                  type="text" 
                  value={formData.logradouro} 
                  onChange={e => setFormData({...formData, logradouro: e.target.value})}
                  required 
                />
              </div>

              <div className="form-group">
                <label>Nro:</label>
                <input 
                  type="text" 
                  value={formData.numero} 
                  onChange={e => setFormData({...formData, numero: e.target.value})}
                  required 
                />
              </div>
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label>Bairro:</label>
                <input 
                  type="text" 
                  value={formData.bairro} 
                  onChange={e => setFormData({...formData, bairro: e.target.value})}
                  required 
                />
              </div>

              <div className="form-group">
                <label>Complemento:</label>
                <input 
                  type="text" 
                  value={formData.complemento} 
                  onChange={e => setFormData({...formData, complemento: e.target.value})}
                />
              </div>
            </div>

            <div className="form-row-4">
              <div className="form-group" style={{gridColumn: 'span 2'}}>
                <label>E-mail:</label>
                <input 
                  type="email" 
                  value={formData.email} 
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>DDD:</label>
                <input 
                  type="text" 
                  value={formData.ddd} 
                  onChange={e => setFormData({...formData, ddd: e.target.value})}
                  required 
                />
              </div>

              <div className="form-group">
                <label>Telefone:</label>
                <input 
                  type="text" 
                  value={formData.telefone} 
                  onChange={e => setFormData({...formData, telefone: e.target.value})}
                  required 
                />
              </div>
            </div>

            <div className="form-column">
              <button type="button" className="btn-novo" onClick={handleNovo}>Novo</button>
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