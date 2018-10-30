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
}

class PostInfoStore extends Container<State> {
  state: State = {
    isLoading: false,
    isEnd: false,
    posts: [],
    userMap: {},
    from: 0,
    topicId: -1,
  }

  init = (id: number) => {
    this.put(state => state.topicId = id)
  }

  fetchPosts = async () => {
    const { topicId, from, posts, isLoading, isEnd } = this.state

    this.put(state => state.isLoading = true)

    const postTry = await GET<IPost[]>(`topic/${topicId}/post?from=${from}&size=10`)

    postTry.fail().succeed(postList => {
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
}

export default new PostInfoStore()
