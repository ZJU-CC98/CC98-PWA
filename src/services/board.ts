import { Try, Success } from '@/utils/fp/Try'
import { FetchError, GET, PUT, DELETE } from '@/utils/fetch'

import { IBoardGroup, IBoard, ITagGroup } from '@cc98/api'

import { getLocalStorage, setLocalStorage } from '@/utils/storage'

/**
 * @description 获取所有版面信息
 */
export async function getBoardsInfo() {
  const cache = getLocalStorage('boardsInfo') as IBoardGroup[] | undefined

  // TODO: use cache utils
  if (cache) {
    return Promise.resolve(Try.of<IBoardGroup[], FetchError>(Success.of(cache)))
  }

  const res = await GET<IBoardGroup[]>('/board/all')
  res
    .fail()
    .succeed(data => {
      setLocalStorage('boardsInfo', data, 3600 * 24 * 7)
    })

  return res
}

/**
 * 获取单个版面信息
 */
export function getBoardInfo(id: string) {
  return GET(`board/${id}`)
}

/**
 * 获取某个版面的标签组
 */
export async function getBoardTags(id: string) {
  return GET<ITagGroup[]>(`board/${id}/tag`)
}

/**
 * 通过版面Id获取版面名称
 */
export async function getBoardNameById(id: number) {
  let name = '版面不存在'

  const res = await getBoardsInfo()
  res
    .fail()
    .succeed(boards => {
      for (const baseBoard of boards) {
        for (const childBoard of baseBoard.boards) {
          if (id === childBoard.id) name = childBoard.name
        }
      }
    })

  return name
}

/**
 * 关注/取关版面
 */
export function customBoard(id: number, opt: 0 | 1) {
  const url = `me/custom-board/${id}`
  if (opt === 1) {
    return PUT(url)
  }

  return DELETE(url)
}
