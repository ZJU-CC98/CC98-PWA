import React from 'react'

import InfiniteList from '@/components/InfiniteList'
import postInstance from '@/model/post'
import { IPost, IUser } from '@cc98/api'
import { Subscribe } from '@cc98/state'
import PostItem from './PostItem'

interface Props {
  topicID: number
}

// interface State {
//   postList: IPost[]
//   userMap: {
//     [id: string]: IUser
//   }

//   from: number
//   size: number

//   isLoading: boolean
//   isEnd: boolean
// }

// class TopicList extends React.Component<Props, State> {
//   state: State = {
//     postList: [],
//     userMap: {},
//     from: 0,
//     size: 10,

//     isLoading: false,
//     isEnd: false,
//   }

//   async componentDidMount() {
//     this.fetchPosts()
//   }

//   fetchPosts = async () => {
//     const { topicID } = this.props
//     const { from, size } = this.state

//     this.setState({
//       isLoading: true,
//     })

//     const posts = await GET<IPost[]>(`topic/${topicID}/post?from=${from}&size=${size}`)

//     posts.fail().succeed(postList => {
//       this.fetchUsers(postList)

//       this.setState({
//         postList: this.state.postList.concat(postList),
//         from: from + postList.length,

//         isLoading: false,
//         isEnd: postList.length !== size,
//       })
//     })
//   }

//   fetchUsers = async (postList: IPost[]) => {
//     const query = postList
//       .map(p => p.userId)
//       .filter(u => u)
//       .map(u => `id=${u}`)
//       .join('&')

//     if (!query) return

//     const res = await GET<IUser[]>(`user?${query}`)

//     res.fail().succeed(users => {
//       const newUsers: State['userMap'] = {}
//       users.forEach(user => {
//         newUsers[user.id] = user
//       })

//       this.setState({
//         userMap: Object.assign({}, this.state.userMap, newUsers),
//       })
//     })
//   }

//   render() {
//     const { postList, userMap, isLoading, isEnd } = this.state

//     return (
//       <InfiniteList isLoading={isLoading} isEnd={isEnd} callback={this.fetchPosts}>
//         {postList.map(info => (
//           <PostItem key={info.id} postInfo={info} userInfo={userMap[info.userId]} />
//         ))}
//       </InfiniteList>
//     )
//   }
// }

// export default TopicList

export default class extends React.PureComponent<Props> {
  constructor(props: Props) {
    super(props)
    postInstance.init(this.props.topicID)
  }

  async componentDidMount() {
    await postInstance.fetchPosts()
  }

  componentWillUnmount() {
    postInstance.reset()
  }

  render() {

    return (
      <Subscribe to={[postInstance]}>
        {() => {
          const { isLoading, isEnd, posts, userMap } = postInstance.state

          return (
            <InfiniteList isLoading={isLoading} isEnd={isEnd} callback={postInstance.fetchPosts}>
              {posts.map((info: IPost) => (
                <PostItem key={info.id} postInfo={info} userInfo={userMap[info.userId]} />
              ))}
            </InfiniteList>
          )
        }}
      </Subscribe>
    )
  }
}
