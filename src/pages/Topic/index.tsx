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
      <Subscribe to={[global, PostInfoStore]}>
        {
          (g: GlobalContainer, postInstance: PostInfoStore) => {
            const isRender = g.state.myInfo

            return isRender ? < Topic
              topicId={topicId}
              postId={postId}
              userId={userId}
              global={g}
              postInstance={postInstance}
            /> : null
          }
        }
      </Subscribe>
    )
  }
}
