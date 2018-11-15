import { Try, Success } from '@/utils/fp/Try'
import { IBaseBoard, IBoard } from '@cc98/api'
import { FetchError, GET } from '@/utils/fetch'
import { getLocalStorage, setLocalStorage } from '@/utils/storage'

/**
 * @description 获取版面信息
 * @returns {Promise<Try<IBaseBoard[], FetchError>>}
 */
export async function getBoardsInfo() {
  const cache = getLocalStorage('boardsInfo') as IBaseBoard[] | undefined

  if (cache) {
    return Promise.resolve(Try.of<IBaseBoard[], FetchError>(Success.of(cache)))
  }

  const res = await GET<IBaseBoard[]>('/board/all')
  res.succeed(data => {
    setLocalStorage('boardsInfo', data, 3600 * 24 * 7)
    let cd: IBoard[] = []
    for (const baseBoard of data) {
      cd = cd.concat(baseBoard.boards)
    }
    setLocalStorage('childBoardsInfo', cd, 3600 * 24 * 7)
  })

  return res
}

/**
 * 通过版面Id获取版面名称
 */
export function getBoardNameById(boards: IBaseBoard[], id: number) {
  for (const baseBoard of boards) {
    for (const childBoard of baseBoard.boards) {
      if (id === childBoard.id) return childBoard.name
    }
  }

  return '版面不存在'
}
