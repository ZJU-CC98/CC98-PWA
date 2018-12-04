/* tslint:disable */
import { useState, useEffect } from 'react'

import { Try } from '@/utils/fp/Try'
import { FetchError } from '@/utils/fetch'

export type Service<T> = (from: number) => Promise<Try<T, FetchError>>

interface InfListState {
  isLoading: boolean
  isEnd: boolean
  from: number
}

interface Options<T> {
  /**
   * 第一次加载的时候触发 callback
   */
  initRequest?: boolean
  /**
   * 步长，默认 20
   */
  step?: number
  /**
   * Try fail callback
   */
  fail?: (err: FetchError) => void
  /**
   * Try success callback
   */
  success?: (data: T[]) => void
}

export default function useInfList<T>(service: Service<T[]>, options: Options<T> = {}) {
  const [state, setState] = useState<InfListState>({
    isLoading: false,
    isEnd: false,
    from: 0,
  })

  const [list, setList] = useState<T[]>([])

  function callback() {
    setState({
      ...state,
      isLoading: true,
    })

    service(state.from).then(res => {
      res
        .fail(err => {
          options.fail && options.fail(err)
        })
        .succeed(list => {
          options.success && options.success(list)

          setList(prevList => prevList.concat(list))
          setState({
            isLoading: false,
            isEnd: list.length !== (options.step || 20),
            from: state.from += list.length,
          })
        })
    })
  }

  useEffect(() => {
    if (options.initRequest === undefined || options.initRequest === true) {
      callback()
    }
  }, [])

  return [list, state, callback] as [typeof list, typeof state, typeof callback]
}
