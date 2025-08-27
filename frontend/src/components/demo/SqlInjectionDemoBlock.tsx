/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import React, { useState } from 'react'
import { useLoading } from '../../hooks/useLoading'
import { CollapsibleSection } from '../shared/CollapsibleSection'
import { InfoAlert } from '../shared/InfoAlert'
import { LoadingOverlay } from '../shared/LoadingOverlay'

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
      <LoadingOverlay show={loading} message='查詢中...' />
      <CollapsibleSection title='SQL Injection Demo'>
        <InfoAlert title='SQL Injection 基本概念：'>
          SQL Injection 是一種代碼注入攻擊，攻擊者通過在應用程式的輸入欄位插入惡意 SQL
          查詢語句，使其在資料庫中執行，繞過應用程式的安全措施。
          <br />
          主要有幾種常見類型：
          <ul className='mb-0'>
            <li>
              <strong>基本 SQL Injection</strong>：直接在輸入中插入 SQL 語句，修改查詢邏輯
            </li>
            <li>
              <strong>Union-based SQL Injection</strong>：使用 UNION 語法結合查詢，獲取更多資料
            </li>
            <li>
              <strong>Error-based SQL Injection</strong>：利用錯誤訊息中洩露的資訊來獲取資料
            </li>
            <li>
              <strong>Blind SQL Injection</strong>：即使看不到直接結果，也能通過其他方式驗證查詢是否成功
            </li>
            <li>
              <strong>Time-based SQL Injection</strong>：利用時間延遲來推斷查詢結果
            </li>
          </ul>
        </InfoAlert>
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
            <div className='card h-100'>
              <div className='card-header'>不安全查詢結果</div>
              <div className='card-body'>
                <pre className='mb-0' style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                  {JSON.stringify(unsafeResult, null, 2)}
                </pre>
              </div>
            </div>
          </div>
          <div className='col-md-6 mb-3'>
            <div className='card h-100'>
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
