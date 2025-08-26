import React, { useState } from 'react'

export const TopBar: React.FC = () => {
  const [dark, setDark] = useState<boolean>(true)

  React.useEffect(() => {
    document.body.setAttribute('data-bs-theme', dark ? 'dark' : 'light')
  }, [dark])

  return (
    <div className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <span className="navbar-brand">Security Demo</span>
        <button 
          className="btn btn-outline-secondary" 
          onClick={() => setDark(d => !d)}
        >
          {dark ? '☾ 暗黑' : '☀️ 明亮'}
        </button>
      </div>
    </div>
  )
}
