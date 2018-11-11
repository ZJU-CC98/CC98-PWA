import React from 'react'

import { Subscribe } from '@cc98/state'

import { BoardInfoStore } from '@/model/board'
import global, { GlobalContainer } from '@/model/global'
import { PostInfoStore } from '@/model/post'

import Topic from './Topic'

interface Props {
  topicId: string
  postId: string
  userId: string
}

interface State {
  postInstance: PostInfoStore
}

export default class extends React.Component<Props, State> {
  state = {
    postInstance: new PostInfoStore(),
  }

  render() {
    const { postId, userId, topicId } = this.props
    const { postInstance } = this.state

    return (
      <Subscribe to={[global, postInstance, BoardInfoStore]}>
        {(g: GlobalContainer, p: PostInfoStore, boardInstance: BoardInfoStore) => {
          const isRender = g.state.myInfo

          return isRender ? (
            <Topic
              topicId={topicId}
              postId={postId}
              userId={userId}
              global={g}
              postInstance={postInstance}
              boardInstance={boardInstance}
            />
          ) : null
        }}
      </Subscribe>
    )
  }
}
