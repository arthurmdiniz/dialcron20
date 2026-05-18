import React, { useState } from 'react'
import './styles/App.css'
import FundoInfinito from './FundoInfinito'
import Menu from './components/Menu/Menu'

import CadastroEspecialidade from './components/Atendimento/CadastroEspecialidade'
import CadastroMedicos from './components/Atendimento/CadastroMedicos'
import CadastroTipoAtendimento from './components/Atendimento/CadastroTipoAtendimento' 
import CadastroPaciente from './components/Atendimento/CadastroPaciente'
import ConsultaAgenda from './components/Atendimento/ConsultaAgenda'
import CadastroEmpresa from './components/Configuracao/CadastroEmpresa'
import CadastroUsuario from './components/Configuracao/CadastroUsuario'
import ExportarBanco from './components/Configuracao/ExportarBanco'
import Documentacao from './components/Documentacao20/Documentacao20'
import Sobre from './components/Sobre/Sobre'


function App() {
  const [showDocumentacao, setShowDocumentacao] = useState(false)
  const [showSobre, setShowSobre] = useState(false)
  const [showCadastroMedicos, setShowCadastroMedicos] = useState(false)
  const [showCadastroEsp, setShowCadastroEsp] = useState(false)
  const [showCadastroTipoAtendimento, setShowCadastroTipoAtendimento] = useState(false)
  const [showCadastroPaciente, setShowCadastroPaciente] = useState(false)
  const [showConsultaAgenda, setShowConsultaAgenda] = useState(false)
  const [showCadastroEmpresa, setShowCadastroEmpresa] = useState(false)
  const [showCadastroUsuario, setShowCadastroUsuario] = useState(false)
  const [showExportarBanco, setShowExportarBanco] = useState(false)
  return (
    <FundoInfinito>
      <Menu
        onShowDocumentacao={setShowDocumentacao}
        onShowSobre={setShowSobre}
        onShowCadastroMedicos={setShowCadastroMedicos}
        onShowCadastroEsp={setShowCadastroEsp}
        onShowCadastroTipoAtendimento={setShowCadastroTipoAtendimento}
        onShowCadastroPaciente={setShowCadastroPaciente}
        onShowConsultaAgenda={setShowConsultaAgenda}
        onShowCadastroEmpresa={setShowCadastroEmpresa}
        onShowCadastroUsuario={setShowCadastroUsuario}
        onShowExportarBanco={setShowExportarBanco}
      />
      {showDocumentacao && <Documentacao onClose={() => setShowDocumentacao(false)} />}
      {showSobre && <Sobre onClose={() => setShowSobre(false)} />}
      {showCadastroMedicos && <CadastroMedicos onClose={() => setShowCadastroMedicos(false)} />}
      {showCadastroEsp && <CadastroEspecialidade onClose={() => setShowCadastroEsp(false)} />}
      {showCadastroTipoAtendimento && <CadastroTipoAtendimento onClose={() => setShowCadastroTipoAtendimento(false)} />}
      {showCadastroPaciente && <CadastroPaciente onClose={() => setShowCadastroPaciente(false)} />}
      {showConsultaAgenda && <ConsultaAgenda onClose={() => setShowConsultaAgenda(false)} />}
      {showCadastroEmpresa && <CadastroEmpresa onClose={() => setShowCadastroEmpresa(false)} />}
      {showCadastroUsuario && <CadastroUsuario onClose={() => setShowCadastroUsuario(false)} />}
      {showExportarBanco && <ExportarBanco onClose={() => setShowExportarBanco(false)} />}
    </FundoInfinito>
  )
}

export default App