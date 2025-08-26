/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import axios from 'axios'
import { CollapsibleSection } from './CollapsibleSection'
import { LoadingOverlay } from './LoadingOverlay'
import { useLoading } from '../hooks/useLoading'

const API_BASE = 'http://localhost:5159/api/SQLInjectionDemo'

export const SqlInjectionDemoBlock: React.FC = () => {
  const [userName, setUserName] = useState('')
  const [unsafeResult, setUnsafeResult] = useState<any>(null)
  const [safeResult, setSafeResult] = useState<any>(null)
  const { loading, withLoading } = useLoading()

  const handleUnsafe = async () => {
    await withLoading(async () => {
      try {
        const res = await axios.get(`${API_BASE}/unsafe`, { params: { userName } })
        setUnsafeResult(res.data)
      } catch {
        setUnsafeResult('error')
      }
    })
  }

  const handleSafe = async () => {
    await withLoading(async () => {
      try {
        const res = await axios.get(`${API_BASE}/safe`, { params: { userName } })
        setSafeResult(res.data)
      } catch {
        setSafeResult('error')
      }
    })
  }

  return (
    <>
      <LoadingOverlay show={loading} message="查詢中..." />
      <CollapsibleSection title="SQL Injection Demo">
        <div className='mb-3'>
          <label htmlFor='userName' className='form-label'>
            UserName
          </label>
          <input
            id='userName'
            className='form-control'
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="可嘗試: ' OR 1=1 --"
          />
        </div>
        <div className='mb-3 d-flex gap-2'>
          <button className='btn btn-danger' onClick={handleUnsafe}>
            查詢(不安全)
          </button>
          <button className='btn btn-success' onClick={handleSafe}>
            查詢(安全)
          </button>
        </div>
        <div className='row'>
          <div className='col-md-6 mb-3'>
            <div className='card bg-dark text-light h-100'>
              <div className='card-header'>不安全查詢結果</div>
              <div className='card-body'>
                <pre className='mb-0' style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                  {JSON.stringify(unsafeResult, null, 2)}
                </pre>
              </div>
            </div>
          </div>
          <div className='col-md-6 mb-3'>
            <div className='card bg-success-subtle text-dark h-100'>
              <div className='card-header'>安全查詢結果</div>
              <div className='card-body'>
                <pre className='mb-0' style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                  {JSON.stringify(safeResult, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>
    </>
  )
}
