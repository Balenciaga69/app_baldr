import React, { type ReactNode } from 'react'

interface InfoAlertProps {
  title: string
  children: ReactNode
}

export const InfoAlert: React.FC<InfoAlertProps> = ({ title, children }) => {
  return (
    <div className='alert alert-info'>
      <strong>{title}</strong>
      <br />
      {children}
    </div>
  )
}
