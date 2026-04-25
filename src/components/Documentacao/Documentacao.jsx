import { useState } from 'react'
import './Documentacao.css'

export default function Documentacao({ onClose }) {
  const [expandedSection, setExpandedSection] = useState(null)
  const [expandedCategory, setExpandedCategory] = useState('ambiente')

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  const toggleCategory = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category)
  }

  return (
    <>
      <button className="doc-close-btn" onClick={onClose}>✕ Fechar</button>
      <div className="documentacao-container">
        <h1>📚 Documentação do Projeto</h1>

        <div className="doc-category">
          <button className="doc-category-header" onClick={() => toggleCategory('ambiente')}>
            <span>🖥️ AMBIENTE</span>
            <span className={`doc-arrow ${expandedCategory === 'ambiente' ? 'open' : ''}`}>▼</span>
          </button>
          {expandedCategory === 'ambiente' && (
            <div className="doc-category-content">

              <div className="doc-section">
                <button className="doc-header" onClick={() => toggleSection('estruturaPastas')}>
                  <span>1.1 Estrutura de Pastas</span>
                  <span className={`doc-arrow ${expandedSection === 'estruturaPastas' ? 'open' : ''}`}>▼</span>
                </button>
                {expandedSection === 'estruturaPastas' && (
                  <div className="doc-content">
                    <pre>{`src/components/
├── Menu/              ← Menu principal (topbar)
├── Modal/             ← Componente reutilizável para popups
├── Documentacao/     ← Esta documentação
├── Configuracao/     ← Conteúdo do menu Configuração
├── Atendimento/       ← Conteúdo do menu Atendimento
└── Sobre/             ← Conteúdo do menu Sobre`}</pre>
                    <p><strong>Arquivos na raiz do src/ (NÃO mover):</strong></p>
                    <pre>{`src/
├── main.jsx           ← Entry point (NÃO mover)
├── index.css          ← Estilos globais
├── App.jsx            ← Componente principal
├── FundoInfinito.*    ← Background visual
└── Agendamento.*     ← Página de agendamento`}</pre>
                  </div>
                )}
              </div>

              <div className="doc-section">
                <button className="doc-header" onClick={() => toggleSection('comoRodar')}>
                  <span>1.2 Como Rodar o Projeto</span>
                  <span className={`doc-arrow ${expandedSection === 'comoRodar' ? 'open' : ''}`}>▼</span>
                </button>
                {expandedSection === 'comoRodar' && (
                  <div className="doc-content">
                    <p><strong>Instalar dependências:</strong></p>
                    <pre>{`npm install`}</pre>
                    <p><strong>Iniciar o servidor de desenvolvimento:</strong></p>
                    <pre>{`npm run dev`}</pre>
                    <p><strong>Build para produção:</strong></p>
                    <pre>{`npm run build`}</pre>
                    <p>O projeto estará disponível em <code>http://localhost:5173</code></p>
                  </div>
                )}
              </div>

              <div className="doc-section">
                <button className="doc-header" onClick={() => toggleSection('dependencias')}>
                  <span>1.3 Dependências</span>
                  <span className={`doc-arrow ${expandedSection === 'dependencias' ? 'open' : ''}`}>▼</span>
                </button>
                {expandedSection === 'dependencias' && (
                  <div className="doc-content">
                    <p><strong>Principais tecnologias:</strong></p>
                    <ul className="doc-list">
                      <li><code>React</code> - Biblioteca de interface</li>
                      <li><code>Vite</code> - Build tool</li>
                      <li><code>React DOM</code> - Renderização</li>
                    </ul>
                    <p className="doc-note">💡 Ver arquivo <code>package.json</code> para todas as dependências.</p>
                  </div>
                )}
              </div>

              <div className="doc-section">
                <button className="doc-header" onClick={() => toggleSection('nomenclatura')}>
                  <span>1.4 Convenções de Nomenclatura</span>
                  <span className={`doc-arrow ${expandedSection === 'nomenclatura' ? 'open' : ''}`}>▼</span>
                </button>
                {expandedSection === 'nomenclatura' && (
                  <div className="doc-content">
                    <table className="doc-table">
                      <thead>
                        <tr><th>Tipo</th><th>Padrão</th><th>Exemplo</th></tr>
                      </thead>
                      <tbody>
                        <tr><td>Componentes</td><td>PascalCase</td><td>Menu.jsx, Modal.jsx</td></tr>
                        <tr><td>Arquivos CSS</td><td>PascalCase</td><td>Menu.css, Modal.css</td></tr>
                        <tr><td>Pastas</td><td>PascalCase</td><td>Configuracao/, Atendimento/</td></tr>
                        <tr><td>Classes CSS</td><td>kebab-case</td><td>.menu-topbar, .modal-overlay</td></tr>
                        <tr><td>Estados</td><td>camelCase + descriptive</td><td>openSubmenu, showModal</td></tr>
                        <tr><td>Funções</td><td>camelCase + verbo</td><td>handleClick, toggleSubmenu</td></tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

            </div>
          )}
        </div>

        <div className="doc-category">
          <button className="doc-category-header" onClick={() => toggleCategory('estilizacao')}>
            <span>🎨 ESTILIZAÇÃO</span>
            <span className={`doc-arrow ${expandedCategory === 'estilizacao' ? 'open' : ''}`}>▼</span>
          </button>
          {expandedCategory === 'estilizacao' && (
            <div className="doc-category-content">

              <div className="doc-section">
                <button className="doc-header" onClick={() => toggleSection('paletaCores')}>
                  <span>2.1 Paleta de Cores</span>
                  <span className={`doc-arrow ${expandedSection === 'paletaCores' ? 'open' : ''}`}>▼</span>
                </button>
                {expandedSection === 'paletaCores' && (
                  <div className="doc-content">
                    <table className="doc-table">
                      <thead>
                        <tr><th>Cor</th><th>Hex</th><th>Uso</th></tr>
                      </thead>
                      <tbody>
                        <tr><td style={{background: '#277bbc', color: 'white'}}>████</td><td>#277bbc</td><td>Cor principal (azul escuro)</td></tr>
                        <tr><td style={{background: '#667eea', color: 'white'}}>████</td><td>#667eea</td><td>Cor secundária (roxo)</td></tr>
                        <tr><td style={{background: '#ffffff'}}>████</td><td>#ffffff</td><td>Fundo branco</td></tr>
                        <tr><td style={{background: '#e0e0e0'}}>████</td><td>#e0e0e0</td><td>Bordas</td></tr>
                        <tr><td style={{background: '#f5f5f5'}}>████</td><td>#f5f5f5</td><td>Background leve</td></tr>
                        <tr><td style={{background: '#333333', color: 'white'}}>████</td><td>#333333</td><td>Texto escuro</td></tr>
                        <tr><td style={{background: '#555555', color: 'white'}}>████</td><td>#555555</td><td>Texto secundário</td></tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              <div className="doc-section">
                <button className="doc-header" onClick={() => toggleSection('breakpoints')}>
                  <span>2.2 Breakpoints Responsivos</span>
                  <span className={`doc-arrow ${expandedSection === 'breakpoints' ? 'open' : ''}`}>▼</span>
                </button>
                {expandedSection === 'breakpoints' && (
                  <div className="doc-content">
                    <pre>{`/* Mobile (< 768px) */
@media (max-width: 768px) {
  .menu-topbar {
    height: 60px;
  }
}

/* Tablet (768px - 1024px) */
/* Desktop (> 1024px) */`}</pre>
                  </div>
                )}
              </div>

              <div className="doc-section">
                <button className="doc-header" onClick={() => toggleSection('comandosCss')}>
                  <span>2.3 Comandos CSS Úteis</span>
                  <span className={`doc-arrow ${expandedSection === 'comandosCss' ? 'open' : ''}`}>▼</span>
                </button>
                {expandedSection === 'comandosCss' && (
                  <div className="doc-content">
                    <table className="doc-table">
                      <thead>
                        <tr><th>Propriedade</th><th>Onde Achar</th><th>Descrição</th></tr>
                      </thead>
                      <tbody>
                        <tr><td>padding</td><td>.submenu a</td><td>Espaçamento interno do item</td></tr>
                        <tr><td>min-width</td><td>.submenu</td><td>Largura mínima do submenu</td></tr>
                        <tr><td>border</td><td>.menu-topbar</td><td>Borda inferior do menu</td></tr>
                        <tr><td>height</td><td>.menu-topbar</td><td>Altura do menu</td></tr>
                        <tr><td>background</td><td>.menu-topbar</td><td>Cor de fundo do menu</td></tr>
                        <tr><td>text-align</td><td>.submenu</td><td>Alinhamento do texto</td></tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              <div className="doc-section">
                <button className="doc-header" onClick={() => toggleSection('scrollPersonalizado')}>
                  <span>2.4 Scroll Personalizado</span>
                  <span className={`doc-arrow ${expandedSection === 'scrollPersonalizado' ? 'open' : ''}`}>▼</span>
                </button>
                {expandedSection === 'scrollPersonalizado' && (
                  <div className="doc-content">
                    <p>O scroll está configurado em <code>index.css</code> com as cores do projeto:</p>
                    <pre>{`::-webkit-scrollbar-track {
  background: #277bbc;  /* Azul escuro */
  border-radius: 10px;
  border: 2px solid white;
}

::-webkit-scrollbar-thumb {
  background: white;    /* Branco */
  border-radius: 10px;
  border: 2px solid #277bbc;
}`}</pre>
                  </div>
                )}
              </div>

            </div>
          )}
        </div>

        <div className="doc-category">
          <button className="doc-category-header" onClick={() => toggleCategory('criacao')}>
            <span>🛠️ CRIAÇÃO</span>
            <span className={`doc-arrow ${expandedCategory === 'criacao' ? 'open' : ''}`}>▼</span>
          </button>
          {expandedCategory === 'criacao' && (
            <div className="doc-category-content">

              <div className="doc-section">
                <button className="doc-header" onClick={() => toggleSection('novoMenu')}>
                  <span>3.1 Incluir Novo Menu</span>
                  <span className={`doc-arrow ${expandedSection === 'novoMenu' ? 'open' : ''}`}>▼</span>
                </button>
                {expandedSection === 'novoMenu' && (
                  <div className="doc-content">
                    <p>Adicione um novo <code>&lt;li&gt;</code> dentro do <code>&lt;ul&gt;</code> do menu nav:</p>
                    <pre>{`<li>
  <a href="#sua-seção">🆕 Seu Menu</a>
</li>`}</pre>
                    <p className="doc-note">💡 Simples assim! Sem estado necessário.</p>
                  </div>
                )}
              </div>

              <div className="doc-section">
                <button className="doc-header" onClick={() => toggleSection('submenuBaixo')}>
                  <span>3.2 Submenu que abre para BAIXO</span>
                  <span className={`doc-arrow ${expandedSection === 'submenuBaixo' ? 'open' : ''}`}>▼</span>
                </button>
                {expandedSection === 'submenuBaixo' && (
                  <div className="doc-content">
                    <pre>{`<li className="submenu-container">
  <a onClick={(e) => toggleSubmenu(e, 'nomedosubmenu')}>
    🆕 Seu Menu
    <span className={\`submenu-arrow \${openSubmenu === 'nomedosubmenu' ? 'open' : ''}\`}>▼</span>
  </a>
  <ul className={\`submenu \${openSubmenu === 'nomedosubmenu' ? 'open' : ''}\`}>
    <li>
      <a onClick={() => scrollToSection('sua-secao')}>📄 Opção 1</a>
    </li>
    <li>
      <a onClick={() => scrollToSection('sua-secao2')}>📄 Opção 2</a>
    </li>
  </ul>
</li>`}</pre>
                  </div>
                )}
              </div>

              <div className="doc-section">
                <button className="doc-header" onClick={() => toggleSection('submenuLateral')}>
                  <span>3.3 Submenu que abre para DIREITA</span>
                  <span className={`doc-arrow ${expandedSection === 'submenuLateral' ? 'open' : ''}`}>▼</span>
                </button>
                {expandedSection === 'submenuLateral' && (
                  <div className="doc-content">
                    <p><strong>CSS - Adicionar classe (Menu.css):</strong></p>
                    <pre>{`.submenu-right {
  top: 0;
  left: 100%;
}

.submenu-right .submenu-arrow {
  transform: rotate(0deg);
}`}</pre>
                    <p><strong>JSX - Estrutura:</strong></p>
                    <pre>{`// 1. Adicionar estado (se não existir)
const [openNestedSubmenu, setOpenNestedSubmenu] = useState(null)

// 2. Função para controlar
const handleSubmenuAninhado = (e, submenuName) => {
  e.stopPropagation()
  setOpenNestedSubmenu(openNestedSubmenu === submenuName ? null : submenuName)
}

// 3. Criar o item
<li className="submenu-container">
  <a onClick={handleSubmenuAninhado}>
    🆕 Menu Pai ▶
  </a>
  <ul className={\`submenu submenu-right \${openNestedSubmenu === 'submenuFilho' ? 'open' : ''}\`}>
    <li>
      <a onClick={() => scrollToSection('opcao')}>📄 Sub Opção</a>
    </li>
  </ul>
</li>`}</pre>
                  </div>
                )}
              </div>

              <div className="doc-section">
                <button className="doc-header" onClick={() => toggleSection('modal')}>
                  <span>3.4 Como criar um Modal (NomeModal.jsx)</span>
                  <span className={`doc-arrow ${expandedSection === 'modal' ? 'open' : ''}`}>▼</span>
                </button>
                {expandedSection === 'modal' && (
                  <div className="doc-content">
                    <p><strong>CSS - Estilos do Modal (Modal.css):</strong></p>
                    <pre>{`.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 600;
}

.modal-container {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  max-width: 90%;
  width: max-content;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  z-index: 700;
  position: relative;
}

.modal-close-btn {
  position: fixed;
  top: 1rem;
  right: 1rem;
  background: #277bbc;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  z-index: 800;
}

.modal-close-btn:hover {
  background: #1a5a8a;
}`}</pre>
                    <p><strong>JSX - Como criar um Modal (Sobre.jsx):</strong></p>
                    <pre>{`import './Sobre.css'

export default function Sobre({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          ✕ Fechar
        </button>
        
        {/* Seu conteúdo aqui */}
        <h2>Sobre</h2>
        <p>Descrição do projeto...</p>
      </div>
    </div>
  )
}`}</pre>
                    <p className="doc-note">💡 Estrutura: <code>modal-overlay</code> (fundo escuro) + <code>modal-container</code> (quadro branco) + <code>modal-close-btn</code> (botão fechar). O CSS já define o fundo branco.</p>
                    <p><strong>App.jsx - Ajustes necessários:</strong></p>
                    <pre>{`// App.jsx
import React, { useState } from 'react'
import Sobre from './components/Sobre/Sobre'

function App() {
  const [showSobre, setShowSobre] = useState(false)

  return (
    <FundoInfinito>
      <Menu onShowSobre={setShowSobre} />

      {showSobre && (
        <Sobre onClose={() => setShowSobre(false)} />
      )}
    </FundoInfinito>
  )
}`}</pre>
                    <p><strong>Menu.jsx - Ajustes necessários:</strong></p>
                    <pre>{`// Menu.jsx - Receber a props e usar no item do menu
export default function Menu({ onShowSobre }) {
  return (
    <nav className="menu-nav">
      <ul>
        <li>
          <a onClick={() => onShowSobre(true)}>ℹ️ Sobre</a>
        </li>
      </ul>
    </nav>
  )
}`}</pre>
                  </div>
                )}
              </div>

              <div className="doc-section">
                <button className="doc-header" onClick={() => toggleSection('resetarSubmenu')}>
                  <span>3.5 Resetar submenu ao trocar de menu</span>
                  <span className={`doc-arrow ${expandedSection === 'resetarSubmenu' ? 'open' : ''}`}>▼</span>
                </button>
                {expandedSection === 'resetarSubmenu' && (
                  <div className="doc-content">
                    <p>Na função <code>toggleSubmenu</code>, ao abrir um novo menu, resetar o submenu aninhado:</p>
                    <pre>{`const toggleSubmenu = (e, submenu) => {
  e.stopPropagation()
  if (openSubmenu === submenu) {
    setOpenSubmenu(null)
  } else {
    setOpenSubmenu(submenu)
    setOpenNestedSubmenu(null) // ← Adicionar esta linha
  }
}`}</pre>
                  </div>
                )}
              </div>

              <div className="doc-section">
                <button className="doc-header" onClick={() => toggleSection('modalVsPagina')}>
                  <span>3.6 Modal vs Página</span>
                  <span className={`doc-arrow ${expandedSection === 'modalVsPagina' ? 'open' : ''}`}>▼</span>
                </button>
                {expandedSection === 'modalVsPagina' && (
                  <div className="doc-content">
                    <p><strong>📋 Conceito:</strong></p>
                    <ul className="doc-list">
                      <li><strong>Modal:</strong> Abre POR CIMA da página atual (pop-up). Fundo escuro atrás. Para ações temporárias.</li>
                      <li><strong>Página:</strong> Substitui o conteúdo da tela. Ocupa o lugar da página atual. Para conteúdo completo.</li>
                    </ul>
                    
                    <p><strong>CSS - Estilos da Página (NomePagina.css):</strong></p>
                    <pre>{`.pagina-container {
  padding: 90px 2rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 100vh;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.pagina-container h1 {
  color: #277bbc;
  margin-bottom: 1.5rem;
  text-align: center;
}`}</pre>
                    
                    <p><strong>JSX - Como criar uma Página (Configuracao.jsx):</strong></p>
                    <pre>{`import './Configuracao.css'

export default function Configuracao({ onClose }) {
  return (
    <div className="pagina-container">
      <h1>⚙️ Configuração</h1>
      <p>Conteúdo da página...</p>
    </div>
  )
}`}</pre>
                    
                    <p><strong>App.jsx - Ajustes necessários:</strong></p>
                    <pre>{`// App.jsx
import React, { useState } from 'react'
import Configuracao from './components/Configuracao/Configuracao'

function App() {
  const [currentPage, setCurrentPage] = useState(null)

  return (
    <FundoInfinito>
      <Menu onNavigate={setCurrentPage} />

      {currentPage === 'configuracao' && (
        <Configuracao onClose={() => setCurrentPage(null)} />
      )}
    </FundoInfinito>
  )
}`}</pre>
                    
                    <p><strong>Menu.jsx - Ajustes necessários:</strong></p>
                    <pre>{`// Menu.jsx
export default function Menu({ onNavigate }) {
  return (
    <nav className="menu-nav">
      <ul>
        <li>
          <a onClick={() => onNavigate('configuracao')}>⚙️ Configuração</a>
        </li>
      </ul>
    </nav>
  )
}`}</pre>
                    
                    <p className="doc-note">💡 <strong>Resumo:</strong><br/>
                    • <code>modal-overlay</code> + <code>modal-container</code> = Modal (pop-up)<br/>
                    • <code>pagina-container</code> = Página (substitui conteúdo)</p>
                  </div>
                )}
              </div>

            </div>
          )}
        </div>

        <div className="doc-category">
          <button className="doc-category-header" onClick={() => toggleCategory('utilidades')}>
            <span>🔧 UTILIDADES</span>
            <span className={`doc-arrow ${expandedCategory === 'utilidades' ? 'open' : ''}`}>▼</span>
          </button>
          {expandedCategory === 'utilidades' && (
            <div className="doc-category-content">

              <div className="doc-section">
                <button className="doc-header" onClick={() => toggleSection('git')}>
                  <span>4.1 Git / Versionamento</span>
                  <span className={`doc-arrow ${expandedSection === 'git' ? 'open' : ''}`}>▼</span>
                </button>
                {expandedSection === 'git' && (
                  <div className="doc-content">
                    <p><strong>Branch principal:</strong> <code>main</code></p>
                    <p><strong>Fluxo de trabalho:</strong></p>
                    <pre>{`1. Crie uma branch para sua feature:
   git checkout -b feature/nome-da-feature

2. Faça suas alterações e commite:
   git add .
   git commit -m "feat: descrição do que foi feito"

3. Push para o remote:
   git push -u origin feature/nome-da-feature

4. Crie um Pull Request no GitHub

5. Após approval, faça merge`}</pre>
                    <p><strong>Tipos de commit:</strong></p>
                    <ul className="doc-list">
                      <li><code>feat:</code> - Nova funcionalidade</li>
                      <li><code>fix:</code> - Correção de bug</li>
                      <li><code>docs:</code> - Alteração na documentação</li>
                      <li><code>style:</code> - Alteração de estilo (CSS)</li>
                      <li><code>refactor:</code> - Refatoração de código</li>
                    </ul>
                  </div>
                )}
              </div>

              <div className="doc-section">
                <button className="doc-header" onClick={() => toggleSection('faq')}>
                  <span>4.2 FAQ / Erros Comuns</span>
                  <span className={`doc-arrow ${expandedSection === 'faq' ? 'open' : ''}`}>▼</span>
                </button>
                {expandedSection === 'faq' && (
                  <div className="doc-content">
                    <p><strong>Erro: "Module not found"</strong></p>
                    <p>Execute <code>npm install</code> para reinstallar dependências.</p>
                    <hr style={{margin: '1rem 0', borderColor: '#e0e0e0'}} />
                    <p><strong>Erro: "Port already in use"</strong></p>
                    <p>Outra aplicação está usando a porta 5173. Encerre ou use outra porta com <code>npm run dev -- --port 3000</code></p>
                    <hr style={{margin: '1rem 0', borderColor: '#e0e0e0'}} />
                    <p><strong>Menu não abre ao clicar</strong></p>
                    <p>Verifique se o componente está com <code>useState</code> e <code>toggleSubmenu</code> corretamente configurados.</p>
                    <hr style={{margin: '1rem 0', borderColor: '#e0e0e0'}} />
                    <p><strong>Submenu não aparece</strong></p>
                    <p>Verifique se o elemento pai tem <code>position: relative</code> no CSS.</p>
                  </div>
                )}
              </div>

              <div className="doc-section">
                <button className="doc-header" onClick={() => toggleSection('contato')}>
                  <span>4.3 Contato / Suporte</span>
                  <span className={`doc-arrow ${expandedSection === 'contato' ? 'open' : ''}`}>▼</span>
                </button>
                {expandedSection === 'contato' && (
                  <div className="doc-content">
                    <p>Para dúvidas sobre o projeto, entre em contato:</p>
                    <ul className="doc-list">
                      <li><strong>Desenvolvedor:</strong> Arthur / Dialcron</li>
                      <li><strong>Repositório:</strong> GitHub do projeto</li>
                    </ul>
                  </div>
                )}
              </div>

              <div className="doc-section">
                <button className="doc-header" onClick={() => toggleSection('emojis')}>
                  <span>4.4 Onde Buscar Emojis</span>
                  <span className={`doc-arrow ${expandedSection === 'emojis' ? 'open' : ''}`}>▼</span>
                </button>
                {expandedSection === 'emojis' && (
                  <div className="doc-content">
                    <p><strong>Opções para encontrar emojis:</strong></p>
                    <ul className="doc-list">
                      <li><strong>Emojipedia:</strong> <a href="https://emojipedia.org/" target="_blank" rel="noopener noreferrer">emojipedia.org</a> - Busca completa de todos os emojis</li>
                      <li><strong>Unicode Consortium:</strong> <a href="https://unicode.org/emoji/charts/full-emoji-list.html" target="_blank" rel="noopener noreferrer">unicode.org</a> - Lista oficial de emojis</li>
                      <li><strong>Teclado do Windows:</strong> Pressione <code>Win + .</code> (ponto) para abrir seletor de emojis</li>
                      <li><strong>macOS:</strong> Pressione <code>Ctrl + Command + Espaço</code></li>
                      <li><strong>Google:</strong> Pesquisar "emoji [descrição]" e copiar</li>
                    </ul>
                    <p className="doc-note">💡 No código JSX, use diretamente: <code>🏥 🛠️ 📅 👨‍⚕️ 🥼 ▶ ▼ ✕</code></p>
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