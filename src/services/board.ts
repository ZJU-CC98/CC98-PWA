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
  res.succeed(data => {
    setLocalStorage('boardsInfo', data, 3600 * 24 * 7)
    let childBoard: IBoard[] = []
    for (const baseBoard of data) {
      childBoard = childBoard.concat(baseBoard.boards)
    }
    setLocalStorage('childBoardsInfo', childBoard, 3600 * 24 * 7)
  })

  return res
}

export function getBoard(id: string) {
  return GET(`board/${id}`)
}

/**
 * 通过版面Id获取版面名称
 */
export function getBoardNameById(boards: IBoardGroup[], id: number) {
  for (const baseBoard of boards) {
    for (const childBoard of baseBoard.boards) {
      if (id === childBoard.id) return childBoard.name
    }
  }

  return '版面不存在'
}

export async function customBoard(id: number, opt: number) {
  const url = `me/custom-board/${id}`
  if (opt === 1) {
    return PUT(url)
  }

  return DELETE(url)
}
