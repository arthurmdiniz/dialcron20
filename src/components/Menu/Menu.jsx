import { useState, useEffect, useRef } from 'react'
import './Menu.css'

export default function Menu({ onShowDocumentacao, onShowSobre }) {
  const [isOpen, setIsOpen] = useState(false)
  const [openSubmenu, setOpenSubmenu] = useState(null)
  const [openNestedSubmenu, setOpenNestedSubmenu] = useState(null)
  const menuRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false)
        setOpenSubmenu(null)
        setOpenNestedSubmenu(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const toggleSubmenu = (e, submenu) => {
    e.stopPropagation()
    if (openSubmenu === submenu) {
      setOpenSubmenu(null)
    } else {
      setOpenSubmenu(submenu)
      setOpenNestedSubmenu(null)
    }
  }

  const handleCadastrosClick = (e) => {
    e.stopPropagation()
    setOpenNestedSubmenu(openNestedSubmenu === 'cadastros' ? null : 'cadastros')
  }

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setOpenSubmenu(null)
      setOpenNestedSubmenu(null)
    }
  }

  return (
    <div className="menu-topbar" ref={menuRef}>
      <div className="menu-logo">
        <img src="./img/logo32.png" alt="Logo" className="menu-logo-img" />
        <span>Dialcron</span>
      </div>

      
      <nav className="menu-nav">
        <ul>
          <li className="submenu-container">
            <a onClick={(e) => toggleSubmenu(e, 'configuracao')}>
              🛠️ Configuração
              <span className={`submenu-arrow ${openSubmenu === 'configuracao' ? 'open' : ''}`}>▼</span>
            </a>
            <ul className={`submenu ${openSubmenu === 'configuracao' ? 'open' : ''}`}>
              <li>
                <a onClick={() => scrollToSection('cadastro-empresa')}>
                🏢 Cadastro Empresa
                </a>
              </li>
              <li>
                <a onClick={() => scrollToSection('cadastro-usuarios')}>
                👤 Cadastro usuários
                </a>
              </li>
              
            </ul>
          </li>
          <li className="submenu-container">  
            <a onClick={(e) => toggleSubmenu(e, 'atendimento')}>
              🏥 Atendimento
              <span className={`submenu-arrow ${openSubmenu === 'atendimento' ? 'open' : ''}`}>▼</span>
            </a>
            <ul className={`submenu ${openSubmenu === 'atendimento' ? 'open' : ''}`}>
              <li>
                <a onClick={() => scrollToSection('atendimento')}>
                  📅 Agendar Consulta
                </a>
              </li>
              <li className="submenu-container">  
                <a onClick={handleCadastrosClick}>
                  🏥 Cadastros
                  <span className={`submenu-arrow ${openNestedSubmenu === 'cadastros' ? 'open' : ''}`}>▶</span>
                </a>
                <ul className={`submenu submenu-right ${openNestedSubmenu === 'cadastros' ? 'open' : ''}`}>
                  <li>
                    <a onClick={() => scrollToSection('atendimento-cadastro-medicos')}>
                    🥼 Cadastro de Médicos
                    </a>
                  </li>
                  <li>
                    <a onClick={() => scrollToSection('atendimento-cadastros-especialidades')}>
                      🏥 Cadastros de especialidades
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li>
            <a onClick={() => onShowSobre(true)}>ℹ️ Sobre</a>
          </li>
          <li>
            <a onClick={() => onShowDocumentacao(true)}>📚 Documentação</a>
          </li>
        </ul>
      </nav>
    </div>
  )
}
