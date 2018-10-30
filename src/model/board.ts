import { FetchError, GET } from '@/utils/fetch'
import { Success, Try } from '@/utils/fp/Try'
import { getLocalStorage, setLocalStorage } from '@/utils/storage'
import { IBaseBoard, IBoard, ITag } from '@cc98/api'
import { Container } from '@cc98/state'

interface T {
  name: string
  id: number
}
interface State {
  tagData: T[]
  boardData: IBaseBoard[]
  childBoardData: IBoard[]
}

export class BoardInfoStore extends Container<State> {
  state: State = {
    tagData: [],
    boardData: [],
    childBoardData: [],
  }

  constructor() {
    super()
    this.getInfo()
    this.getTagInfo()
  }
  /**
   * 获取版面信息
   * @return {Promise<Try<IUser, FetchError>>}
   * @memberof BoardInfoStore
   */
  getInfo = (): Promise<Try<IBaseBoard[], FetchError>> | undefined => {
    if (this.state.boardData.length !== 0) {
      return Promise.resolve(Try.of<IBaseBoard[], FetchError>(Success.of(this.state.boardData)))
    }
    if (getLocalStorage('boardsInfo')) {
      this.put(state => {
        state.boardData = getLocalStorage('boardsInfo') as IBaseBoard[]
        state.childBoardData = getLocalStorage('childBoardsInfo') as IBoard[]
      })
    } else {
      return this.forceGetInfo()
    }
  }
  /**
   * 获取标签信息
   * @return {Promise<Try<IUser, FetchError>>}
   * @memberof BoardInfoStore
   */
  getTagInfo = (): Promise<Try<T[], FetchError>> | undefined => {
    if (this.state.tagData.length !== 0) {
      return Promise.resolve(Try.of<T[], FetchError>(Success.of(this.state.tagData)))
    }

    if (getLocalStorage('tagsInfo')) {
      console.log("==")
      this.put(state => state.tagData = getLocalStorage('tagsInfo') as T[])
    } else {
      return this.forceGetTagInfo()
    }
  }
  /**
   * 强制从服务器获取全部信息
   * @return {Promise<Try<IUser, FetchError>>}
   * @memberof BoardInfoStore
   */
  forceGetInfo = async (): Promise<Try<IBaseBoard[], FetchError>> => {
    const res = await GET<IBaseBoard[]>('board/all')
    res.fail().succeed(info => this.setInfo(info))

    return res
  }
  /**
   * 强制从服务器获取全部信息
   * @return {Promise<Try<IUser, FetchError>>}
   * @memberof BoardInfoStore
   */
  forceGetTagInfo = async (): Promise<Try<T[], FetchError>> => {
    const res = await GET<T[]>('config/global/alltag')

    res.fail().succeed(info => this.setTagInfo(info))

    return res
  }
  setInfo = (data: IBaseBoard[]) => {
    let cd: IBoard[] = []
    setLocalStorage('boardsInfo', data, 3600 * 24 * 7)
    for (const baseBoard of data) {
      cd = cd.concat(baseBoard.boards)
    }
    setLocalStorage('childBoardsInfo', cd, 3600 * 24 * 7)
    this.put(state => { state.boardData = data; state.childBoardData = cd })
  }

  setTagInfo = (data: T[]) => {
    setLocalStorage('tagsInfo', data, 3600 * 24 * 7)
    this.put(state => state.tagData = data)
  }
}

export default new BoardInfoStore()
