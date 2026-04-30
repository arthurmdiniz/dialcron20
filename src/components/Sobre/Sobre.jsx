import './Sobre.css'

export default function Sobre({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          ✕ Fechar
        </button>
        
        <h2>Sobre o Projeto</h2>
        
        <div className="sobre-section">
          <h3>🛠️ Tecnologias e Dependências</h3>
          <div className="sobre-grid">
            <div className="sobre-bloco">
              <h4>📦 Frontend</h4>
              <ul className="sobre-lista">
                <li>React 18.2.0</li>
                <li>Vite 4.4.0</li>
                <li>React Calendar 6.0.1</li>
              </ul>
            </div>
            <div className="sobre-bloco">
              <h4>⚙️ Backend</h4>
              <ul className="sobre-lista">
                <li>Node.js, Express 4.18.2</li>
                <li>MySQL 3.9.0 (remoto E15)</li>
                <li>cors 2.8.5, nodemon 3.0.0</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="sobre-section">
          <h3>📋 Informações</h3>
          <div className="sobre-grid">
            <div className="sobre-bloco">
              <h4>📋 Projeto</h4>
              <ul className="sobre-lista">
                <li><strong>Nome:</strong> Dialcron 2.0</li>
                <li><strong>Versão:</strong> 0.0.1</li>
                <li><strong>Tipo:</strong> Web</li>
              </ul>
            </div>
            <div className="sobre-bloco">
              <h4>🤖 Inteligência Artificial</h4>
              <ul className="sobre-lista">
                <li><strong>IA Utilizada:</strong> OpenCode</li>
                <li><strong>Versão:</strong> 1.14.25</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}