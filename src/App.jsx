import React, { useState } from 'react'
import './App.css'
import FundoInfinito from './FundoInfinito'
import Menu from './components/Menu/Menu'
import Agendamento from './Agendamento'
import Documentacao from './components/Documentacao/Documentacao'
import Sobre from './components/Sobre/Sobre'

function App() {
  const [showDocumentacao, setShowDocumentacao] = useState(false)
  const [showSobre, setShowSobre] = useState(false)

  return (
    <FundoInfinito>
      <Menu
        onShowDocumentacao={setShowDocumentacao}
        onShowSobre={setShowSobre}
      />
      {showDocumentacao && <Documentacao onClose={() => setShowDocumentacao(false)} />}
      {showSobre && <Sobre onClose={() => setShowSobre(false)} />}
    </FundoInfinito>
  )
}

export default App