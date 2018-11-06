import getTagName from '@/services/getTagName'
import { FetchError, GET } from '@/utils/fetch'
import { Success, Try } from '@/utils/fp/Try'
import { getLocalStorage, setLocalStorage } from '@/utils/storage'
import { IBoard, ITag, ITopic } from '@cc98/api'
import { Container } from '@cc98/state'
interface T {
  id: number
  name: string
}
interface State {
  /**
   * 设置初始化相关信息 版面id以及显示位置
   */
  searchMes: { id: string | null, place: string } | null
  isLoading: boolean
  isEnd: boolean
  topics: ITopic[]
  tags: ITag[]
  tag1: T | null
  tag2: T | null
  board: IBoard | null
  from: number
  itags: T[]
  // tslint:disable-next-line:no-any
  [index: string]: any
}

export class TopicInfoStore extends Container<State> {
  state: State = {
    isLoading: false,
    isEnd: false,
    topics: [],
    tag1: null,
    tag2: null,
    tags: [],
    board: null,
    from: 0,
    itags: [],
    searchMes: null,
  }

  constructor() {
    super()
  }
  /**
   * 初始化函数，设置当前topic id，获取版面、标签全局信息
   */
  init = (id: string | null, place: string) => {
    if (id) {
      this.initBoard(id)
      this.initTag(id)
    }
    this.initTopics(id, place)
    this.setSearchMes(id, place)
  }

  /**
   * 设置api信息（版面帖子，新帖，搜索帖子，关注帖子）
   * @param id 帖子id
   * @param place 什么情况下显示的帖子列表
   */
  setSearchMes(id: string | null, place: string) {
    this.put(
      state => state.searchMes =  { id, place }
    )
  }

  initBoard = async (id: string) => {
    const boardData = await GET<IBoard>(`board/${id}`)
    boardData.map(board =>
      this.put(state => state.board = board))
  }

  initTag = async (id: string) => {
    const tagsData = await GET<ITag[]>(`board/${id}/tag`)
    tagsData
      .fail()
      .succeed(
        tags => {
          // 初始化标签
          if (tags.length !== 0) {
            const tag1 = { id: -1, name: '全部' }
            let tag2: T | null = null;
            if (tags.length === 2) {
              tag2 = { id: -1, name: '全部' }
            }
            this.put(state => {
              state.tag1 = tag1,
                state.tag2 = tag2,
                state.tags = tags
            })
          }
        }
      )
  }

  initTopTopics = async (id: string) => {
    const topTopicsData = await GET<ITopic[]>(`topic/toptopics?boardid=${id}`)
    topTopicsData.map(topTopics => {
      this.put(state => state.topics = state.topics.concat(topTopics))
    })
  }

  initTopics = async (id: string | null, place: string) => {
    if (id) {
      await this.initTopTopics(id)
    }
    await this.getTopics(id, place)
  }

  getTopics = async (id: string | null, place: string, searchItem?: string) => {
    const { tag1, tag2, from } = this.state
    this.put(state => (state.isLoading = true))
    let res: Try<ITopic[], FetchError> | null = null;
    switch (place) {
      case 'inboard':
        // 无标签
        if ((!tag1 || tag1.id < 0) && (!tag2 || tag2.id < 0)) {
          res = await GET<ITopic[]>(`board/${id}/topic`, {
            params: {
              from: `${this.state.from}`,
              size: '20',
            },
          })
        } else if ((tag1 && tag1.id >= 0) && (tag2 && tag2.id > 0)) {
          res = await GET(
            `topic/search/board/${id}/tag?tag1=${tag1.id}&tag2=${tag2.id}&from=${from}&size=20`)
        } else {
          let layer = 1;
          let tId = 0;
          if (tag1 && tag1.id > 0) {
            tId = tag1.id
          }
          if (tag2 && tag2.id >= 0) {
            layer = 2;
            tId = tag2.id;
          }
          res =
            await GET(
              `topic/search/board/${id}/tag?tag${layer}=${tId}&from=${from}&size=20`)
        }
        break
      case 'newtopic':
        res = await GET<ITopic[]>('topic/new', {
          params: {
            from: `${this.state.from}`,
            size: '20',
          },
        })
        break
      case 'search':
        if (searchItem) {
          res = await GET<ITopic[]>(`topic/search?keyword=${searchItem}`, {
            params: {
              from: `${this.state.from}`,
              size: '20',
            },
          })
        }
        break
    }
    /**
     * api在有标签的时候返回的并不是ITopic 而是[].topics
     */
    if (res) {
      if (place === 'inboard' && !((!tag1 || tag1.id < 0) && (!tag2 || tag2.id < 0))) {
        res.fail().succeed(
          // tslint:disable-next-line:no-any
          (data: any) => this.put(state => {
            state.topics = state.topics.concat(data.topics)
            state.isEnd = data.topics.length !== 20
            state.isLoading = false
            state.from += data.topics.length
          }))
      } else {
        res.fail().succeed(
          data =>
            this.put(state => {
              state.topics = state.topics.concat(data)
              state.isEnd = data.length !== 20
              state.isLoading = false
              state.from += data.length
            })
        )
      }

    }
  }

  handleChange = (index: keyof State) => (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { itags } = this.state;
    // tslint:disable-next-line:radix
    const id = parseInt(event.target.value);
    const name = getTagName(itags, id);
    if (index === 'tag1') {
      this.put(state => {
        state.tag1 = { id, name }
        state.from = 0
        state.topics = []
      })
    } else {
      this.put(state => {
        state.tag2 = { id, name }
        state.from = 0
        state.topics = []
      })
    }
    if (this.state.searchMes) {
      this.getTopics(this.state.searchMes.id, this.state.searchMes.place)
    }
  }

  reset = () => {
    const initState: State = {
      isLoading: false,
      isEnd: false,
      topics: [],
      tag1: null,
      tag2: null,
      tags: [],
      board: null,
      from: 0,
      itags: [],
      searchMes: null,
    }
    this.put(
      state => {
        for (const key of Object.keys(state)) {
          state[key] = initState[key]
        }
      }
    )
  }
}

export default new TopicInfoStore()
