import React, { useState } from 'react'

interface CollapsibleSectionProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}

export const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({ 
  title, 
  children, 
  defaultOpen = false 
}) => {
  const [show, setShow] = useState(defaultOpen)

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="mb-0">{title}</h3>
        <button 
          className="btn btn-outline-secondary" 
          onClick={() => setShow(s => !s)}
        >
          {show ? '收合' : '展開'}
        </button>
      </div>
      <div className={`collapse${show ? ' show' : ''}`}>
        {children}
      </div>
    </div>
  )
}
