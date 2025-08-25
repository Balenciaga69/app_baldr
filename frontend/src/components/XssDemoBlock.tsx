import axios from 'axios'
import React, { useState } from 'react'

const API_BASE = 'http://localhost:5159/api/XSSDemo'

interface Comment {
  id: string
  content: string
  createdAt: string
}

export const XssDemoBlock: React.FC = () => {
  const [reflectInput, setReflectInput] = useState('')
  const [commentInput, setCommentInput] = useState('')
  const [comments, setComments] = useState<Comment[]>([])
  const [reflectResult, setReflectResult] = useState('')

  const loadComments = async () => {
    try {
      const res = await axios.get(`${API_BASE}/comments`)
      setComments(res.data)
    } catch (error) {
      setComments([])
    }
  }

  const handleUnsafeReflect = async () => {
    try {
      const res = await axios.get(`${API_BASE}/unsafe/reflect`, {
        params: { userInput: reflectInput },
      })
      setReflectResult(res.data)
    } catch (error) {
      setReflectResult('發生錯誤')
    }
  }

  const handleSafeReflect = async () => {
    try {
      const res = await axios.get(`${API_BASE}/safe/reflect`, {
        params: { userInput: reflectInput },
      })
      setReflectResult(res.data)
    } catch (error) {
      setReflectResult('發生錯誤')
    }
  }

  const handleUnsafeComment = async () => {
    try {
      await axios.post(`${API_BASE}/unsafe/comment`, {
        content: commentInput,
      })
      setCommentInput('')
      await loadComments()
    } catch (error) {}
  }

  const handleSafeComment = async () => {
    try {
      await axios.post(`${API_BASE}/safe/comment`, {
        content: commentInput,
      })
      setCommentInput('')
      await loadComments()
    } catch (error) {}
  }

  React.useEffect(() => {
    loadComments()
  }, [])

  return (
    <div className='container py-4'>
      <div className='mb-4'>
        <h3>XSS Demo</h3>
        <div className='alert alert-info'>
          <strong>XSS 基本概念：</strong><br />
          XSS 是一種代碼注入攻擊，攻擊者將惡意腳本注入到網頁中，當其他用戶瀏覽該網頁時，惡意腳本會在其瀏覽器中執行。<br />
          主要有三種類型：
          <ul className='mb-0'>
            <li><strong>Stored XSS (儲存型)</strong>：惡意腳本被永久儲存在目標伺服器上</li>
            <li><strong>Reflected XSS (反射型)</strong>：惡意腳本通過 URL 參數等方式反射回用戶</li>
            <li><strong>DOM-based XSS</strong>：通過修改 DOM 環境來執行惡意腳本</li>
          </ul>
        </div>
      </div>
      {/* Reflected XSS 示範 */}
      <div className='card mb-4'>
        <div className='card-header'>
          <h5 className='mb-0'>Reflected XSS 示範</h5>
        </div>
        <div className='card-body'>
          <div className='mb-3'>
            <label htmlFor='reflectInput' className='form-label'>
              輸入內容
            </label>
            <input
              id='reflectInput'
              className='form-control'
              value={reflectInput}
              onChange={(e) => setReflectInput(e.target.value)}
              placeholder="嘗試輸入: <script>alert('XSS')</script>"
            />
          </div>
          <div className='mb-3 d-flex gap-2'>
            <button className='btn btn-danger' onClick={handleUnsafeReflect}>
              不安全反射
            </button>
            <button className='btn btn-success' onClick={handleSafeReflect}>
              安全反射
            </button>
          </div>
          <div className='card'>
            <div className='card-header'>反射結果</div>
            <div className='card-body'>
              <div dangerouslySetInnerHTML={{ __html: reflectResult }} />
            </div>
          </div>
        </div>
      </div>
      {/* Stored XSS 示範 */}
      <div className='card mb-4'>
        <div className='card-header'>
          <h5 className='mb-0'>Stored XSS 示範</h5>
        </div>
        <div className='card-body'>
          <div className='mb-3'>
            <label htmlFor='commentInput' className='form-label'>
              新增評論
            </label>
            <textarea
              id='commentInput'
              className='form-control'
              rows={3}
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              placeholder="嘗試輸入: <img src=x onerror=alert('Stored XSS')>"
            />
          </div>
          <div className='mb-3 d-flex gap-2'>
            <button className='btn btn-danger' onClick={handleUnsafeComment}>
              不安全新增
            </button>
            <button className='btn btn-success' onClick={handleSafeComment}>
              安全新增
            </button>
          </div>
        </div>
      </div>
      {/* 評論列表 */}
      <div className='card'>
        <div className='card-header'>
          <h5 className='mb-0'>評論列表</h5>
        </div>
        <div className='card-body'>
          {comments.length === 0 ? (
            <p>暫無評論</p>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className='border-bottom pb-2 mb-2'>
                <div dangerouslySetInnerHTML={{ __html: comment.content }} />
                <small className='text-muted'>{new Date(comment.createdAt).toLocaleString()}</small>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
