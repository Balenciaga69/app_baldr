import { useState } from 'react'

export const useLoading = () => {
  const [loading, setLoading] = useState(false)

  const withLoading = async <T,>(asyncFn: () => Promise<T>): Promise<T> => {
    setLoading(true)
    try {
      const result = await asyncFn()
      return result
    } finally {
      setLoading(false)
    }
  }

  return { loading, withLoading }
}
