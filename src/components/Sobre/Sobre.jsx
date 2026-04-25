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
          <h3>🛠️ Tecnologias</h3>
          <ul className="sobre-lista">
            <li><strong>React:</strong> 18.2.0</li>
            <li><strong>React DOM:</strong> 18.2.0</li>
            <li><strong>React Calendar:</strong> 6.0.1</li>
            <li><strong>Vite:</strong> 4.4.0</li>
          </ul>
        </div>

        <div className="sobre-section">
          <h3>📦 DevDependencies</h3>
          <ul className="sobre-lista">
            <li><strong>@types/react:</strong> 18.2.0</li>
            <li><strong>@types/react-dom:</strong> 18.2.0</li>
            <li><strong>@vitejs/plugin-react:</strong> 4.0.0</li>
          </ul>
        </div>

        <div className="sobre-section">
          <h3>📋 Informações</h3>
          <ul className="sobre-lista">
            <li><strong>Nome:</strong> Dialcron 2.0</li>
            <li><strong>Versão:</strong> 0.0.1</li>
            <li><strong>Tipo:</strong> Web</li>
          </ul>
        </div>

        <div className="sobre-section">
          <h3>🤖 Inteligência Artificial</h3>
          <ul className="sobre-lista">
            <li><strong>IA Utilizada:</strong> OpenCode</li>
            <li><strong>Versão:</strong> 1.14.25</li>
          </ul>
        </div>
      </div>
    </div>
  )
}