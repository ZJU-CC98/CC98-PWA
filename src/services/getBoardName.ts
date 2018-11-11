import { IBaseBoard } from '@cc98/api'


// export default async function getBoardNameById(id: number) {
//   // 先找本地缓存
//   const boardsInfoStorageOrNull = getLocalStorage('boardsInfo')
//   if (boardsInfoStorageOrNull) {
//     for (const baseBoard of boardsInfoStorageOrNull as IBaseBoard[]) {
//       for (const childBoard of baseBoard.boards) {
//         if (id === childBoard.id) return childBoard.name
//       }
//     }

//     return '版面不存在'
//   }

//   const boardsInfoData = await GET<IBaseBoard[]>('/board/all')
//   boardsInfoData.fail().succeed(async boardsInfo => {
//     setLocalStorage('boardsInfo', boardsInfo, 3600)
//     await getBoardNameById(id)
//   })
// }

// FIXME: move
export default function(boards: IBaseBoard[], id: number) {
  for (const baseBoard of boards) {
    for (const childBoard of baseBoard.boards) {
      if (id === childBoard.id) return childBoard.name
    }
  }

  return '版面不存在'
}
