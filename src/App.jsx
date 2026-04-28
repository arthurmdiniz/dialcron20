import React, { useState } from 'react'
import './App.css'
import FundoInfinito from './FundoInfinito'
import Menu from './components/Menu/Menu'
import Agendamento from './Agendamento'

import CadastroEspecialidade from './components/Atendimento/CadastroEspecialidade'
import CadastroMedicos from './components/Atendimento/CadastroMedicos'
import CadastroTipoAtendimento from './components/Atendimento/CadastroTipoAtendimento' 
import CadastroEmpresa from './components/Configuracao/CadastroEmpresa'
import Documentacao from './components/Documentacao/Documentacao'
import Sobre from './components/Sobre/Sobre'


function App() {
  const [showDocumentacao, setShowDocumentacao] = useState(false)
  const [showSobre, setShowSobre] = useState(false)
  const [showCadastroMedicos, setShowCadastroMedicos] = useState(false)
  const [showCadastroEsp, setShowCadastroEsp] = useState(false)
  const [showCadastroTipoAtendimento, setShowCadastroTipoAtendimento] = useState(false)
  const [showCadastroEmpresa, setShowCadastroEmpresa] = useState(false)
  return (
    <FundoInfinito>
      <Menu
        onShowDocumentacao={setShowDocumentacao}
        onShowSobre={setShowSobre}
        onShowCadastroMedicos={setShowCadastroMedicos}
        onShowCadastroEsp={setShowCadastroEsp}
        onShowCadastroTipoAtendimento={setShowCadastroTipoAtendimento}
        onShowCadastroEmpresa={setShowCadastroEmpresa}
      />
      {showDocumentacao && <Documentacao onClose={() => setShowDocumentacao(false)} />}
      {showSobre && <Sobre onClose={() => setShowSobre(false)} />}
      {showCadastroMedicos && <CadastroMedicos onClose={() => setShowCadastroMedicos(false)} />}
      {showCadastroEsp && <CadastroEspecialidade onClose={() => setShowCadastroEsp(false)} />}
      {showCadastroTipoAtendimento && <CadastroTipoAtendimento onClose={() => setShowCadastroTipoAtendimento(false)} />}
      {showCadastroEmpresa && <CadastroEmpresa onClose={() => setShowCadastroEmpresa(false)} />}
    </FundoInfinito>
  )
}

export default App