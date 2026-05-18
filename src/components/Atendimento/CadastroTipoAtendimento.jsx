import { useState, useEffect } from 'react'
import '../../styles/telasCadastros.css'

const API_URL = 'http://localhost:3001/api/tipo-atendimento'

export default function CadastroTipoAtendimento({ onClose }) {
  const [registros, setRegistros] = useState([])
  const [formData, setFormData] = useState({ id: '', desTipoAtendimento: '', ativo: 'S' })
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
    setFormData({ id: '', desTipoAtendimento: '', ativo: 'S' })
    setEditando(false)
  }

  const handleEditar = async (reg) => {
    try {
      const res = await fetch(`${API_URL}/${reg.ID}`)
      if (!res.ok) throw new Error('Erro ao buscar')
      const data = await res.json()
      setFormData({
        id: String(data.ID),
        desTipoAtendimento: data.DES_ATENDIMENTO,
        ativo: data.ATIVO
      })
      setEditando(true)
    } catch (error) {
      setErro('Erro: ' + error.message)
    }
  }

  const handleSalvar = async (e) => {
    e.preventDefault()
    try {
      if (!formData.desTipoAtendimento.trim()) {
        setErro('Descrição obrigatória')
        return
      }

      const method = editando ? 'PUT' : 'POST'
      const url = editando ? `${API_URL}/${formData.id}` : API_URL
      const body = editando
        ? { desTipoAtendimento: formData.desTipoAtendimento, ativo: formData.ativo }
        : { desTipoAtendimento: formData.desTipoAtendimento }

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
          <h1>Cadastro de Tipo de Atendimento</h1>
          <div className="header-right">
            {sucesso && <div className="mensagem-sucesso">{sucesso}</div>}
            <button className="btn-fechar" onClick={onClose}>✕</button>
          </div>
        </div>

        {erro && <div className="mensagem-erro">{erro}</div>}

      <div className="cadastrosmedicos-content">
        {/* Tabela */}
        <div className="tabela-wrapper">
          <div className="tabela">
            <div className="tabela-linha tabela-cabecalho">
              <div className="tabela-celula">ID</div>
              <div className="tabela-celula">Descrição</div>
            </div>

            {carregando ? <p>Carregando...</p> : registros.map(reg => (
              <div key={reg.ID} className="tabela-linha" onClick={() => handleEditar(reg)} style={{cursor:'pointer'}}>
                <div className="tabela-celula">{reg.ID}</div>
                <div className="tabela-celula">{reg.DES_ATENDIMENTO}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Formulário */}
        <div className="formulario-wrapper">
          <h2>{editando ? 'Editar' : 'Novo Cadastro'}</h2>
          <form className="formulario" onSubmit={handleSalvar}>
            <div className="form-group">
              <label>ID:</label>
              <input type="text" value={formData.id} readOnly />
            </div>

            <div className="form-group">
              <label>Descrição:</label>
              <input 
                type="text" 
                name="desTipoAtendimento" 
                value={formData.desTipoAtendimento} 
                onChange={e => setFormData({...formData, desTipoAtendimento: e.target.value})}
                required 
              />
            </div>

            <div className="form-group form-group-toggle">
              <label>Ativo:</label>
              <label className="toggle-switch">
                <input 
                  type="checkbox"
                  checked={formData.ativo === 'S'} 
                  onChange={e => setFormData({...formData, ativo: e.target.checked ? 'S' : 'N'})}
                />
                <span className="toggle-slider"></span>
              </label>
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
