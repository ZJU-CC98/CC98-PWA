import { navigate } from '@reach/router'
import { css } from 'emotion'
import React from 'react'

import LoadingCircle from '@/components/LoadingCircle'
import Editor from './Editor'
import PostHead from './PostHead'

import InfiniteList from '@/components/InfiniteList'
import postInstance from '@/model/post'
import { GET } from '@/utils/fetch'
import { IPost, IPostUtil, ITopic } from '@cc98/api'
import { Subscribe } from '@cc98/state'
import Dialog from './Dialog'
import PostItem from './PostItem'
const root = css`
  background-color: #eee;
`

interface Props {
  topicId: string
  postId: string
  userId: string
}

interface State {
  topicInfo: ITopic | null
  open: boolean
  currentPost: IPost | null
}

class Topic extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props)
    // tslint:disable-next-line:radix
    postInstance.init(parseInt(props.topicId))
  }

  state: State = {
    topicInfo: null,
    open: false,
    currentPost: null,
  }

  async componentDidMount() {
    const topicId = parseInt(this.props.topicId, 10)
    if (isNaN(topicId)) {
      navigate('/404')

      return null
    }

    const topic = await GET<ITopic>(`/topic/${topicId}`)
    topic.fail().succeed(topicInfo => {
      if (this.props.userId) {
        const userId = parseInt(this.props.userId, 10)
        postInstance.trace(topicId, userId, true)
      } else if (this.props.postId) {
        const postId = parseInt(this.props.postId, 10)
        postInstance.trace(topicId, postId, true, true)
      } else {
        postInstance.fetchPosts()
      }
      this.setState({
        topicInfo,
      })
    })
  }

  componentWillUnmount() {
    postInstance.reset()
  }
  handleClickOpen = (info: IPost) => {
    this.setState({
      open: true,
      currentPost: info,
    });
  };

  handleDialogClose = () => {
    this.setState({ open: false });
  }

  render() {
    const { topicInfo, currentPost } = this.state
    const { postId, userId } = this.props
    const isTrace = Boolean(postId) || Boolean(userId)

    if (topicInfo === null) {
      return <LoadingCircle />
    }

    return (
      <div className={root}>
        <PostHead topicInfo={topicInfo} />
        <Dialog
          open={this.state.open}
          onClose={this.handleDialogClose}
          currentPost={currentPost}
        />
        <Subscribe to={[postInstance]}>
          {() => {
            const { isLoading, isEnd, posts, userMap, awardsUserMap } = postInstance.state

            return (
              <InfiniteList
                isLoading={isLoading}
                isEnd={isEnd}
                callback={postInstance.fetchPosts}
              >
                {posts.map((info: IPost) => (
                  <PostItem
                    key={info.isHot ? `hot-${info.id}` : info.id}
                    postInfo={info}
                    userInfo={userMap[info.userId]}
                    isTrace={isTrace}
                    trace={postInstance.trace}
                    refreshItem={postInstance.updateSinglePosts}
                    openDialog={this.handleClickOpen}
                    closeDialog={this.handleDialogClose}
                    awardUserMap={awardsUserMap}
                  />
                )
                )}
              </InfiniteList>
            )
          }}
        </Subscribe>

        <Editor topic={topicInfo} callback={postInstance.fetchPosts} />

      </div>
    )
  }
}

export default Topic
