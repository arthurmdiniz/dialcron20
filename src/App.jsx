import React, { useState } from 'react'
import './App.css'
import FundoInfinito from './FundoInfinito'
import Menu from './components/Menu/Menu'
import Agendamento from './Agendamento'

import CadastroEspecialidade from './components/Atendimento/CadastroEspecialidade'
import CadastroMedicos from './components/Atendimento/CadastroMedicos'
import Documentacao from './components/Documentacao/Documentacao'
import Sobre from './components/Sobre/Sobre'


function App() {
  const [showDocumentacao, setShowDocumentacao] = useState(false)
  const [showSobre, setShowSobre] = useState(false)
  const [showCadastroMedicos, setShowCadastroMedicos] = useState(false)
  const [showCadastroEsp, setShowCadastroEsp] = useState(false)
  return (
    <FundoInfinito>
      <Menu
        onShowDocumentacao={setShowDocumentacao}
        onShowSobre={setShowSobre}
        onShowCadastroMedicos={setShowCadastroMedicos}
        onShowCadastroEsp={setShowCadastroEsp}
      />
      {showDocumentacao && <Documentacao onClose={() => setShowDocumentacao(false)} />}
      {showSobre && <Sobre onClose={() => setShowSobre(false)} />}
      {showCadastroMedicos && <CadastroMedicos onClose={() => setShowCadastroMedicos(false)} />}
      {showCadastroEsp && <CadastroEspecialidade onClose={() => setShowCadastroEsp(false)} />}
    </FundoInfinito>
  )
}

export default App