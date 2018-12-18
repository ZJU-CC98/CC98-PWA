import userInstance from '@/containers/user'
import { getBoardsInfo } from '@/services/board'
import { IPost, IUser } from '@cc98/api'

const isBoardMaster = async (boardId: number) => {
  const myInfo = userInstance.state.myInfo
  let result = false
  const res = await getBoardsInfo()
  res
    .fail(_ => (result = false))
    .succeed(boards => {
      console.log('in succ')
      const childBoards = boards
        .map(baseBoard => baseBoard.boards)
        .reduce((prev, cur) => cur.concat(prev))
      const board = childBoards.filter(b => b.id === boardId)[0]
      result = myInfo ? board.boardMasters.indexOf(myInfo.name) !== -1 : false
    })
  console.log('bef return')
  return result
}

export const isManager = () => {
  const myInfo = userInstance.state.myInfo
  return Boolean(myInfo && myInfo.privilege === '管理员')
}

export const canEdit = async (postInfo: IPost, userInfo: IUser | undefined) => {
  const myInfo = userInstance.state.myInfo
  const _isManager = isManager()
  const _isMaster = await isBoardMaster(postInfo.boardId)
  if (null === myInfo) {
    return false
  } else {
    const id = myInfo.id
    return
    Boolean(postInfo.userId === id || postInfo.isAnonymous || _isMaster || _isManager)
  }
}
