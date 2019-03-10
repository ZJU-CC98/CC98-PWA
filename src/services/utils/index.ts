import { Try, Success } from '@/utils/fp/Try'
import { FetchError } from '@/utils/fetch'

import { getLocalStorage, setLocalStorage } from '@/utils/storage'

type Service<T> = () => Promise<Try<T, FetchError>>

/**
 * 缓存一个无参数服务
 * @param service 服务
 * @param name 缓存使用的 key
 * @param expireIn 本地缓存有效时间
 */
export function cacheService<T extends object | string>(
  service: Service<T>,
  name: string,
  expireIn = 0
) {
  const key = `cache-${name}`
  let cache = getLocalStorage(key) as T | null
  let isFetching = false
  let promise: ReturnType<typeof service>

  return () => {
    if (cache) {
      return Promise.resolve(Try.of<T, FetchError>(Success.of(cache)))
    }

    if (isFetching) {
      return promise
    }

    isFetching = true
    promise = service()

    return promise.then(res => {
      isFetching = false

      res.fail().succeed(value => {
        cache = value
        setLocalStorage(key, value, expireIn)
      })

      return res
    })
  }
}
