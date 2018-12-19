/* tslint:disable */
import { useState, useEffect } from 'react'
import { Try } from '@/utils/fp/Try'
import { FetchError } from '@/utils/fetch'

export type Service<T> = () => Promise<Try<T, FetchError>>

interface FetchOption<T> {
  /**
   * Try fail callback
   */
  fail?: (err: FetchError) => void
  /**
   * Try success callback
   */
  success?: (data: T) => void
}

/**
 * 初始化网络请求数据
 * @param service 获取数据的服务
 * @param options 成功/失败时的追加回调
 */
export default function useFetcher<T>(service: Service<T> | null, options: FetchOption<T> = {}) {
  const [state, setState] = useState<T | null>(null)

  useEffect(() => {
    if (service === null) {
      return
    }

    service().then(res => {
      res
        .fail(err => {
          options.fail && options.fail(err)
        })
        .succeed(data => {
          options.success && options.success(data)
          setState(data)
        })
    })
  }, [])

  return [state, setState] as [typeof state, typeof setState]
}
