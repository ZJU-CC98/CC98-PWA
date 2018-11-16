import { Try, Success } from '@/utils/fp/Try'
import { IBoardGroup, IBoard } from '@cc98/api'
import { FetchError, GET, PUT, DELETE } from '@/utils/fetch'
import { getLocalStorage, setLocalStorage } from '@/utils/storage'

/**
 * @description 获取版面信息
 * @returns {Promise<Try<IBoardGroup[], FetchError>>}
 */
export async function getBoardsInfo() {
  const cache = getLocalStorage('boardsInfo') as IBoardGroup[] | undefined

  if (cache) {
    return Promise.resolve(Try.of<IBoardGroup[], FetchError>(Success.of(cache)))
  }

  const res = await GET<IBoardGroup[]>('/board/all')
  res.fail().succeed(data => {
    setLocalStorage('boardsInfo', data, 3600 * 24 * 7)
    let childBoard: IBoard[] = []
    for (const baseBoard of data) {
      childBoard = childBoard.concat(baseBoard.boards)
    }
    setLocalStorage('childBoardsInfo', childBoard, 3600 * 24 * 7)
  })

  return res
}

/**
 * 获取单个版面信息
 */
export function getBoard(id: string) {
  return GET(`board/${id}`)
}

/**
 * 通过版面Id获取版面名称
 */
export async function getBoardNameById(id: number) {
  const boardsTry = await getBoardsInfo()
  let name = '版面不存在'
  boardsTry.fail().succeed(boards => {
    for (const baseBoard of boards) {
      for (const childBoard of baseBoard.boards) {
        if (id === childBoard.id) name = childBoard.name
      }
    }
  })

  return name
}

/**
 * 用户关注/取关版面
 */

export function customBoard(id: number, opt: number) {
  const url = `me/custom-board/${id}`
  if (opt === 1) {
    return PUT(url)
  }

  return DELETE(url)
}
