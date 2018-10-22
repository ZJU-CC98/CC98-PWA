import { getLocalStorage, setLocalStorage } from './storage'
import { IBaseBoard, IBoard } from '@cc98/api';
import { GET } from './fetch';
export default async function getBoardNameById (id: number) {
  //先找本地缓存
  const boardsInfoStorageOrNull = getLocalStorage("boardsInfo")
  if (boardsInfoStorageOrNull) {
    for (let baseBoard of boardsInfoStorageOrNull as IBaseBoard[]) {
      for (let childBoard of baseBoard.boards) {
        if (id === childBoard.id)
          return childBoard.name;
      }
    }
    return "版面不存在";
  }
  //没有缓存就去请求
  else {
    const boardsInfoData = await GET<IBaseBoard[]>('/board/all');
    boardsInfoData
      .fail()
      .succeed(
        async (boardsInfo) => {
          setLocalStorage("boardsInfo", boardsInfo, 3600);
          await getBoardNameById(id);
        }
      )
  }
}
