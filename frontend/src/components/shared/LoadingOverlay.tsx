import React from 'react'

interface LoadingOverlayProps {
  show: boolean
  message?: string
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ show, message = '載入中...' }) => {
  if (!show) return null

  return (
    <div
      className='position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center'
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 9999,
      }}
    >
      <div className='text-center text-white'>
        <div className='spinner-border mb-3' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </div>
        <div>{message}</div>
      </div>
    </div>
  )
}
