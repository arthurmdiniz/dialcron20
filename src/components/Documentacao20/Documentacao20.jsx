import { useState } from 'react'
import '../../styles/Documentacao20.css'

export default function Documentacao20({ onClose }) {
  const [expandedSection, setExpandedSection] = useState(null)
  const [expandedCategory, setExpandedCategory] = useState('arquitetura')

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  const toggleCategory = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category)
  }

  return (
    <>
      <button className="doc20-close-btn" onClick={onClose}>✕ Fechar</button>
      <div className="documentacao20-container">
        <h1>📘 Documentação 2.0 - Guia Completo</h1>
        <p className="doc20-subtitle">Guia passo a passo para criar qualquer funcionalidade no sistema, sem depender de IA.</p>

        {/* ==================== ARQUITETURA ==================== */}
        <div className="doc20-category">
          <button className="doc20-category-header" onClick={() => toggleCategory('arquitetura')}>
            <span>🏗️ ARQUITETURA DO PROJETO</span>
            <span className={`doc20-arrow ${expandedCategory === 'arquitetura' ? 'open' : ''}`}>▼</span>
          </button>
          {expandedCategory === 'arquitetura' && (
            <div className="doc20-category-content">

              <div className="doc20-section">
                <button className="doc20-header" onClick={() => toggleSection('visaoGeral')}>
                  <span>1.1 Visão Geral do Sistema</span>
                  <span className={`doc20-arrow ${expandedSection === 'visaoGeral' ? 'open' : ''}`}>▼</span>
                </button>
                {expandedSection === 'visaoGeral' && (
                  <div className="doc20-content">
                    <p>Este sistema é dividido em duas partes principais:</p>
                    <table className="doc20-table">
                      <thead>
                        <tr><th>Parte</th><th>Tecnologia</th><th>O que faz</th></tr>
                      </thead>
                      <tbody>
                        <tr><td>Frontend</td><td>React 18 + Vite</td><td>Interface do usuário (telas, menus, formulários)</td></tr>
                        <tr><td>Backend</td><td>Node.js + Express</td><td>API que conecta ao banco de dados MySQL</td></tr>
                      </tbody>
                    </table>
                    <p className="doc20-note">💡 O frontend faz requisições ao backend, que consulta o banco MySQL e retorna os dados.</p>
                  </div>
                )}
              </div>

              <div className="doc20-section">
                <button className="doc20-header" onClick={() => toggleSection('estruturaPastas2')}>
                  <span>1.2 Estrutura de Pastas</span>
                  <span className={`doc20-arrow ${expandedSection === 'estruturaPastas2' ? 'open' : ''}`}>▼</span>
                </button>
                {expandedSection === 'estruturaPastas2' && (
                  <div className="doc20-content">
                    <p><strong>Frontend (src/):</strong></p>
                    <pre>{`src/
├── main.jsx                    ← Ponto de entrada do React
├── App.jsx                     ← Componente principal (controle de telas)
├── FundoInfinito.jsx           ← Background animado
├── components/
│   ├── Menu/Menu.jsx           ← Barra de navegação principal
│   ├── Documentacao/           ← Documentação versão 1
│   ├── Documentacao20/         ← Documentação versão 2.0 (esta)
│   ├── Sobre/Sobre.jsx         ← Modal "Sobre"
│   ├── Atendimento/            ← Telas de atendimento
│   │   ├── CadastroMedicos.jsx
│   │   ├── CadastroPaciente.jsx
│   │   ├── CadastroEspecialidade.jsx
│   │   ├── CadastroTipoAtendimento.jsx
│   │   ├── ConsultaAgenda.jsx
│   │   └── NovoAgendamento.jsx
│   └── Configuracao/           ← Telas de configuração
│       ├── CadastroEmpresa.jsx
│       ├── CadastroUsuario.jsx
│       └── ExportarBanco.jsx
├── styles/                     ← Arquivos CSS
│   ├── index.css               ← Estilos globais
│   ├── App.css                 ← Keyframes e animações
│   ├── Menu.css                ← Estilo do menu
│   ├── telasCadastros.css      ← CSS unificado para telas de cadastro
│   └── ...
└── img/                        ← Imagens e ícones`}</pre>
                    <p><strong>Backend (server/):</strong></p>
                    <pre>{`server/
├── index.js                 ← Servidor Express (porta 3001)
├── db.js                    ← Conexão com MySQL
├── package.json             ← Dependências
└── routes/                  ← Rotas da API
    ├── medicos.js
    ├── especialidades.js
    ├── usuarios.js
    ├── tipo-atendimento.js
    ├── empresas.js
    ├── clientes.js
    ├── agenda.js
    ├── convenios.js
    └── exportar.js`}</pre>
                    <p className="doc20-note">💡 Cada tela de cadastro no frontend tem uma rota correspondente no backend.</p>
                  </div>
                )}
              </div>

              <div className="doc20-section">
                <button className="doc20-header" onClick={() => toggleSection('fluxoDados')}>
                  <span>1.3 Fluxo de Dados</span>
                  <span className={`doc20-arrow ${expandedSection === 'fluxoDados' ? 'open' : ''}`}>▼</span>
                </button>
                {expandedSection === 'fluxoDados' && (
                  <div className="doc20-content">
                    <p><strong>Como os dados fluem no sistema:</strong></p>
                    <pre>{`USUÁRIO
   │
   ▼
[Menu.jsx] → clica em um item
   │
   ▼
[App.jsx] → ativa state (ex: showCadastroMedicos = true)
   │
   ▼
[CadastroMedicos.jsx] → faz fetch() para API
   │
   ▼
[server/index.js] → Express roteia para a rota certa
   │
   ▼
[server/routes/medicos.js] → executa SQL no banco
   │
   ▼
[server/db.js] → MySQL (servidor E15)
   │
   ▼
Resposta volta: SQL → JSON → frontend → tela`}</pre>
                    <p className="doc20-note">💡 O frontend NUNCA acessa o banco diretamente. Tudo passa pela API.</p>
                  </div>
                )}
              </div>

            </div>
          )}
        </div>

        {/* ==================== PALETA DE CORES ==================== */}
        <div className="doc20-category">
          <button className="doc20-category-header" onClick={() => toggleCategory('paleta')}>
            <span>🎨 PALETA DE CORES E ESTILOS</span>
            <span className={`doc20-arrow ${expandedCategory === 'paleta' ? 'open' : ''}`}>▼</span>
          </button>
          {expandedCategory === 'paleta' && (
            <div className="doc20-category-content">

              <div className="doc20-section">
                <button className="doc20-header" onClick={() => toggleSection('coresPrincipais')}>
                  <span>2.1 Paleta de Cores</span>
                  <span className={`doc20-arrow ${expandedSection === 'coresPrincipais' ? 'open' : ''}`}>▼</span>
                </button>
                {expandedSection === 'coresPrincipais' && (
                  <div className="doc20-content">
                    <p><strong>Todas as cores usadas no sistema:</strong></p>
                    <table className="doc20-table">
                      <thead>
                        <tr><th>Exemplo</th><th>Cor</th><th>Hex</th><th>Onde usar</th></tr>
                      </thead>
                      <tbody>
                        <tr><td><span className="doc20-swatch" style={{background:'#277bbc'}}></span></td><td>Azul Principal</td><td><code>#277bbc</code></td><td>Menu, botões, headers, links</td></tr>
                        <tr><td><span className="doc20-swatch" style={{background:'#1a5a8a'}}></span></td><td>Azul Escuro</td><td><code>#1a5a8a</code></td><td>Hover de botões e headers</td></tr>
                        <tr><td><span className="doc20-swatch" style={{background:'#1e5f8a'}}></span></td><td>Azul Hover</td><td><code>#1e5f8a</code></td><td>Hover dos botões de ação</td></tr>
                        <tr><td><span className="doc20-swatch" style={{background:'#667eea'}}></span></td><td>Roxo Secundário</td><td><code>#667eea</code></td><td>Detalhes secundários</td></tr>
                        <tr><td><span className="doc20-swatch" style={{background:'#ffffff', border:'1px solid #ccc'}}></span></td><td>Branco</td><td><code>#ffffff</code></td><td>Fundo de containers, modais</td></tr>
                        <tr><td><span className="doc20-swatch" style={{background:'#f5f5f5'}}></span></td><td>Cinza Claro</td><td><code>#f5f5f5</code></td><td>Background de seções, headers de seção</td></tr>
                        <tr><td><span className="doc20-swatch" style={{background:'#f9f9f9'}}></span></td><td>Cinza Fundo</td><td><code>#f9f9f9</code></td><td>Fundo de wrappers (tabela, formulário)</td></tr>
                        <tr><td><span className="doc20-swatch" style={{background:'#e0e0e0'}}></span></td><td>Cinza Borda</td><td><code>#e0e0e0</code></td><td>Bordas de elementos, separadores</td></tr>
                        <tr><td><span className="doc20-swatch" style={{background:'#ddd'}}></span></td><td>Cinza Input</td><td><code>#ddd</code></td><td>Borda de inputs</td></tr>
                        <tr><td><span className="doc20-swatch" style={{background:'#333333', color:'white'}}></span></td><td>Texto Escuro</td><td><code>#333333</code></td><td>Texto principal</td></tr>
                        <tr><td><span className="doc20-swatch" style={{background:'#555', color:'white'}}></span></td><td>Texto Secundário</td><td><code>#555555</code></td><td>Texto de parágrafos</td></tr>
                        <tr><td><span className="doc20-swatch" style={{background:'#f44336', color:'white'}}></span></td><td>Vermelho</td><td><code>#f44336</code></td><td>Botão excluir, erros</td></tr>
                        <tr><td><span className="doc20-swatch" style={{background:'#d32f2f', color:'white'}}></span></td><td>Vermelho Escuro</td><td><code>#d32f2f</code></td><td>Hover do botão excluir</td></tr>
                        <tr><td><span className="doc20-swatch" style={{background:'#4caf50', color:'white'}}></span></td><td>Verde Sucesso</td><td><code>#4caf50</code></td><td>Mensagens de sucesso</td></tr>
                        <tr><td><span className="doc20-swatch" style={{background:'#e8f5e9'}}></span></td><td>Verde Fundo</td><td><code>#e8f5e9</code></td><td>Fundo de mensagem de sucesso</td></tr>
                        <tr><td><span className="doc20-swatch" style={{background:'#ffebee'}}></span></td><td>Vermelho Fundo</td><td><code>#ffebee</code></td><td>Fundo de mensagem de erro</td></tr>
                        <tr><td><span className="doc20-swatch" style={{background:'#e8f0fe'}}></span></td><td>Azul Claro</td><td><code>#e8f0fe</code></td><td>Hover de linha na tabela</td></tr>
                      </tbody>
                    </table>
                    <p className="doc20-note">💡 Copie e cole os hexadecimais diretamente no seu CSS. Use <code>#277bbc</code> para botões e <code>#f44336</code> para exclusão.</p>
                  </div>
                )}
              </div>

              <div className="doc20-section">
                <button className="doc20-header" onClick={() => toggleSection('classesCss')}>
                  <span>2.2 Classes CSS Prontas</span>
                  <span className={`doc20-arrow ${expandedSection === 'classesCss' ? 'open' : ''}`}>▼</span>
                </button>
                {expandedSection === 'classesCss' && (
                  <div className="doc20-content">
                    <p><strong>Classes do arquivo telasCadastros.css (já disponíveis):</strong></p>
                    <table className="doc20-table">
                      <thead>
                        <tr><th>Classe CSS</th><th>O que faz</th></tr>
                      </thead>
                      <tbody>
                        <tr><td><code>.cadmedico-container</code></td><td>Container principal da tela de cadastro (margem, fundo branco, flex)</td></tr>
                        <tr><td><code>.cadmedico-header</code></td><td>Cabeçalho com título e botão fechar (flex, space-between)</td></tr>
                        <tr><td><code>.header-right</code></td><td>Agrupa botões à direita do header</td></tr>
                        <tr><td><code>.btn-fechar</code></td><td>Botão X vermelho para fechar</td></tr>
                        <tr><td><code>.mensagem-erro</code></td><td>Mensagem de erro (fundo rosa)</td></tr>
                        <tr><td><code>.mensagem-sucesso</code></td><td>Mensagem de sucesso (fundo verde)</td></tr>
                        <tr><td><code>.cadastrosmedicos-content</code></td><td>Grid com duas colunas: tabela + formulário</td></tr>
                        <tr><td><code>.tabela-wrapper</code></td><td>Wrapper da tabela (com scroll)</td></tr>
                        <tr><td><code>.tabela-header</code></td><td>Cabeçalho da tabela com botão "Novo"</td></tr>
                        <tr><td><code>.btn-novo</code></td><td>Botão "Novo Cadastro" (azul)</td></tr>
                        <tr><td><code>.tabela</code></td><td>Container da tabela</td></tr>
                        <tr><td><code>.tabela-linha</code></td><td>Cada linha da tabela (grid)</td></tr>
                        <tr><td><code>.tabela-cabecalho</code></td><td>Linha de cabeçalho da tabela (sticky)</td></tr>
                        <tr><td><code>.tabela-celula</code></td><td>Cada célula na linha</td></tr>
                        <tr><td><code>.tabela-acoes</code></td><td>Container dos botões editar/excluir</td></tr>
                        <tr><td><code>.btn-editar</code></td><td>Botão editar (azul)</td></tr>
                        <tr><td><code>.btn-excluir</code></td><td>Botão excluir (vermelho)</td></tr>
                        <tr><td><code>.formulario-wrapper</code></td><td>Wrapper do formulário (com scroll)</td></tr>
                        <tr><td><code>.formulario</code></td><td>Tag form</td></tr>
                        <tr><td><code>.form-group</code></td><td>Cada grupo label + input</td></tr>
                        <tr><td><code>.form-row</code></td><td>Linha flex com vários campos lado a lado</td></tr>
                        <tr><td><code>.form-row-2</code></td><td>Grid de 2 colunas</td></tr>
                        <tr><td><code>.form-row-3</code></td><td>Grid de 3 colunas</td></tr>
                        <tr><td><code>.form-row-4</code></td><td>Grid de 4 colunas</td></tr>
                        <tr><td><code>.form-column</code></td><td>Linha com botões alinhados à direita</td></tr>
                        <tr><td><code>.btn-salvar</code></td><td>Botão salvar/cadastrar (azul)</td></tr>
                        <tr><td><code>.form-group-checkbox</code></td><td>Grupo para checkbox</td></tr>
                        <tr><td><code>.form-group-toggle</code></td><td>Grupo para toggle switch</td></tr>
                        <tr><td><code>.toggle-switch</code></td><td>Toggle switch estilizado</td></tr>
                        <tr><td><code>.toggle-slider</code></td><td>Slider do toggle</td></tr>
                        <tr><td><code>.radio-group</code></td><td>Grupo de radio buttons</td></tr>
                      </tbody>
                    </table>
                    <p className="doc20-note">💡 Você NÃO precisa criar CSS novo. Use essas classes nos seus componentes.</p>
                  </div>
                )}
              </div>

              <div className="doc20-section">
                <button className="doc20-header" onClick={() => toggleSection('responsivo')}>
                  <span>2.3 Responsividade (Mobile)</span>
                  <span className={`doc20-arrow ${expandedSection === 'responsivo' ? 'open' : ''}`}>▼</span>
                </button>
                {expandedSection === 'responsivo' && (
                  <div className="doc20-content">
                    <p>O sistema já tem suporte a mobile via media queries:</p>
                    <pre>{`/* Em telas menores que 768px (celular): */
@media (max-width: 768px) {
  .cadastrosmedicos-content {
    grid-template-columns: 1fr;    /* empilha tabela e form */
  }
  .tabela-linha {
    grid-template-columns: 1fr;    /* cada campo em sua linha */
  }
  .tabela-cabecalho {
    display: none;                 /* esconde cabeçalho da tabela */
  }
}`}</pre>
                    <p><strong>Regra de ouro:</strong></p>
                    <ul className="doc20-list">
                      <li>Use <code>flex</code> ou <code>grid</code> para layout</li>
                      <li>Nunca use <code>width</code> fixo em pixels (use %, flex, ou max-width)</li>
                      <li>Sempre teste em janela pequena (F12 + modo responsivo)</li>
                    </ul>
                  </div>
                )}
              </div>

            </div>
          )}
        </div>

        {/* ==================== CRIAR TELA DE CADASTRO ==================== */}
        <div className="doc20-category">
          <button className="doc20-category-header" onClick={() => toggleCategory('criarCadastro')}>
            <span>🖥️ COMO CRIAR UMA TELA DE CADASTRO</span>
            <span className={`doc20-arrow ${expandedCategory === 'criarCadastro' ? 'open' : ''}`}>▼</span>
          </button>
          {expandedCategory === 'criarCadastro' && (
            <div className="doc20-category-content">

              <div className="doc20-section">
                <button className="doc20-header" onClick={() => toggleSection('cadastroPassoPasso')}>
                  <span>3.1 Passo a Passo Completo</span>
                  <span className={`doc20-arrow ${expandedSection === 'cadastroPassoPasso' ? 'open' : ''}`}>▼</span>
                </button>
                {expandedSection === 'cadastroPassoPasso' && (
                  <div className="doc20-content">
                    <p><strong>🎯 Objetivo:</strong> Criar uma tela de cadastro completa com tabela, formulário, e CRUD (criar, ler, atualizar, desativar).</p>

                    <p><strong>📋 Estrutura de uma tela de cadastro:</strong></p>
                    <pre>{`┌──────────────────────────────────────────────┐
│  🏥 Cadastro de Exemplo         [✕]        │ ← header
├──────────────────────┬───────────────────────┤
│  ┌────────────────┐  │  ┌─────────────────┐  │
│  │  ID  │  Nome   │  │  │ Nome: [______] │  │
│  ├────────────────┤  │  │                │  │
│  │  1   │  Foo    │  │  │ [Novo] [Salvar]│  │
│  │  2   │  Bar    │  │  └─────────────────┘  │
│  │  3   │  Baz    │  │                       │
│  └────────────────┘  │                       │
└──────────────────────┴───────────────────────┘`}</pre>

                    <p><strong>Passo 1: Criar o componente JSX</strong></p>
                    <p>Crie em <code>src/components/Atendimento/CadastroExemplo.jsx</code> (ou na pasta adequada):</p>
                    <pre>{`import { useState, useEffect } from 'react'
import '../../styles/telasCadastros.css'

const API_URL = 'http://localhost:3001/api/exemplo'

export default function CadastroExemplo({ onClose }) {
  // Estados obrigatórios
  const [registros, setRegistros] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)
  const [sucesso, setSucesso] = useState('')

  // Estado do formulário (UM estado para cada campo do banco)
  const [formData, setFormData] = useState({ id: '', nome: '', ativo: 'S' })
  const [editando, setEditando] = useState(false)

  // Carregar dados ao abrir a tela
  useEffect(() => { carregarTodos() }, [])

  // ========== FUNÇÕES DA API ==========

  const carregarTodos = async () => {
    try {
      setCarregando(true)
      const res = await fetch(\`\${API_URL}/todos\`)
      if (!res.ok) throw new Error('Erro ao carregar')
      setRegistros(await res.json())
      setErro(null)
    } catch (error) {
      setErro('Erro ao conectar: ' + error.message)
    } finally {
      setCarregando(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleNovo = () => {
    setFormData({ id: '', nome: '', ativo: 'S' })
    setEditando(false)
  }

  const handleEditar = (registro) => {
    setFormData({
      id: registro.ID,
      nome: registro.NOME,
      ativo: registro.ATIVO || 'S'
    })
    setEditando(true)
  }

  const handleSalvar = async (e) => {
    e.preventDefault()
    try {
      setSucesso('')
      const method = editando ? 'PUT' : 'POST'
      const url = editando ? \`\${API_URL}/\${formData.id}\` : API_URL
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      if (!res.ok) throw new Error('Erro ao salvar')
      await carregarTodos()
      handleNovo()
      setSucesso('Registro salvo com sucesso!')
      setTimeout(() => setSucesso(''), 3000)
    } catch (error) {
      setErro('Erro ao salvar: ' + error.message)
    }
  }

  const handleExcluir = async (id) => {
    if (!window.confirm('Deseja realmente excluir?')) return
    try {
      const res = await fetch(\`\${API_URL}/\${id}\`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Erro ao excluir')
      await carregarTodos()
      if (formData.id === id.toString()) handleNovo()
    } catch (error) {
      setErro('Erro ao excluir: ' + error.message)
    }
  }

  // ========== RENDERIZAÇÃO ==========

  return (
    <div className="cadmedico-container">
      <div className="cadmedico-header">
        <h1>Cadastro de Exemplo</h1>
        <div className="header-right">
          {sucesso && <div className="mensagem-sucesso">{sucesso}</div>}
          <button className="btn-fechar" onClick={onClose}>✕</button>
        </div>
      </div>

      {erro && <div className="mensagem-erro">{erro}</div>}

      <div className="cadastrosmedicos-content">
        {/* ===== TABELA ===== */}
        <div className="tabela-wrapper">
          <div className="tabela-header">
            <h2>Registros</h2>
            <button className="btn-novo" onClick={handleNovo}>+ Novo</button>
          </div>
          <div className="tabela">
            <div className="tabela-linha tabela-cabecalho">
              <div className="tabela-celula">ID</div>
              <div className="tabela-celula">Nome</div>
              <div className="tabela-celula">Ações</div>
            </div>
            {carregando ? (
              <p>Carregando...</p>
            ) : (
              registros.map((reg) => (
                <div key={reg.ID} className="tabela-linha">
                  <div className="tabela-celula">{reg.ID}</div>
                  <div className="tabela-celula">{reg.NOME}</div>
                  <div className="tabela-acoes">
                    <button className="btn-editar" onClick={() => handleEditar(reg)}>Editar</button>
                    <button className="btn-excluir" onClick={() => handleExcluir(reg.ID)}>Excluir</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* ===== FORMULÁRIO ===== */}
        <div className="formulario-wrapper">
          <h2>{editando ? 'Editar' : 'Novo Cadastro'}</h2>
          <form className="formulario" onSubmit={handleSalvar}>
            <div className="form-group">
              <label>Nome:</label>
              <input type="text" name="nome" value={formData.nome} onChange={handleChange} required />
            </div>

            <div className="form-group form-group-toggle">
              <label>Ativo:</label>
              <label className="toggle-switch">
                <input type="checkbox" name="ativo"
                  checked={formData.ativo === 'S'}
                  onChange={(e) => setFormData({ ...formData, ativo: e.target.checked ? 'S' : 'N' })}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="form-column">
              <button type="button" className="btn-novo" onClick={handleNovo}>Limpar</button>
              <button type="submit" className="btn-salvar">
                {editando ? 'Atualizar' : 'Cadastrar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}`}</pre>
                    <p className="doc20-note">⚠️ <strong>IMPORTANTE:</strong> Copie este modelo completo e só mude: (1) nome do componente, (2) API_URL, (3) campos do formData, (4) colunas da tabela.</p>
                  </div>
                )}
              </div>

              <div className="doc20-section">
                <button className="doc20-header" onClick={() => toggleSection('cadastroGatilhos')}>
                  <span>3.2 Conectar ao Menu e App.jsx</span>
                  <span className={`doc20-arrow ${expandedSection === 'cadastroGatilhos' ? 'open' : ''}`}>▼</span>
                </button>
                {expandedSection === 'cadastroGatilhos' && (
                  <div className="doc20-content">
                    <p>Após criar o componente, você precisa conectá-lo ao sistema em 3 lugares:</p>
                    <p><strong>1. App.jsx - Adicionar import e state:</strong></p>
                    <pre>{`// Importar o componente
import CadastroExemplo from './components/Atendimento/CadastroExemplo'

function App() {
  // Adicionar state
  const [showCadastroExemplo, setShowCadastroExemplo] = useState(false)

  return (
    <FundoInfinito>
      <Menu
        // ... props existentes ...
        onShowCadastroExemplo={setShowCadastroExemplo}
      />

      {/* Renderizar condicionalmente */}
      {showCadastroExemplo && (
        <CadastroExemplo onClose={() => setShowCadastroExemplo(false)} />
      )}
    </FundoInfinito>
  )
}`}</pre>
                    <p><strong>2. Menu.jsx - Adicionar item no menu:</strong></p>
                    <pre>{`// 2.1. Receber a prop
export default function Menu({ ..., onShowCadastroExemplo }) {

  // 2.2. Adicionar item no menu
  <li>
    <a onClick={() => onShowCadastroExemplo(true)}>📋 Cadastro Exemplo</a>
  </li>`}</pre>
                    <p className="doc20-note">💡 Siga exatamente o padrão dos itens existentes no Menu.jsx.</p>
                  </div>
                )}
              </div>

              <div className="doc20-section">
                <button className="doc20-header" onClick={() => toggleSection('cadastroCampos')}>
                  <span>3.3 Tipos de Campos no Formulário</span>
                  <span className={`doc20-arrow ${expandedSection === 'cadastroCampos' ? 'open' : ''}`}>▼</span>
                </button>
                {expandedSection === 'cadastroCampos' && (
                  <div className="doc20-content">
                    <p><strong>Campo de texto simples:</strong></p>
                    <pre>{`<div className="form-group">
  <label>Nome:</label>
  <input type="text" name="nome" value={formData.nome} onChange={handleChange} required />
</div>`}</pre>

                    <p><strong>Campo numérico:</strong></p>
                    <pre>{`<div className="form-group">
  <label>CPF:</label>
  <input type="number" name="cpf" value={formData.cpf} onChange={handleChange} />
</div>`}</pre>

                    <p><strong>Campo select (dropdown):</strong></p>
                    <pre>{`<div className="form-group">
  <label>Estado:</label>
  <select name="uf" value={formData.uf} onChange={handleChange} required>
    <option value="">Selecione</option>
    <option value="SP">São Paulo</option>
    <option value="RJ">Rio de Janeiro</option>
  </select>
</div>`}</pre>

                    <p><strong>Toggle (ativo/inativo):</strong></p>
                    <pre>{`<div className="form-group form-group-toggle">
  <label>Ativo:</label>
  <label className="toggle-switch">
    <input type="checkbox" name="ativo"
      checked={formData.ativo === 'S'}
      onChange={(e) => setFormData({...formData, ativo: e.target.checked ? 'S' : 'N'})}
    />
    <span className="toggle-slider"></span>
  </label>
</div>`}</pre>

                    <p><strong>Campos lado a lado (mesma linha):</strong></p>
                    <pre>{`<div className="form-row">
  <div className="form-group" style={{flex: 1}}>
    <label>DDD:</label>
    <input type="number" name="ddd" value={formData.ddd} onChange={handleChange} />
  </div>
  <div className="form-group" style={{flex: 1}}>
    <label>Telefone:</label>
    <input type="number" name="telefone" value={formData.telefone} onChange={handleChange} />
  </div>
</div>`}</pre>

                    <p><strong>Grid de 2 colunas (form-row-2):</strong></p>
                    <pre>{`<div className="form-row-2">
  <div className="form-group">
    <label>Nome:</label>
    <input type="text" name="nome" value={formData.nome} onChange={handleChange} />
  </div>
  <div className="form-group">
    <label>Email:</label>
    <input type="text" name="email" value={formData.email} onChange={handleChange} />
  </div>
</div>`}</pre>

                    <p><strong>Radio buttons:</strong></p>
                    <pre>{`<div className="form-group">
  <label>Tipo:</label>
  <div className="radio-group">
    <label>
      <input type="radio" name="tipo" value="F"
        checked={formData.tipo === 'F'}
        onChange={handleChange}
      /> Físico
    </label>
    <label>
      <input type="radio" name="tipo" value="J"
        checked={formData.tipo === 'J'}
        onChange={handleChange}
      /> Jurídico
    </label>
  </div>
</div>`}</pre>
                    <p className="doc20-note">💡 Sempre mantenha o atributo <code>name</code> igual ao nome do campo no banco de dados.</p>
                  </div>
                )}
              </div>

              <div className="doc20-section">
                <button className="doc20-header" onClick={() => toggleSection('cadastroTabela')}>
                  <span>3.4 Personalizando a Tabela</span>
                  <span className={`doc20-arrow ${expandedSection === 'cadastroTabela' ? 'open' : ''}`}>▼</span>
                </button>
                {expandedSection === 'cadastroTabela' && (
                  <div className="doc20-content">
                    <p><strong>Mais colunas na tabela:</strong> Basta adicionar mais <code>.tabela-celula</code> no cabeçalho e nos dados.</p>
                    <pre>{`/* Cabeçalho com 4 colunas */
<div className="tabela-linha tabela-cabecalho">
  <div className="tabela-celula">ID</div>
  <div className="tabela-celula">Nome</div>
  <div className="tabela-celula">Email</div>
  <div className="tabela-celula">Ações</div>
</div>

/* Dados - mesma quantidade de colunas */
{registros.map((reg) => (
  <div key={reg.ID} className="tabela-linha">
    <div className="tabela-celula">{reg.ID}</div>
    <div className="tabela-celula">{reg.NOME}</div>
    <div className="tabela-celula">{reg.EMAIL}</div>
    <div className="tabela-acoes">
      <button className="btn-editar" onClick={() => handleEditar(reg)}>Editar</button>
      <button className="btn-excluir" onClick={() => handleExcluir(reg.ID)}>Excluir</button>
    </div>
  </div>
))}`}</pre>

                    <p><strong>Exibir dados formatados na tabela:</strong></p>
                    <pre>{`/* Formatar data */
<div className="tabela-celula">
  {new Date(reg.DATA_CADASTRO).toLocaleDateString('pt-BR')}
</div>

/* Mostrar cor baseada no valor */
<div className="tabela-celula" style={{
  color: reg.ATIVO === 'S' ? '#4caf50' : '#f44336',
  fontWeight: 'bold'
}}>
  {reg.ATIVO === 'S' ? 'Ativo' : 'Inativo'}
</div>

/* Mostrar status com cor de fundo */
<div className="tabela-celula">
  <span style={{
    background: reg.STATUS === 'OK' ? '#e8f5e9' : '#ffebee',
    color: reg.STATUS === 'OK' ? '#2e7d32' : '#c62828',
    padding: '2px 8px',
    borderRadius: '4px'
  }}>
    {reg.STATUS}
  </span>
</div>`}</pre>
                    <p className="doc20-note">💡 A classe <code>.tabela-linha</code> usa <code>grid-template-columns</code>. Se adicionar mais colunas, ajuste no CSS ou use <code>style</code> inline.</p>
                  </div>
                )}
              </div>

            </div>
          )}
        </div>

        {/* ==================== CRIAR MODAL ==================== */}
        <div className="doc20-category">
          <button className="doc20-category-header" onClick={() => toggleCategory('criarModal')}>
            <span>💬 COMO CRIAR UM MODAL (POP-UP)</span>
            <span className={`doc20-arrow ${expandedCategory === 'criarModal' ? 'open' : ''}`}>▼</span>
          </button>
          {expandedCategory === 'criarModal' && (
            <div className="doc20-category-content">

              <div className="doc20-section">
                <button className="doc20-header" onClick={() => toggleSection('modalEstrutura')}>
                  <span>4.1 Estrutura de um Modal</span>
                  <span className={`doc20-arrow ${expandedSection === 'modalEstrutura' ? 'open' : ''}`}>▼</span>
                </button>
                {expandedSection === 'modalEstrutura' && (
                  <div className="doc20-content">
                    <p><strong>🎯 Quando usar:</strong> Para informações rápidas, formulários pequenos, confirmações, "Sobre".</p>
                    <p><strong>📋 Estrutura:</strong></p>
                    <pre>{`┌─────────────────────────────────────┐
│  🌟 Meu Modal          [✕]       │ ← Botão fechar no canto
├─────────────────────────────────────┤
│                                     │
│  Conteúdo do modal aqui...          │
│                                     │
└─────────────────────────────────────┘
         (fundo escuro atrás)`}</pre>

                    <p><strong>Passo 1: Criar o componente</strong></p>
                    <p>Crie em <code>src/components/MeuModal/MeuModal.jsx</code>:</p>
                    <pre>{`import '../../styles/Modal.css'

export default function MeuModal({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          ✕ Fechar
        </button>

        {/* SEU CONTEÚDO AQUI */}
        <h2>Meu Modal</h2>
        <p>Conteúdo do modal...</p>
      </div>
    </div>
  )
}`}</pre>

                    <p><strong>Passo 2: Conectar no App.jsx:</strong></p>
                    <pre>{`import MeuModal from './components/MeuModal/MeuModal'

function App() {
  const [showMeuModal, setShowMeuModal] = useState(false)

  return (
    <>
      <Menu onShowMeuModal={setShowMeuModal} />
      {showMeuModal && <MeuModal onClose={() => setShowMeuModal(false)} />}
    </>
  )
}`}</pre>

                    <p><strong>Passo 3: Adicionar no Menu.jsx:</strong></p>
                    <pre>{`<li>
  <a onClick={() => onShowMeuModal(true)}>🌟 Meu Modal</a>
</li>`}</pre>

                    <p className="doc20-note">💡 O <code>modal-overlay</code> fecha o modal ao clicar fora. O <code>e.stopPropagation()</code> no container impede que o clique dentro do modal feche.</p>
                  </div>
                )}
              </div>

              <div className="doc20-section">
                <button className="doc20-header" onClick={() => toggleSection('modalUtilidades')}>
                  <span>4.2 Modais Úteis prontos para copiar</span>
                  <span className={`doc20-arrow ${expandedSection === 'modalUtilidades' ? 'open' : ''}`}>▼</span>
                </button>
                {expandedSection === 'modalUtilidades' && (
                  <div className="doc20-content">
                    <p><strong>Modal de confirmação:</strong></p>
                    <pre>{`export default function ConfirmModal({ onClose, onConfirm, mensagem }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <h3>Confirmação</h3>
        <p>{mensagem}</p>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button className="btn-salvar" onClick={onConfirm}>Sim</button>
          <button className="btn-excluir" onClick={onClose}>Não</button>
        </div>
      </div>
    </div>
  )
}`}</pre>

                    <p><strong>Modal com formulário:</strong></p>
                    <pre>{`export default function FormModal({ onClose }) {
  const [dados, setDados] = useState({ nome: '', email: '' })
  const handleChange = (e) => {
    const { name, value } = e.target
    setDados({ ...dados, [name]: value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Dados:', dados)
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>✕ Fechar</button>
        <h2>Formulário Rápido</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nome:</label>
            <input type="text" name="nome" value={dados.nome} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" name="email" value={dados.email} onChange={handleChange} required />
          </div>
          <div className="form-column">
            <button type="submit" className="btn-salvar">Enviar</button>
          </div>
        </form>
      </div>
    </div>
  )
}`}</pre>
                    <p className="doc20-note">💡 O CSS dos modais está em <code>src/styles/Modal.css</code>. As classes <code>.form-group</code> e <code>.btn-salvar</code> estão em <code>telasCadastros.css</code>.</p>
                  </div>
                )}
              </div>

            </div>
          )}
        </div>

        {/* ==================== CRIAR TELA DE USO ==================== */}
        <div className="doc20-category">
          <button className="doc20-category-header" onClick={() => toggleCategory('criarTelaUso')}>
            <span>📋 COMO CRIAR UMA TELA DE USO</span>
            <span className={`doc20-arrow ${expandedCategory === 'criarTelaUso' ? 'open' : ''}`}>▼</span>
          </button>
          {expandedCategory === 'criarTelaUso' && (
            <div className="doc20-category-content">

              <div className="doc20-section">
                <button className="doc20-header" onClick={() => toggleSection('usoDefinicao')}>
                  <span>5.1 O que é uma Tela de Uso</span>
                  <span className={`doc20-arrow ${expandedSection === 'usoDefinicao' ? 'open' : ''}`}>▼</span>
                </button>
                {expandedSection === 'usoDefinicao' && (
                  <div className="doc20-content">
                    <p><strong>🎯 Quando criar:</strong> Telas que não são cadastro (sem tabela+formulário), como:</p>
                    <ul className="doc20-list">
                      <li>Dashboard com gráficos e indicadores</li>
                      <li>Painel de consulta (ex: Consulta Agenda)</li>
                      <li>Tela de relatórios</li>
                      <li>Tela de configurações complexas</li>
                      <li>Página inicial do sistema</li>
                    </ul>
                    <p className="doc20-note">💡 Diferença: tela de cadastro = tabela + formulário. Tela de uso = layout livre.</p>
                  </div>
                )}
              </div>

              <div className="doc20-section">
                <button className="doc20-header" onClick={() => toggleSection('usoPassoPasso')}>
                  <span>5.2 Estrutura de uma Tela de Uso</span>
                  <span className={`doc20-arrow ${expandedSection === 'usoPassoPasso' ? 'open' : ''}`}>▼</span>
                </button>
                {expandedSection === 'usoPassoPasso' && (
                  <div className="doc20-content">
                    <p><strong>Passo 1: Criar o componente</strong></p>
                    <p>Crie em <code>src/components/Atendimento/MinhaTelaUso.jsx</code>:</p>
                    <pre>{`import { useState, useEffect } from 'react'
import '../../styles/MinhaTelaUso.css'

const API_URL = 'http://localhost:3001/api/exemplo'

export default function MinhaTelaUso({ onClose }) {
  const [dados, setDados] = useState([])
  const [carregando, setCarregando] = useState(true)

  useEffect(() => { carregarDados() }, [])

  const carregarDados = async () => {
    try {
      setCarregando(true)
      const res = await fetch(API_URL)
      setDados(await res.json())
    } catch (error) {
      console.error('Erro:', error)
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="pagina-container">
      <div className="pagina-header">
        <h1>📊 Minha Tela de Uso</h1>
        <button className="btn-fechar" onClick={onClose}>✕</button>
      </div>

      {carregando ? (
        <p>Carregando...</p>
      ) : (
        <div className="uso-content">
          {/* Seu layout personalizado aqui */}
          {dados.map(item => (
            <div key={item.ID} className="uso-card">
              <h3>{item.NOME}</h3>
              <p>{item.DESCRICAO}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}`}</pre>

                    <p><strong>Passo 2: Criar o CSS</strong></p>
                    <p>Crie em <code>src/styles/MinhaTelaUso.css</code>:</p>
                    <pre>{`.pagina-container {
  padding: 90px 2rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 100vh;
}

.pagina-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.pagina-header h1 {
  color: #277bbc;
  margin: 0;
}

.uso-content {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}

.uso-card {
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.uso-card h3 {
  color: #277bbc;
  margin-bottom: 0.5rem;
}`}</pre>

                    <p><strong>Passo 3: Conectar igual ao cadastro</strong></p>
                    <p>Em App.jsx e Menu.jsx, siga o mesmo padrão do passo 3.2.</p>
                    <p className="doc20-note">💡 Crie seu próprio CSS para telas de uso. Use <code>#277bbc</code> para títulos e <code>white</code> para fundo dos cards.</p>
                  </div>
                )}
              </div>

            </div>
          )}
        </div>

        {/* ==================== CRIAR API BACKEND ==================== */}
        <div className="doc20-category">
          <button className="doc20-category-header" onClick={() => toggleCategory('criarApi')}>
            <span>🔧 COMO CRIAR UMA API NO BACKEND</span>
            <span className={`doc20-arrow ${expandedCategory === 'criarApi' ? 'open' : ''}`}>▼</span>
          </button>
          {expandedCategory === 'criarApi' && (
            <div className="doc20-category-content">

              <div className="doc20-section">
                <button className="doc20-header" onClick={() => toggleSection('apiEstrutura')}>
                  <span>6.1 Estrutura de uma Rota</span>
                  <span className={`doc20-arrow ${expandedSection === 'apiEstrutura' ? 'open' : ''}`}>▼</span>
                </button>
                {expandedSection === 'apiEstrutura' && (
                  <div className="doc20-content">
                    <p><strong>🎯 Objetivo:</strong> Criar uma rota no backend que o frontend possa chamar via fetch().</p>
                    <p><strong>📋 Tipos de requisição (métodos HTTP):</strong></p>
                    <table className="doc20-table">
                      <thead>
                        <tr><th>Método</th><th>O que faz</th><th>Exemplo</th></tr>
                      </thead>
                      <tbody>
                        <tr><td><code>GET</code></td><td>Buscar/listar dados</td><td><code>fetch('/api/exemplo/todos')</code></td></tr>
                        <tr><td><code>POST</code></td><td>Criar novo registro</td><td><code>{`fetch('/api/exemplo', {method:'POST', body:...})`}</code></td></tr>
                        <tr><td><code>PUT</code></td><td>Atualizar registro</td><td><code>{`fetch('/api/exemplo/1', {method:'PUT', body:...})`}</code></td></tr>
                        <tr><td><code>DELETE</code></td><td>Remover registro</td><td><code>{`fetch('/api/exemplo/1', {method:'DELETE'})`}</code></td></tr>
                      </tbody>
                    </table>

                    <p><strong>Passo 1: Criar o arquivo de rota</strong></p>
                    <p>Crie em <code>server/routes/exemplo.js</code>:</p>
                    <pre>{`const express = require('express')
const router = express.Router()
const { query } = require('../db')

// GET /api/exemplo/todos - Listar todos
router.get('/todos', async (req, res) => {
  try {
    const results = await query('SELECT * FROM TB_EXEMPLO ORDER BY NOME')
    res.json(results)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// GET /api/exemplo/:id - Buscar por ID
router.get('/:id', async (req, res) => {
  try {
    const results = await query('SELECT * FROM TB_EXEMPLO WHERE ID = ?', [req.params.id])
    if (results.length === 0) {
      return res.status(404).json({ error: 'Registro não encontrado' })
    }
    res.json(results[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// POST /api/exemplo - Criar
router.post('/', async (req, res) => {
  try {
    const { nome } = req.body
    const sql = 'INSERT INTO TB_EXEMPLO (NOME) VALUES (?)'
    await query(sql, [nome])
    res.status(201).json({ message: 'Criado com sucesso' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// PUT /api/exemplo/:id - Atualizar
router.put('/:id', async (req, res) => {
  try {
    const { nome } = req.body
    const sql = 'UPDATE TB_EXEMPLO SET NOME = ? WHERE ID = ?'
    await query(sql, [nome, req.params.id])
    res.json({ message: 'Atualizado com sucesso' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// DELETE /api/exemplo/:id - Excluir (ou desativar)
router.delete('/:id', async (req, res) => {
  try {
    await query('DELETE FROM TB_EXEMPLO WHERE ID = ?', [req.params.id])
    res.json({ message: 'Excluído com sucesso' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router`}</pre>
                    <p className="doc20-note">⚠️ <strong>Importante:</strong> Todo <code>async</code> deve ter <code>try/catch</code>. Use <code>?</code> nos placeholders do SQL (nunca concatene strings).</p>
                  </div>
                )}
              </div>

              <div className="doc20-section">
                <button className="doc20-header" onClick={() => toggleSection('apiRegistrar')}>
                  <span>6.2 Registrar a Rota no Servidor</span>
                  <span className={`doc20-arrow ${expandedSection === 'apiRegistrar' ? 'open' : ''}`}>▼</span>
                </button>
                {expandedSection === 'apiRegistrar' && (
                  <div className="doc20-content">
                    <p>Edite o arquivo <code>server/index.js</code> para adicionar sua rota:</p>
                    <pre>{`// 1. Importar (no topo do arquivo)
const exemploRouter = require('./routes/exemplo')

// 2. Usar (depois dos outros app.use)
app.use('/api/exemplo', exemploRouter)`}</pre>
                    <p><strong>Exemplo de como fica o index.js completo:</strong></p>
                    <pre>{`const express = require('express')
const cors = require('cors')

// Importações das rotas
const medicosRouter = require('./routes/medicos')
const exemploRouter = require('./routes/exemplo')

const app = express()
app.use(cors())
app.use(express.json())

// Rotas
app.use('/api/medicos', medicosRouter)
app.use('/api/exemplo', exemploRouter)

app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001')
})`}</pre>
                    <p className="doc20-note">💡 Reinicie o servidor (<code>npm start</code> na pasta <code>server/</code>) após adicionar novas rotas.</p>
                  </div>
                )}
              </div>

              <div className="doc20-section">
                <button className="doc20-header" onClick={() => toggleSection('apiBoasPraticas')}>
                  <span>6.3 Boas Práticas na API</span>
                  <span className={`doc20-arrow ${expandedSection === 'apiBoasPraticas' ? 'open' : ''}`}>▼</span>
                </button>
                {expandedSection === 'apiBoasPraticas' && (
                  <div className="doc20-content">
                    <ul className="doc20-list">
                      <li><strong>Sempre use try/catch</strong> - Toda rota async deve capturar erros</li>
                      <li><strong>Retorne status codes corretos:</strong> 200 (ok), 201 (criado), 404 (não encontrado), 500 (erro)</li>
                      <li><strong>Use placeholders <code>?</code></strong> - Nunca concatene valores no SQL (proteção contra SQL injection)</li>
                      <li><strong>Mapeie colunas do banco</strong> - Se os nomes das colunas têm maiúsculas, retorne mapeado no frontend</li>
                      <li><strong>Valide os dados</strong> - Verifique se campos obrigatórios foram enviados</li>
                    </ul>
                    <p><strong>Exemplo de validação:</strong></p>
                    <pre>{`router.post('/', async (req, res) => {
  try {
    const { nome } = req.body
    if (!nome) {
      return res.status(400).json({ error: 'Campo nome é obrigatório' })
    }
    await query('INSERT INTO TB_EXEMPLO (NOME) VALUES (?)', [nome])
    res.status(201).json({ message: 'Criado!' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})`}</pre>
                    <p><strong>Exemplo de consulta com JOIN:</strong></p>
                    <pre>{`// Buscar médicos com suas especialidades
router.get('/com-especialidades', async (req, res) => {
  try {
    const sql = \`
      SELECT m.NRO_CRM, m.NOME, e.DES_ESPECIALIDADE
      FROM MED_MEDICO m
      LEFT JOIN MED_ESPECIAL_MEDICO me ON m.NRO_CRM = me.NRO_CRM
      LEFT JOIN ESP_ESPECIALIDADE e ON me.ID_ESPECIALIDADE = e.ID
      ORDER BY m.NOME
    \`
    const results = await query(sql)
    res.json(results)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})`}</pre>
                  </div>
                )}
              </div>

            </div>
          )}
        </div>

        {/* ==================== CONECTAR AO BANCO ==================== */}
        <div className="doc20-category">
          <button className="doc20-category-header" onClick={() => toggleCategory('conectarBanco')}>
            <span>🗄️ COMO CONECTAR AO BANCO DE DADOS</span>
            <span className={`doc20-arrow ${expandedCategory === 'conectarBanco' ? 'open' : ''}`}>▼</span>
          </button>
          {expandedCategory === 'conectarBanco' && (
            <div className="doc20-category-content">

              <div className="doc20-section">
                <button className="doc20-header" onClick={() => toggleSection('bancoConexao')}>
                  <span>7.1 Configuração da Conexão</span>
                  <span className={`doc20-arrow ${expandedSection === 'bancoConexao' ? 'open' : ''}`}>▼</span>
                </button>
                {expandedSection === 'bancoConexao' && (
                  <div className="doc20-content">
                    <p>Arquivo <code>server/db.js</code> - configuração da conexão com MySQL:</p>
                    <pre>{`const mysql = require('mysql2/promise')

const pool = mysql.createPool({
  host: 'e15',
  port: 3306,
  database: 'dialcron1',
  user: 'dialcron1',
  password: '0c?£8Na.leP8',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  multipleStatements: true,
})

async function query(sql, params = []) {
  try {
    const [results] = await pool.execute(sql, params)
    return results
  } catch (error) {
    console.error('Erro na consulta:', error.message)
    throw error
  }
}

module.exports = { query, pool }`}</pre>

                    <p><strong>Campos de configuração:</strong></p>
                    <table className="doc20-table">
                      <thead>
                        <tr><th>Campo</th><th>O que é</th></tr>
                      </thead>
                      <tbody>
                        <tr><td><code>host</code></td><td>Endereço do servidor MySQL (ex: e15, localhost, IP)</td></tr>
                        <tr><td><code>port</code></td><td>Porta do MySQL (padrão: 3306)</td></tr>
                        <tr><td><code>database</code></td><td>Nome do banco de dados</td></tr>
                        <tr><td><code>user</code></td><td>Usuário do banco</td></tr>
                        <tr><td><code>password</code></td><td>Senha do banco</td></tr>
                        <tr><td><code>connectionLimit</code></td><td>Número máximo de conexões simultâneas</td></tr>
                      </tbody>
                    </table>
                    <p className="doc20-note">⚠️ <strong>NUNCA</strong> compartilhe senhas do banco em repositórios públicos. Esta senha é apenas para ambiente local.</p>
                  </div>
                )}
              </div>

              <div className="doc20-section">
                <button className="doc20-header" onClick={() => toggleSection('bancoQueries')}>
                  <span>7.2 Comandos SQL Essenciais</span>
                  <span className={`doc20-arrow ${expandedSection === 'bancoQueries' ? 'open' : ''}`}>▼</span>
                </button>
                {expandedSection === 'bancoQueries' && (
                  <div className="doc20-content">
                    <p><strong>SELECT - Buscar dados:</strong></p>
                    <pre>{`// Buscar todos
const results = await query('SELECT * FROM TB_EXEMPLO')

// Buscar com filtro
const results = await query('SELECT * FROM TB_EXEMPLO WHERE ATIVO = ?', ['S'])

// Buscar um registro específico
const results = await query('SELECT * FROM TB_EXEMPLO WHERE ID = ?', [id])
const registro = results[0]  // pega o primeiro

// Buscar com JOIN
const sql = \`
  SELECT e.*, c.NOME as CATEGORIA_NOME
  FROM TB_EXEMPLO e
  LEFT JOIN TB_CATEGORIA c ON e.ID_CATEGORIA = c.ID
  WHERE e.ATIVO = ?
\`
const results = await query(sql, ['S'])`}</pre>

                    <p><strong>INSERT - Inserir dados:</strong></p>
                    <pre>{`await query(
  'INSERT INTO TB_EXEMPLO (NOME, EMAIL, ATIVO) VALUES (?, ?, ?)',
  ['João', 'joao@email.com', 'S']
)`}</pre>

                    <p><strong>UPDATE - Atualizar dados:</strong></p>
                    <pre>{`await query(
  'UPDATE TB_EXEMPLO SET NOME = ?, EMAIL = ? WHERE ID = ?',
  ['João Silva', 'joao@email.com', 1]
)`}</pre>

                    <p><strong>DELETE - Excluir dados:</strong></p>
                    <pre>{`await query('DELETE FROM TB_EXEMPLO WHERE ID = ?', [1])

// Ou desativar (recomendado):
await query('UPDATE TB_EXEMPLO SET ATIVO = ? WHERE ID = ?', ['N', 1])`}</pre>

                    <p><strong>Dicas importantes:</strong></p>
                    <ul className="doc20-list">
                      <li>Sempre use <code>?</code> como placeholder - nunca concatene valores</li>
                      <li>Sempre use <code>try/catch</code> nas rotas</li>
                      <li>Para saber a estrutura de uma tabela, use: <code>DESCRIBE TB_EXEMPLO</code></li>
                      <li>Os nomes das colunas no banco podem vir em MAIÚSCULAS - acesse com <code>reg.NOME</code></li>
                    </ul>
                  </div>
                )}
              </div>

              <div className="doc20-section">
                <button className="doc20-header" onClick={() => toggleSection('bancoTestar')}>
                  <span>7.3 Como Testar a Conexão</span>
                  <span className={`doc20-arrow ${expandedSection === 'bancoTestar' ? 'open' : ''}`}>▼</span>
                </button>
                {expandedSection === 'bancoTestar' && (
                  <div className="doc20-content">
                    <p><strong>1. Verificar se o servidor está rodando:</strong></p>
                    <pre>{`cd C:\Git\dialcron20\server
npm start`}</pre>
                    <p>Se aparecer <code>Servidor rodando na porta 3001</code>, está OK.</p>

                    <p><strong>2. Testar a API no navegador:</strong></p>
                    <p>Abra <a href="http://localhost:3001/api/health" target="_blank" rel="noopener noreferrer">http://localhost:3001/api/health</a></p>
                    <p>Deverá retornar: <code>{`{"status": "ok", "timestamp": "..."}`}</code></p>

                    <p><strong>3. Testar uma rota específica:</strong></p>
                    <p>Abra <a href="http://localhost:3001/api/medicos/todos" target="_blank" rel="noopener noreferrer">http://localhost:3001/api/medicos/todos</a></p>
                    <p>Deverá retornar um JSON com a lista de médicos.</p>

                    <p><strong>4. Erros comuns:</strong></p>
                    <table className="doc20-table">
                      <thead>
                        <tr><th>Erro</th><th>Problema</th><th>Solução</th></tr>
                      </thead>
                      <tbody>
                        <tr><td><code>ECONNREFUSED</code></td><td>Servidor MySQL não está acessível</td><td>Verifique se o servidor E15 está online</td></tr>
                        <tr><td><code>ETIMEDOUT</code></td><td>Conexão expirou</td><td>Verifique rede ou firewall</td></tr>
                        <tr><td><code>Access denied</code></td><td>Usuário/senha inválidos</td><td>Verifique credenciais no db.js</td></tr>
                        <tr><td><code>Unknown database</code></td><td>Banco não encontrado</td><td>Verifique nome do banco no db.js</td></tr>
                      </tbody>
                    </table>

                    <p><strong>5. Health Check automático:</strong></p>
                    <p>O backend tem uma rota <code>/api/health</code> configurada em <code>server/index.js</code> que retorna o status do servidor. Use-a para verificar se o backend está funcionando.</p>
                  </div>
                )}
              </div>

            </div>
          )}
        </div>

        {/* ==================== FLUXO COMPLETO ==================== */}
        <div className="doc20-category">
          <button className="doc20-category-header" onClick={() => toggleCategory('fluxoCompleto')}>
            <span>📦 FLUXO COMPLETO - EXEMPLO PRÁTICO</span>
            <span className={`doc20-arrow ${expandedCategory === 'fluxoCompleto' ? 'open' : ''}`}>▼</span>
          </button>
          {expandedCategory === 'fluxoCompleto' && (
            <div className="doc20-category-content">

              <div className="doc20-section">
                <button className="doc20-header" onClick={() => toggleSection('exemploCompleto')}>
                  <span>8.1 Criar Tela "Categorias" do Zero</span>
                  <span className={`doc20-arrow ${expandedSection === 'exemploCompleto' ? 'open' : ''}`}>▼</span>
                </button>
                {expandedSection === 'exemploCompleto' && (
                  <div className="doc20-content">
                    <p><strong>🎯 Vamos criar uma tela completa de cadastro de Categorias.</strong></p>

                    <p><strong>Passo 1: Criar a tabela no banco</strong></p>
                    <p>Primeiro, crie a tabela no MySQL (via workbench, phpMyAdmin, ou linha de comando):</p>
                    <pre>{`CREATE TABLE CAT_CATEGORIA (
  ID INT AUTO_INCREMENT PRIMARY KEY,
  NOME VARCHAR(100) NOT NULL,
  DESCRICAO VARCHAR(255),
  ATIVO CHAR(1) DEFAULT 'S',
  DATA_CADASTRO TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`}</pre>

                    <p><strong>Passo 2: Criar a rota no backend</strong></p>
                    <p>Arquivo: <code>server/routes/categorias.js</code>:</p>
                    <pre>{`const express = require('express')
const router = express.Router()
const { query } = require('../db')

router.get('/todos', async (req, res) => {
  try {
    const results = await query(
      'SELECT * FROM CAT_CATEGORIA WHERE ATIVO = ? ORDER BY NOME',
      ['S']
    )
    res.json(results)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const results = await query(
      'SELECT * FROM CAT_CATEGORIA WHERE ID = ?', [req.params.id]
    )
    if (results.length === 0) {
      return res.status(404).json({ error: 'Categoria não encontrada' })
    }
    res.json(results[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.post('/', async (req, res) => {
  try {
    const { nome, descricao } = req.body
    if (!nome) {
      return res.status(400).json({ error: 'Nome é obrigatório' })
    }
    await query(
      'INSERT INTO CAT_CATEGORIA (NOME, DESCRICAO) VALUES (?, ?)',
      [nome, descricao || null]
    )
    res.status(201).json({ message: 'Categoria cadastrada!' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const { nome, descricao, ativo } = req.body
    await query(
      'UPDATE CAT_CATEGORIA SET NOME=?, DESCRICAO=?, ATIVO=? WHERE ID=?',
      [nome, descricao || null, ativo || 'S', req.params.id]
    )
    res.json({ message: 'Categoria atualizada!' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    await query(
      'UPDATE CAT_CATEGORIA SET ATIVO = ? WHERE ID = ?',
      ['N', req.params.id]
    )
    res.json({ message: 'Categoria desativada!' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router`}</pre>

                    <p><strong>Passo 3: Registrar a rota no server/index.js</strong></p>
                    <pre>{`const categoriasRouter = require('./routes/categorias')
app.use('/api/categorias', categoriasRouter)`}</pre>

                    <p><strong>Passo 4: Criar o componente frontend</strong></p>
                    <p>Arquivo: <code>src/components/Atendimento/CadastroCategorias.jsx</code>:</p>
                    <pre>{`import { useState, useEffect } from 'react'
import '../../styles/telasCadastros.css'

const API_URL = 'http://localhost:3001/api/categorias'

export default function CadastroCategorias({ onClose }) {
  const [registros, setRegistros] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)
  const [sucesso, setSucesso] = useState('')
  const [formData, setFormData] = useState({ id: '', nome: '', descricao: '', ativo: 'S' })
  const [editando, setEditando] = useState(false)

  useEffect(() => { carregarTodos() }, [])

  const carregarTodos = async () => {
    try {
      setCarregando(true)
      const res = await fetch(\`\${API_URL}/todos\`)
      if (!res.ok) throw new Error('Erro ao carregar')
      setRegistros(await res.json())
      setErro(null)
    } catch (error) {
      setErro('Erro ao conectar: ' + error.message)
    } finally {
      setCarregando(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleNovo = () => {
    setFormData({ id: '', nome: '', descricao: '', ativo: 'S' })
    setEditando(false)
  }

  const handleEditar = (reg) => {
    setFormData({
      id: reg.ID.toString(),
      nome: reg.NOME || '',
      descricao: reg.DESCRICAO || '',
      ativo: reg.ATIVO || 'S'
    })
    setEditando(true)
  }

  const handleSalvar = async (e) => {
    e.preventDefault()
    try {
      setSucesso('')
      const method = editando ? 'PUT' : 'POST'
      const url = editando ? \`\${API_URL}/\${formData.id}\` : API_URL
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: formData.nome, descricao: formData.descricao, ativo: formData.ativo })
      })
      if (!res.ok) throw new Error('Erro ao salvar')
      await carregarTodos()
      handleNovo()
      setSucesso('Categoria salva com sucesso!')
      setTimeout(() => setSucesso(''), 3000)
    } catch (error) {
      setErro('Erro ao salvar: ' + error.message)
    }
  }

  const handleExcluir = async (id) => {
    if (!window.confirm('Deseja realmente desativar esta categoria?')) return
    try {
      const res = await fetch(\`\${API_URL}/\${id}\`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Erro ao desativar')
      await carregarTodos()
      if (formData.id === id.toString()) handleNovo()
    } catch (error) {
      setErro('Erro ao desativar: ' + error.message)
    }
  }

  return (
    <div className="cadmedico-container">
      <div className="cadmedico-header">
        <h1>📂 Cadastro de Categorias</h1>
        <div className="header-right">
          {sucesso && <div className="mensagem-sucesso">{sucesso}</div>}
          <button className="btn-fechar" onClick={onClose}>✕</button>
        </div>
      </div>

      {erro && <div className="mensagem-erro">{erro}</div>}

      <div className="cadastrosmedicos-content">
        <div className="tabela-wrapper">
          <div className="tabela-header">
            <h2>Categorias</h2>
            <button className="btn-novo" onClick={handleNovo}>+ Nova</button>
          </div>
          <div className="tabela">
            <div className="tabela-linha tabela-cabecalho">
              <div className="tabela-celula">ID</div>
              <div className="tabela-celula">Nome</div>
              <div className="tabela-celula">Descrição</div>
              <div className="tabela-celula">Ações</div>
            </div>
            {carregando ? (
              <p>Carregando...</p>
            ) : (
              registros.map((reg) => (
                <div key={reg.ID} className="tabela-linha">
                  <div className="tabela-celula">{reg.ID}</div>
                  <div className="tabela-celula">{reg.NOME}</div>
                  <div className="tabela-celula">{reg.DESCRICAO || '-'}</div>
                  <div className="tabela-acoes">
                    <button className="btn-editar" onClick={() => handleEditar(reg)}>Editar</button>
                    <button className="btn-excluir" onClick={() => handleExcluir(reg.ID)}>Desativar</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="formulario-wrapper">
          <h2>{editando ? 'Editar Categoria' : 'Nova Categoria'}</h2>
          <form className="formulario" onSubmit={handleSalvar}>
            <div className="form-group">
              <label>Nome:</label>
              <input type="text" name="nome" value={formData.nome} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Descrição:</label>
              <input type="text" name="descricao" value={formData.descricao} onChange={handleChange} />
            </div>
            <div className="form-group form-group-toggle">
              <label>Ativo:</label>
              <label className="toggle-switch">
                <input type="checkbox" name="ativo"
                  checked={formData.ativo === 'S'}
                  onChange={(e) => setFormData({ ...formData, ativo: e.target.checked ? 'S' : 'N' })}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
            <div className="form-column">
              <button type="button" className="btn-novo" onClick={handleNovo}>Limpar</button>
              <button type="submit" className="btn-salvar">
                {editando ? 'Atualizar' : 'Cadastrar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}`}</pre>

                    <p><strong>Passo 5: Conectar no App.jsx e Menu.jsx</strong></p>
                    <p>Siga o passo 3.2 "Conectar ao Menu e App.jsx" para adicionar o componente ao sistema.</p>

                    <p className="doc20-note">✅ <strong>Pronto!</strong> Agora é só seguir esse mesmo padrão para criar qualquer nova tela de cadastro.</p>
                  </div>
                )}
              </div>

              <div className="doc20-section">
                <button className="doc20-header" onClick={() => toggleSection('checklistCriacao')}>
                  <span>8.2 Checklist para Criar Qualquer Funcionalidade</span>
                  <span className={`doc20-arrow ${expandedSection === 'checklistCriacao' ? 'open' : ''}`}>▼</span>
                </button>
                {expandedSection === 'checklistCriacao' && (
                  <div className="doc20-content">
                    <p><strong>Siga esta checklist na ordem:</strong></p>
                    <ol className="doc20-list doc20-list-numbered">
                      <li><strong>Criar tabela no banco</strong> - MySQL Workbench ou phpMyAdmin</li>
                      <li><strong>Criar rota no backend</strong> - <code>server/routes/seudados.js</code></li>
                      <li><strong>Registrar rota no servidor</strong> - <code>server/index.js</code></li>
                      <li><strong>Criar componente React</strong> - <code>src/components/Pasta/MeuComponente.jsx</code></li>
                      <li><strong>Criar CSS</strong> (se necessário) - <code>src/styles/MeuComponente.css</code></li>
                      <li><strong>Importar no App.jsx</strong> - Adicionar import e state</li>
                      <li><strong>Adicionar no Menu.jsx</strong> - Adicionar prop e item no menu</li>
                      <li><strong>Testar</strong> - Verificar se frontend e backend estão rodando</li>
                    </ol>

                    <p><strong>Mapa de decisão:</strong></p>
                    <pre>{`Qual tela criar?
│
├─ Tabela + Formulário? → TELA DE CADASTRO
│   Use: telasCadastros.css (classes prontas)
│   Copie: modelo da seção 3.1
│
├─ Informação rápida? → MODAL
│   Use: Modal.css (classes prontas)
│   Copie: modelo da seção 4.1
│
├─ Layout personalizado? → TELA DE USO
│   Crie: seu próprio CSS
│   Copie: modelo da seção 5.2
│
└─ API apenas? → ROTA BACKEND
    Crie: server/routes/xxx.js
    Registre: server/index.js`}</pre>
                  </div>
                )}
              </div>

            </div>
          )}
        </div>

        {/* ==================== DICAS E ERROS ==================== */}
        <div className="doc20-category">
          <button className="doc20-category-header" onClick={() => toggleCategory('dicas')}>
            <span>⚠️ DICAS, ERROS COMUNS E TRUQUES</span>
            <span className={`doc20-arrow ${expandedCategory === 'dicas' ? 'open' : ''}`}>▼</span>
          </button>
          {expandedCategory === 'dicas' && (
            <div className="doc20-category-content">

              <div className="doc20-section">
                <button className="doc20-header" onClick={() => toggleSection('errosComuns')}>
                  <span>9.1 Erros Comuns e Soluções</span>
                  <span className={`doc20-arrow ${expandedSection === 'errosComuns' ? 'open' : ''}`}>▼</span>
                </button>
                {expandedSection === 'errosComuns' && (
                  <div className="doc20-content">
                    <table className="doc20-table">
                      <thead>
                        <tr><th>Erro</th><th>Causa</th><th>Solução</th></tr>
                      </thead>
                      <tbody>
                        <tr><td><code>Module not found</code></td><td>Dependência não instalada</td><td>Rode <code>npm install</code></td></tr>
                        <tr><td><code>Port already in use</code></td><td>Porta 5173 ou 3001 ocupada</td><td>Feche o processo ou use outra porta</td></tr>
                        <tr><td><code>Network Error</code></td><td>Backend não está rodando</td><td>Rode <code>npm start</code> na pasta server/</td></tr>
                        <tr><td><code>CORS error</code></td><td>Backend sem permissão</td><td>Verifique se <code>app.use(cors())</code> está no server/index.js</td></tr>
                        <tr><td><code>Cannot read property 'map' of undefined</code></td><td>registros é undefined</td><td>Inicialize com <code>useState([])</code> em vez de <code>useState()</code></td></tr>
                        <tr><td><code>JSON Parse error</code></td><td>Resposta da API não é JSON</td><td>Verifique se a rota retorna <code>res.json()</code></td></tr>
                        <tr><td>Submenu não abre</td><td>CSS ou estado incorreto</td><td>Verifique <code>.submenu</code> com <code>position: relative</code> no pai</td></tr>
                        <tr><td>Modal não fecha ao clicar fora</td><td>Falta onClick no overlay</td><td>Adicione <code>onClick={onClose}</code> na div <code>modal-overlay</code></td></tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              <div className="doc20-section">
                <button className="doc20-header" onClick={() => toggleSection('atalhos')}>
                  <span>9.2 Atalhos e Truques</span>
                  <span className={`doc20-arrow ${expandedSection === 'atalhos' ? 'open' : ''}`}>▼</span>
                </button>
                {expandedSection === 'atalhos' && (
                  <div className="doc20-content">
                    <ul className="doc20-list">
                      <li><strong>Atalho para criar estado e setState:</strong> Use o snippet <code>useState</code> no VS Code</li>
                      <li><strong>Copiar tela existente:</strong> A maneira mais rápida de criar uma tela nova é copiar uma existente (ex: CadastroEspecialidade.jsx) e renomear</li>
                      <li><strong>Testar API sem frontend:</strong> Use o navegador para GET ou extensão como Postman/Thunder Client</li>
                      <li><strong>Ver erros no frontend:</strong> Abra o console do navegador (F12 &gt; Console)</li>
                      <li><strong>Ver erros no backend:</strong> Olhe o terminal onde o <code>npm start</code> está rodando</li>
                      <li><strong>Emojis no código:</strong> Pressione <code>Win + .</code> (Windows) ou <code>Ctrl + Cmd + Espaço</code> (Mac)</li>
                      <li><strong>Forçar recarregamento:</strong> No navegador: <code>Ctrl + Shift + R</code> (limpa cache)</li>
                    </ul>
                  </div>
                )}
              </div>

              <div className="doc20-section">
                <button className="doc20-header" onClick={() => toggleSection('comandosUteis')}>
                  <span>9.3 Comandos Úteis</span>
                  <span className={`doc20-arrow ${expandedSection === 'comandosUteis' ? 'open' : ''}`}>▼</span>
                </button>
                {expandedSection === 'comandosUteis' && (
                  <div className="doc20-content">
                    <table className="doc20-table">
                      <thead>
                        <tr><th>Comando</th><th>O que faz</th></tr>
                      </thead>
                      <tbody>
                        <tr><td><code>npm run dev</code></td><td>Inicia o frontend (porta 5173)</td></tr>
                        <tr><td><code>cd server && npm start</code></td><td>Inicia o backend (porta 3001)</td></tr>
                        <tr><td><code>npm run build</code></td><td>Gera build de produção</td></tr>
                        <tr><td><code>git status</code></td><td>Mostra arquivos modificados</td></tr>
                        <tr><td><code>git add . && git commit -m "mensagem"</code></td><td>Commata as alterações</td></tr>
                        <tr><td><code>git push</code></td><td>Envia para o GitHub</td></tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

            </div>
          )}
        </div>

      </div>
    </>
  )
}