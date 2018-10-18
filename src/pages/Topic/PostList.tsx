import React from 'react'

import InfinitiList from '@/components/InfinitiList'
import PostItem from './PostItem'

import { GET } from '@/utils/fetch'
import { IPost, IUser } from '@cc98/api'


type Props = {
  topicID: number
}

type State = {
  postList: IPost[]
  userMap: {
    [id: string]: IUser
  }

  from: number
  size: number

  isLoading: boolean
  isEnd: boolean
}

class TopicList extends React.Component<Props, State> {
  state: State = {
    postList: [],
    userMap: {},
    from: 0,
    size: 10,

    isLoading: false,
    isEnd: false,
  }

  async componentDidMount() {
    this.fetchPosts()
  }

  fetchPosts = async () => {
    const { topicID } = this.props
    const { from, size } = this.state

    this.setState({
      isLoading: true,
    })

    const posts = await GET<IPost[]>(`topic/${topicID}/post?from=${from}&size=${size}`)

    posts
      .fail()
      .succeed(postList => {
        this.fetchUsers(postList)

        this.setState({
          postList: this.state.postList.concat(postList),
          from: from + postList.length,

          isLoading: false,
          isEnd: postList.length !== size,
        })
      })
  }

  fetchUsers = async (postList: IPost[]) => {
    const query = postList
      .map(p => p.userId)
      .filter( u => u )
      .map( u => `id=${u}`)
      .join('&')

    if (!query)
      return

    const users = await GET<IUser[]>(`user?${query}`)

    users
      .fail()
      .succeed(users => {

        const newUsers: State["userMap"] = {}
        users.forEach(user => {
          newUsers[user.id] = user
        })

        this.setState({
          userMap: Object.assign(
            {}, this.state.userMap, newUsers,
          )
        })
      })
  }

  render() {
    const { postList, userMap, isLoading, isEnd } = this.state

    return (
      <InfinitiList
        isLoading={isLoading}
        isEnd={isEnd}
        callback={this.fetchPosts}
      >
        {postList.map((info) => (
            <PostItem
              key={info.id}
              postInfo={info}
              userInfo={userMap[info.userId]}
            />
          ))
        }
      </InfinitiList>
    )
  }
}

export default TopicList
