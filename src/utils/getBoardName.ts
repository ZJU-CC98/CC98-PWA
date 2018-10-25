import { IBaseBoard, IBoard } from '@cc98/api'
import { GET } from './fetch'
import { getLocalStorage, setLocalStorage } from './storage'
export default async function getBoardNameById(id: number) {
  // 先找本地缓存
  const boardsInfoStorageOrNull = getLocalStorage('boardsInfo')
  if (boardsInfoStorageOrNull) {
    for (const baseBoard of boardsInfoStorageOrNull as IBaseBoard[]) {
      for (const childBoard of baseBoard.boards) {
        if (id === childBoard.id) return childBoard.name
      }
    }

    return '版面不存在'
  }

  const boardsInfoData = await GET<IBaseBoard[]>('/board/all')
  boardsInfoData.fail().succeed(async boardsInfo => {
    setLocalStorage('boardsInfo', boardsInfo, 3600)
    await getBoardNameById(id)
  })
}
