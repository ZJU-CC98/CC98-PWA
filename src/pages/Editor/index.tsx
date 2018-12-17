import React, { useState } from 'react'
import styled from 'styled-components'

import MetaInfo, { MetaInfoContainer } from './MetaInfo'
import Editor, { EditorContainer } from './Editor'

import {
  ITopicParams,
  IPostParams,
  getOriginalPost,
  postTopic,
  replyTopic,
  editorPost,
} from '@/services/editor'

import { goback } from '@/utils/history'
import dayjs from 'dayjs'

const WrapperDiv = styled.div`
  margin: 8px 12px;
`

/********************************
 * boardId - 发布帖子
 * topicId - 回复帖子
 * topicId & postId - 引用帖子
 * postId  - 修改帖子
 ********************************/

interface Props {
  /**
   * 版面 ID
   */
  boardId?: string
  /**
   * 帖子 ID
   */
  topicId?: string
  /**
   * 楼层 ID
   */
  postId?: string
}

export default (props: Props) => {
  const initContent = useInitContent(props)
  if (initContent === null) {
    return null
  }

  const editor = new EditorContainer(initContent)
  const onSendCallback = chooseSendCallback(props, editor)

  // TODO:
  const container = new MetaInfoContainer()

  return (
    <WrapperDiv>
      <MetaInfo container={container} />
      <Editor editor={editor} onSendCallback={onSendCallback} />
    </WrapperDiv>
  )
}

/**
 * 获取初始文本，返回 null 意味着 loading 中
 */
function useInitContent(props: Props): string | null {
  const { topicId, postId } = props

  const [initContent, setInitContent] = useState<string | null>(null)

  if (initContent !== null) {
    return initContent
  }

  // 引用某楼层
  if (topicId && postId) {
    getOriginalPost(postId).then(res =>
      res.fail().succeed(postInfo => {
        const { floor, userName, time, topicId, content } = postInfo
        const formatTime = dayjs(time).format('YYYY-MM-DD HH:mm')
        setInitContent(
          // tslint:disable-next-line
          `[quote]引用自${floor}楼${userName}在${formatTime}的发言：[color=blue][url=/topic/${topicId}#${floor}]>查看原帖<[/url][/color][/b]\n${content}[/quote]\n`
        )
      })
    )

    return null
  }

  // 编辑自己的帖子
  if (postId) {
    getOriginalPost(postId).then(res =>
      res.fail().succeed(postInfo => setInitContent(postInfo.content))
    )

    return null
  }

  return ''
}

/**
 * 选择合适的回调
 */
function chooseSendCallback(props: Props, editor: EditorContainer): () => void {
  const { boardId, topicId, postId } = props

  // return () => {
  //   alert(editor.fullContent)
  // }

  // 发布帖子
  if (boardId) {
    return () => {
      const topicParams: ITopicParams = {
        title: '',
        type: 0,

        content: editor.fullContent,
        contentType: 0,
      }

      postTopic(boardId, topicParams).then(res =>
        res.fail().succeed(() => {
          //
        })
      )
    }
  }

  // 回复帖子
  if (topicId) {
    return () => {
      const postParams: IPostParams = {
        title: '',
        content: editor.fullContent,
        contentType: 0,
      }

      replyTopic(topicId, postParams).then(res =>
        res.fail().succeed(() => {
          // TODO:
          goback()
        })
      )
    }
  }

  // 编辑帖子
  if (postId) {
    return () => {
      const postParams: IPostParams = {
        title: '',
        content: editor.fullContent,
        contentType: 0,
      }

      editorPost(postId, postParams).then(res =>
        res.fail().succeed(() => {
          goback()
        })
      )
    }
  }

  return () => undefined
}
