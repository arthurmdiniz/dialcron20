import { useState, useEffect } from 'react'
import '../../styles/telasCadastros.css'

const API_URL = 'http://localhost:3001/api/usuarios'

export default function CadastroUsuario({ onClose }) {
  const [registros, setRegistros] = useState([])
  const [formData, setFormData] = useState({
    id: '',
    login: '',
    senha: '',
    nome: '',
    perfil: 'U',
    grupo: '',
    ativo: 'S'
  })
  const [editando, setEditando] = useState(false)
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)
  const [sucesso, setSucesso] = useState('')

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
      login: '',
      senha: '',
      nome: '',
      perfil: 'U',
      grupo: '',
      ativo: 'S'
    })
    setEditando(false)
  }

  const handleEditar = async (reg) => {
    try {
      const res = await fetch(`${API_URL}/id/${reg.ID}`)
      if (!res.ok) throw new Error('Erro ao buscar')
      const data = await res.json()
      setFormData({
        id: String(data.ID),
        login: data.LOGIN || '',
        senha: data.SENHA || '',
        nome: data.NOME || '',
        perfil: data.PERFIL || 'U',
        grupo: data.GRUPO || '',
        ativo: data.ATIVO || 'S'
      })
      setEditando(true)
    } catch (error) {
      setErro('Erro: ' + error.message)
    }
  }

  const handleSalvar = async (e) => {
    e.preventDefault()
    try {
      if (!formData.login.trim()) {
        setErro('Login obrigatório')
        return
      }
      if (!formData.senha.trim()) {
        setErro('Senha obrigatória')
        return
      }
      if (!formData.nome.trim()) {
        setErro('Nome obrigatório')
        return
      }
      if (!formData.grupo.trim()) {
        setErro('Grupo obrigatório')
        return
      }
      if (!formData.perfil) {
        setErro('Selecione o perfil')
        return
      }

      const body = {
        login: formData.login,
        senha: formData.senha,
        nome: formData.nome,
        perfil: formData.perfil,
        grupo: formData.grupo,
        ativo: formData.ativo
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

  const getPerfilLabel = (perfil) => {
    switch(perfil) {
      case 'A': return 'Administrador'
      case 'G': return 'Gerente'
      case 'U': return 'Usuário'
      default: return perfil
    }
  }

  return (
    <div className="cadastro-especialidade-container">
      <div className="cadmedico-header">
        <h1>Cadastro de Usuários</h1>
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
              <div className="tabela-celula">Login</div>
            </div>

            {carregando ? <p>Carregando...</p> : registros.map(reg => (
              <div key={reg.ID} className="tabela-linha" onClick={() => handleEditar(reg)} style={{cursor:'pointer'}}>
                <div className="tabela-celula">{reg.ID}</div>
                <div className="tabela-celula">{reg.LOGIN}</div>
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
                <label>Login:</label>
                <input
                  type="text"
                  value={formData.login}
                  onChange={e => setFormData({...formData, login: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label>Senha:</label>
                <input
                  type="password"
                  value={formData.senha}
                  onChange={e => setFormData({...formData, senha: e.target.value})}
                  required
                />
              </div>

              <div className="form-group form-group-toggle">
                <label>Inativo:</label>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={formData.ativo === 'N'}
                    onChange={e => setFormData({...formData, ativo: e.target.checked ? 'N' : 'S'})}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>

            <div className="form-group">
              <label>Nome Completo:</label>
              <input
                type="text"
                value={formData.nome}
                onChange={e => setFormData({...formData, nome: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label>Perfil:</label>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="perfil"
                    value="A"
                    checked={formData.perfil === 'A'}
                    onChange={e => setFormData({...formData, perfil: e.target.value})}
                  />
                  Administrador
                </label>
                <label>
                  <input
                    type="radio"
                    name="perfil"
                    value="G"
                    checked={formData.perfil === 'G'}
                    onChange={e => setFormData({...formData, perfil: e.target.value})}
                  />
                  Gerente
                </label>
                <label>
                  <input
                    type="radio"
                    name="perfil"
                    value="U"
                    checked={formData.perfil === 'U'}
                    onChange={e => setFormData({...formData, perfil: e.target.value})}
                  />
                  Usuário
                </label>
              </div>
            </div>

            <div className="form-group">
              <label>Grupo:</label>
              <input
                type="text"
                value={formData.grupo}
                onChange={e => setFormData({...formData, grupo: e.target.value})}
                required
              />
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
