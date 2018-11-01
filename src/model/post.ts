import getTagName from '@/services/getTagName'
import { FetchError, GET } from '@/utils/fetch'
import { Success, Try } from '@/utils/fp/Try'
import { getLocalStorage, setLocalStorage } from '@/utils/storage'
import { IPost, IUser } from '@cc98/api'
import { Container } from '@cc98/state'

interface State {
  isLoading: boolean
  isEnd: boolean
  posts: IPost[]
  userMap: {
    [id: string]: IUser
  }
  from: number
  topicId: number
  // tslint:disable-next-line:no-any
  request: any
  // tslint:disable-next-line:no-any
  [index: string]: any
}

class PostInfoStore extends Container<State> {
  state: State = {
    isLoading: false,
    isEnd: false,
    posts: [],
    userMap: {},
    from: 0,
    topicId: -1,
    // tslint:disable-next-line:no-empty
    request: null,
  }

  init = (id: number) => {
    this.put(state => {
      state.topicId = id
      state.request = async () => await GET<IPost[]>(`topic/${this.state.topicId}/post`, {
        params: {
          from: `${this.state.from}`,
          size: '10',
        },
      })
    })
  }

  fetchPosts = async () => {
    const { topicId, from, posts, isLoading, isEnd, request } = this.state

    this.put(state => state.isLoading = true)

    const postTry = await request()

    postTry.fail().succeed((postList: IPost[]) => {
      this.fetchUsers(postList)

      this.put(state => {
        state.from = from + postList.length,
          state.posts = posts.concat(postList),
          state.isEnd = postList.length !== 10,
          state.isLoading = false
      })
    })
  }

  fetchUsers = async (postList: IPost[]) => {
    const query = postList
      .map(p => p.userId)
      .filter(u => u)
      .map(u => `id=${u}`)
      .join('&')

    if (!query) return

    const res = await GET<IUser[]>(`user?${query}`)

    res.fail().succeed(users => {
      const newUsers: State['userMap'] = {}
      users.forEach(user => {
        newUsers[user.id] = user
      })

      this.put(state => {
        state.userMap = Object.assign({}, this.state.userMap, newUsers)
      })
    })
  }
  updateSinglePosts = async<T extends Partial<IPost>>(postId: number, postUpdate: T) => {
    const dlist = this.state.posts.map(e => {
      if (e.id === postId) {
        return Object.assign({}, e, postUpdate)
      }

      return e
    })
    this.put(state => {
      state.posts = dlist
    })
  }

  freshLatestPosts = async () => {
    const { topicId, from, posts } = this.state

    this.put(state => state.isLoading = true)

    const postTry = await GET<IPost[]>(`topic/${topicId}/post?from=${from - 10}&size=10`)

    postTry.fail().succeed(postList => {
      this.fetchUsers(postList)
      const dlist = posts.slice(0, from - 10)
      this.put(state => {
        state.posts = dlist.concat(postList),
          state.isEnd = postList.length !== 10,
          state.isLoading = false
      })
    })
  }

  trace = async (topicId: number, identifyId: number, isAnonymous: boolean = false) => {
    this.put(state => {
      state.from = 0,
        state.request = async () => await GET<IPost[]>('post/topic/user', {
          params: {
            topicId: `${topicId}`,
            userId: `${identifyId}`,
            from: `${this.state.from}`,
            size: '10',
          },
        }),
        state.userMap = {}
    })
  }

  reset = () => {
    const initState: State = {
      isLoading: false,
      isEnd: false,
      posts: [],
      userMap: {},
      from: 0,
      topicId: -1,
      requestUrl: '',
      request: null,
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

export default new PostInfoStore()
