import { useState, useEffect, useRef } from 'react'
import '../../styles/Menu.css'

export default function Menu({ onShowDocumentacao, onShowSobre, onShowCadastroMedicos, onShowCadastroEsp, onShowCadastroTipoAtendimento, onShowCadastroEmpresa, onShowCadastroUsuario, onShowCadastroPaciente, onShowConsultaAgenda, onShowExportarBanco}) {
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

  return (
    <div className="menu-topbar" ref={menuRef}>
      <div className="menu-logo">
        <img src={`${import.meta.env.BASE_URL}/img/logo32.png`} className="menu-logo-img" />
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
                <a onClick={() => onShowCadastroEmpresa(true)}>
                🏢 Cadastro Empresa
                </a>
              </li>
              <li>
                <a onClick={() => onShowCadastroUsuario(true)}>
                👤 Cadastro usuários
                </a>
              </li>
              <li>
                <a onClick={() => onShowExportarBanco(true)}>
                💾 Exportar Banco
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
                <a onClick={() => onShowConsultaAgenda(true)}>
                  📋 Consulta Agenda
                </a>
              </li>
              <li className="submenu-container">  
                <a onClick={handleCadastrosClick}>
                  🏥 Cadastros
                  <span className={`submenu-arrow ${openNestedSubmenu === 'cadastros' ? 'open' : ''}`}>▶</span>
                </a>
                <ul className={`submenu submenu-right ${openNestedSubmenu === 'cadastros' ? 'open' : ''}`}>
                  <li>
                    <a onClick={() => onShowCadastroMedicos(true)}>
                    🥼 Cadastro de Médicos
                    </a>
                  </li>
                  <li>
                     <a onClick={() => onShowCadastroEsp(true)}>
                       🏥 Cadastro de Especialidades
                     </a>
                  </li>
              <li>
                 <a onClick={() => onShowCadastroTipoAtendimento(true)}>
                   📋 Cadastro de Tipo de Atendimento
                 </a>
              </li>
              <li>
                <a onClick={() => onShowCadastroPaciente(true)}>
                  👤 Cadastro de Paciente
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
            <a onClick={() => onShowDocumentacao(true)}>📘 Documentação</a>
          </li>
        </ul>
      </nav>
    </div>
  )
}
