import React from 'react'
import { css } from 'emotion'

import { CircularProgress } from '@material-ui/core'
import PostItem from './PostItem'

import { GET } from '@/utils/fetch'
import { IPost, IUser } from '@cc98/api'


const loading = css`
  display: flex;
  justify-content: center;
  margin: 15px 0;
`

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

  loadingDom = React.createRef<HTMLDivElement>()

  fetchPosts = async () => {
    const { isLoading, isEnd } = this.state
    if (isLoading || isEnd)
      return

    // loadingDom 出现在可视区域
    const distance = this.loadingDom.current
      && (window.innerHeight - this.loadingDom.current.getBoundingClientRect().top)

    if (distance === null || distance < 0)
      return

    const { topicID } = this.props
    const { from, size } = this.state

    this.setState({
      isLoading: true,
    })

    const res = await GET<IPost[]>(`topic/${topicID}/post?from=${from}&size=${size}`)

    res
      .map(postList => {
        this.setState({
          postList: this.state.postList.concat(postList),
          from: from + postList.length,

          isLoading: false,
          isEnd: postList.length !== size,
        })
      })
  }

  async componentDidMount() {
    this.fetchPosts()

    //TODO: debounce
    window.addEventListener('scroll', this.fetchPosts)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.fetchPosts)
  }

  render() {
    const { postList, userMap, isEnd } = this.state

    return (
      <>
        {
          postList.map((info) => (
            <PostItem
              key={info.id}
              postInfo={info}
              userInfo={userMap[info.id]}
            />
          ))
        }
        {!isEnd && <div className={loading} ref={this.loadingDom}>
          <CircularProgress />
        </div>
        }
      </>
    )
  }
}

export default TopicList
