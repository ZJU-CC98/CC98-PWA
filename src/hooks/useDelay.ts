import { useState, useEffect } from 'react'

/**
 * 返回一个boolean
 * 在指定的时间后其值为true
 * @returns {boolean} 是否超过了延迟时间
 * @param time 延迟时间
 */
export default function useDelay(time: number): boolean {
  const [isResolve, setIsResolve] = useState(time <= 0)

  useEffect(() => {
    if (time <= 0) return
    const timer = setTimeout(() => setIsResolve(true), time)

    return () => clearTimeout(timer)
  }, [])

  return isResolve
}
