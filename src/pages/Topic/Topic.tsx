import React from 'react'
import { navigate } from '@reach/router'
import { css } from 'emotion'

import LoadingCircle from '@/components/LoadingCircle'
import Editor from './Editor'
import PostHead from './PostHead'

import InfiniteList from '@/components/InfiniteList'
import { BoardInfoStore } from '@/model/board'
import { GlobalContainer } from '@/model/global'
import { PostInfoStore } from '@/model/post'
import getBoardName from '@/services/getBoardName'
import { GET } from '@/utils/fetch'
import { IPost, IPostUtil, ITopic, IUser } from '@cc98/api'
import MyDialog from './Dialog'
import PostItem from './PostItem'

const root = css`
  background-color: #eee;
`

interface Props {
  topicId: string
  postId: string
  userId: string
  postInstance: PostInfoStore
  global: GlobalContainer
  boardInstance: BoardInfoStore
}

interface State {
  topicInfo: ITopic | null
  open: boolean
  currentPost: IPost | null
  editing: boolean
}

class Topic extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    props.postInstance.init(parseInt(props.topicId, 10))
  }

  state: State = {
    topicInfo: null,
    open: false,
    currentPost: null,
    editing: false,
  }

  async componentDidMount() {
    const topicId = parseInt(this.props.topicId, 10)
    if (isNaN(topicId)) {
      navigate('/404')

      return null
    }

    const { postInstance, boardInstance } = this.props
    const topic = await GET<ITopic>(`/topic/${topicId}`)
    topic.fail().succeed(topicInfo => {
      const boardName = getBoardName(boardInstance.state.boardData, topicInfo.boardId)
      topicInfo.boardName = boardName
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
    this.props.postInstance.reset()
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
    const { topicInfo, currentPost, editing } = this.state
    const { postId, userId, global, postInstance } = this.props
    const { isLoading, isEnd, posts, userMap, awardsUserMap } = postInstance.state

    const isTrace = Boolean(postId) || Boolean(userId)
    if (topicInfo === null) {
      return <LoadingCircle />
    }
    const myInfo = global.state.myInfo as IUser

    return (
      <div className={root}>
        <PostHead topicInfo={topicInfo} />
        <MyDialog
          open={this.state.open}
          onClose={this.handleDialogClose}
          currentPost={currentPost}
          refreshItem={(data: { id: number, content: string, reason: string }) => {
            postInstance.updatePostAward(data, myInfo.name)
          }}
        />

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
              initEditor={postInstance.wakeUpEditor}
            />
          )
          )}
        </InfiniteList>

        <Editor
          topic={topicInfo}
          initContent={postInstance.state.initEditorContent}
          resetInitContent={postInstance.resetInitContent}
          callback={postInstance.fetchPosts}
          theme={global.state.theme}
        />
      </div>
    )
  }
}

export default Topic
