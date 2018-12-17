import { GET, PUT, DELETE } from '@/utils/fetch'

import { IBoardGroup, IBoard, ITagGroup } from '@cc98/api'

import { cacheService } from './utils'

/**
 * 获取所有版面信息
 */
export const getBoardsInfo = cacheService(
  () => GET<IBoardGroup[]>('board/all'),
  'boardsInfo',
  3600 * 24 * 7
)

/**
 * 通过版面Id获取版面名称
 */
export const getBoardNameById = (() => {
  // cache
  let _hasMap = false
  const _BoardNameCacheMap: {
    [key: number]: string
  } = {}

  return async (id: number) => {
    if (!_hasMap) {
      const res = await getBoardsInfo()
      res.fail().succeed(boards => {
        for (const baseBoard of boards) {
          for (const childBoard of baseBoard.boards) {
            _BoardNameCacheMap[childBoard.id] = childBoard.name
          }
        }
        _hasMap = true
      })
    }

    return _BoardNameCacheMap[id] || '版面不存在'
  }
})()

/**
 * 获取单个版面信息
 */
export function getBoardInfo(id: string) {
  return GET<IBoard>(`board/${id}`)
}

/**
 * 获取某个版面的标签组
 */
export async function getBoardTags(id: string) {
  return GET<ITagGroup[]>(`board/${id}/tag`)
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
