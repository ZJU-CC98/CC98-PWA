import React from 'react'

import PostCard from '../components/PostCard'
import LoadingBar from '../components/LoadingBar'

import { PostInfo } from '../TypeDefinitions/PostInfo'
import { UserInfo } from '../TypeDefinitions/UserInfo'

import { fetchPost, fetchUser } from '../utility/api'
import { debounce } from '../utility/util'


interface Props {
  topicID: number
}

interface State {
  isEnd: boolean
  postList: PostInfo[]
  userMap: {
    [userID: string]: UserInfo
  },
}

class PostList extends React.Component<Props, State> {

  state: State = {
    isEnd: false,
    postList: [],
    userMap: {}
  }


  isEnd: boolean = false
  isLoading: boolean = false
  from: number = 0

  bindFunc: () => void

  async componentDidMount() {
    this.fetchMore()

    this.bindFunc = debounce(this.fetchMore.bind(this), 200)
    window.addEventListener('scroll', this.bindFunc)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.bindFunc)
  }

  async fetchMore() {
    if (this.isEnd || this.isLoading) {
      return
    }

    const listDOM = this.refs.listDOM as Element
    const distance = listDOM.getBoundingClientRect().bottom - window.innerHeight
    if (distance > 200) {
      return
    }

    this.isLoading = true

    try {
      const posts = await fetchPost(this.props.topicID, this.from, 10)
      this.setState({
        postList: this.state.postList.concat(posts)
      })

      if (posts.length < 10) {
        this.isEnd = true
        this.setState({
          isEnd: true
        })
      }
      this.from += 10
      this.isLoading = false

      if (!posts.length) {
        return
      }

      // fetch userInfo async
      fetchUser(posts.map(p => p.userId))
        .then((users: UserInfo[]) => {
          const newUsers = {}
          users.forEach((user: UserInfo) => {
            newUsers[user.id] = user
          })

          this.setState({
            userMap: { ...this.state.userMap, ...newUsers }
          })
        })

    } catch (err) {
      console.log('401')
    }
  }

  render() {
    const { postList, userMap, isEnd } = this.state

    return (
      <div>
        <div ref="listDOM">
          {postList.map((data) => <PostCard
            key={data.floor}
            postData={data}
            userData={userMap[data.userId]}
          />)}
        </div>
        <div>
          {!isEnd && <LoadingBar />}
        </div>
      </div>
    )
  }
}

export default PostList
