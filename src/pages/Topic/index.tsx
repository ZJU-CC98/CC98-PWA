import { BoardInfoStore } from '@/model/board'
import global, { GlobalContainer } from '@/model/global'
import { PostInfoStore } from '@/model/post'
import { Subscribe } from '@cc98/state'
import React from 'react'
import Topic from './Topic'
interface Props {
  topicId: string
  postId: string
  userId: string
}

export default class extends React.PureComponent<Props> {
  render() {
    const { postId, userId, topicId } = this.props

    return (
      <Subscribe to={[global, PostInfoStore, BoardInfoStore]}>
        {
          (g: GlobalContainer, postInstance: PostInfoStore, boardInstance: BoardInfoStore) => {
            const isRender = g.state.myInfo

            return isRender ? < Topic
              topicId={topicId}
              postId={postId}
              userId={userId}
              global={g}
              postInstance={postInstance}
              boardInstance = {boardInstance}
            /> : null
          }
        }
      </Subscribe>
    )
  }
}
