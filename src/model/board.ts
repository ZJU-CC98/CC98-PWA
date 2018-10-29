import { FetchError, GET } from '@/utils/fetch'
import { Success, Try } from '@/utils/fp/Try'
import { IBaseBoard, IBoard, ITag } from '@cc98/api'
import { Container } from '@cc98/state'
interface T {
  name: string
  id: number
}
interface State {
  tagData: T[],
  boardData: IBaseBoard[]
}

export class BoardInfoStore extends Container<State> {
  state: State = {
    tagData: [],
    boardData: [],
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
  getInfo = (): Promise<Try<IBaseBoard[], FetchError>> => {
    if (this.state.boardData.length !== 0) {
      return Promise.resolve(Try.of<IBaseBoard[], FetchError>(Success.of(this.state.boardData)))
    }

    return this.forceGetInfo()
  }
  /**
   * 获取标签信息
   * @return {Promise<Try<IUser, FetchError>>}
   * @memberof BoardInfoStore
   */
  getTagInfo = (): Promise<Try<T[], FetchError>> => {
    if (this.state.boardData.length !== 0) {
      return Promise.resolve(Try.of<T[], FetchError>(Success.of(this.state.tagData)))
    }

    return this.forceGetTagInfo()
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
    this.put(state => state.boardData = data)
  }
  setTagInfo = (data: T[]) => {
    this.put(state => state.tagData = data)
  }
}

export default new BoardInfoStore()
