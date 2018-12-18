import React from 'react'
import styled from 'styled-components'

import MetaInfo, { MetaInfoContainer } from './MetaInfo'
import Editor, { EditorContainer } from './Editor'

import useInit from './useInit'

import { ITopicParams, IPostParams, postTopic, replyTopic, editorPost } from '@/services/editor'

import { goback, navigate } from '@/utils/history'

const WrapperDiv = styled.div`
  margin: 8px 12px;
`

/********************************
 * boardId - 发布帖子
 * topicId - 回复帖子
 * topicId & postId - 引用帖子
 * postId  - 修改帖子
 ********************************/

export interface Props {
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
  const init = useInit(props)
  if (init === null) {
    // init 还在获取中
    return null
  }

  const editor = new EditorContainer(init.editor.initContent)
  const metaContainer = new MetaInfoContainer(init.metaInfo)

  const onSendCallback = chooseSendCallback(
    props,
    init.boardId !== undefined,
    editor,
    metaContainer
  )

  return (
    <WrapperDiv>
      {init.boardId && <MetaInfo container={metaContainer} boardId={init.boardId} />}
      <Editor editor={editor} onSendCallback={onSendCallback} />
    </WrapperDiv>
  )
}

/**
 * 选择合适的回调
 */
function chooseSendCallback(
  props: Props,
  isFirstFloor: boolean,
  editor: EditorContainer,
  metaInfo: MetaInfoContainer
): () => void {
  const { boardId, topicId, postId } = props

  // return () => {
  //   alert(editor.fullContent)
  // }

  // 发布帖子
  if (boardId) {
    return () => {
      const topicParams: ITopicParams = {
        ...metaInfo.state,
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
          navigate(`/topic/${topicId}/${new Date()}`)
        })
      )
    }
  }

  // 编辑主题帖子
  if (postId && isFirstFloor) {
    return () => {
      const topicParams: ITopicParams = {
        ...metaInfo.state,
        content: editor.fullContent,
        contentType: 0,
      }

      // editorPost(postId, topicParams).then(res =>
      //   res.fail().succeed(() => {
      //     goback()
      //   })
      // )
    }
  }

  // 编辑普通帖子
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
