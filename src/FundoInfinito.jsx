import './styles/FundoInfinito.css'

export default function FundoInfinito({ children }) {
  // Gerar muitas estrelas para cobrir toda a página
  const gerarEstrelas = () => {
    const estrelas = []
    for (let i = 0; i < 200; i++) {
      estrelas.push(
        <div
          key={i}
          className="estrela-infinita"
          style={{
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            animationDelay: Math.random() * 2 + 's',
            opacity: Math.random() * 0.7 + 0.3,
            width: Math.random() * 2 + 1 + 'px',
            height: Math.random() * 2 + 1 + 'px',
          }}
        />
      )
    }
    return estrelas
  }

  return (
    <div className="fundo-infinito">
      <div className="estrelas-infinitas">{gerarEstrelas()}</div>
      <div className="content-infinito">{children}</div>
    </div>
  )
}
