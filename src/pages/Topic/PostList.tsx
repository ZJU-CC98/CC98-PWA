import React from 'react'
import { css } from 'emotion'
import { debounce } from 'lodash-es'

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

  /**
   * 存储 debounce 之后的 fetch 函数
   */
  bindFunc: () => void

  /**
   * loading 图标 <CircularProgress />
   */
  loadingDom = React.createRef<HTMLDivElement>()

  async componentDidMount() {
    this.fetchPosts()

    this.bindFunc = debounce(this.fetchPosts, 200)
    window.addEventListener('scroll', this.bindFunc)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.bindFunc)
  }

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

    const res = await GET<IPost[]>(`topic/${topicID}/post?from=${from}&size=${size}`, {
      authorization: true
    })

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
