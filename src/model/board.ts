import { FetchError, GET } from '@/utils/fetch'
import { Success, Try } from '@/utils/fp/Try'
import { IBaseBoard, IBoard, ITag } from '@cc98/api'
import { Container } from '@cc98/state'

interface State {
  tagData: ITag[],
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
   * 强制从服务器获取全部信息
   * @return {Promise<Try<IUser, FetchError>>}
   * @memberof BoardInfoStore
   */
  forceGetInfo = async (): Promise<Try<IBaseBoard[], FetchError>> => {
    const res = await GET<IBaseBoard[]>('board/all')

    res.fail().succeed(info => this.setInfo(info))

    return res
  }

  setInfo = (data: IBaseBoard[]) => {
    this.put(state => state.boardData = data)
  }
}

export default new BoardInfoStore()
