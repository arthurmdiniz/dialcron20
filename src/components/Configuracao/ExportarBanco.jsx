import { useState } from 'react'

export default function ExportarBanco({ onClose }) {
  const [exportando, setExportando] = useState(false)
  const [erro, setErro] = useState(null)

  const handleExportar = async () => {
    setExportando(true)
    setErro(null)

    try {
      const res = await fetch('http://localhost:3001/api/exportar')

      if (!res.ok) {
        const texto = await res.text()
        throw new Error(texto || 'Erro ao exportar banco')
      }

      const blob = await res.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `dialcron_backup_${new Date().toISOString().split('T')[0]}.sql`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      setErro('Erro ao exportar: ' + error.message)
    } finally {
      setExportando(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()} style={{ width: '450px' }}>
        <button className="modal-close-btn" onClick={onClose}>✕ Fechar</button>

        <h2 style={{ color: '#277bbc', margin: '0 0 1rem' }}>Exportar Banco de Dados</h2>

        {erro && <div className="mensagem-erro" style={{ marginBottom: '1rem' }}>{erro}</div>}

        <p style={{ color: '#555', marginBottom: '1.5rem', lineHeight: '1.5' }}>
          Gera um arquivo SQL com toda a estrutura e dados do banco <strong>dialcron1</strong>
          para backup ou migração.
        </p>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
          <button className="btn-novo" onClick={onClose} style={{ background: '#999' }}>
            Cancelar
          </button>
          <button
            className="btn-salvar"
            onClick={handleExportar}
            disabled={exportando}
          >
            {exportando ? 'Exportando...' : 'Exportar'}
          </button>
        </div>

        {exportando && (
          <div style={{ marginTop: '1rem', textAlign: 'center', color: '#277bbc', fontWeight: 600 }}>
            Gerando arquivo SQL...
          </div>
        )}
      </div>
    </div>
  )
}
