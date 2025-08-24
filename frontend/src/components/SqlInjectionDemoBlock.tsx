/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import axios from 'axios'

const API_BASE = 'http://localhost:5159/api/SQLInjectionDemo'

export const SqlInjectionDemoBlock: React.FC = () => {
  const [userName, setUserName] = useState('')
  const [unsafeResult, setUnsafeResult] = useState<any>(null)
  const [safeResult, setSafeResult] = useState<any>(null)

  const handleUnsafe = async () => {
    try {
      const res = await axios.get(`${API_BASE}/unsafe`, { params: { userName } })
      setUnsafeResult(res.data)
    } catch {
      setUnsafeResult('error')
    }
  }

  const handleSafe = async () => {
    try {
      const res = await axios.get(`${API_BASE}/safe`, { params: { userName } })
      setSafeResult(res.data)
    } catch {
      setSafeResult('error')
    }
  }

  return (
    <div>
      <h3>SQL Injection Demo</h3>
      {/*提示語法: ' OR 1=1 -- */}
      <input value={userName} onChange={(e) => setUserName(e.target.value)} placeholder='UserName' />
      <button onClick={handleUnsafe}>查詢(不安全)</button>
      <button onClick={handleSafe}>查詢(安全)</button>
      <div>
        <div>
          不安全查詢結果: <pre>{JSON.stringify(unsafeResult, null, 2)}</pre>
        </div>
        <div>
          安全查詢結果: <pre>{JSON.stringify(safeResult, null, 2)}</pre>
        </div>
      </div>
    </div>
  )
}
