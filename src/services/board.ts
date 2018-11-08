import { Try, Success } from '@/utils/fp/Try'
import { IBaseBoard } from '@cc98/api'
import { FetchError, GET } from '@/utils/fetch'
import { getLocalStorage, setLocalStorage } from '@/utils/storage'

/**
 * @description 获取版面信息
 * @returns {Promise<Try<IBaseBoard[], FetchError>>}
 */
export async function getBoardsInfo(): Promise<Try<IBaseBoard[], FetchError>> {
  const cache = getLocalStorage('boardsInfo') as IBaseBoard[] | undefined

  if (cache) {
    return Promise.resolve(Try.of<IBaseBoard[], FetchError>(Success.of(cache)))
  }

  const res = await GET<IBaseBoard[]>('/board/all')
  res.succeed(data => setLocalStorage('boardsInfo', data))

  return res
}
