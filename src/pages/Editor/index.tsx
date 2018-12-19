import React, { useRef, useMemo } from 'react'
import styled from 'styled-components'

import MetaInfo, { MetaInfoContainer } from './MetaInfo'
import Editor, { EditorContainer } from './Editor'

import useInit from './useInit'

import { ITopicParams, IPostParams, postTopic, replyTopic, editorPost } from '@/services/editor'

import { goback } from '@/utils/history'
import snackbar from '@/utils/snackbar'

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

  const isContainerInit = useRef(false)

  interface MutableRefObject<T> {
    current: T
  }
  // 此处 @types/react 类型有误
  const editor = useRef<EditorContainer>(null) as MutableRefObject<EditorContainer>
  const metaContainer = useRef<MetaInfoContainer>(null) as MutableRefObject<MetaInfoContainer>

  if (init === null) {
    // init 还在获取中
    return null
  }

  if (!isContainerInit.current) {
    editor.current = new EditorContainer(init.editor.initContent)
    metaContainer.current = new MetaInfoContainer(init.metaInfo)

    isContainerInit.current = true
  }

  const onSendCallback = useMemo(
    () =>
      chooseSendCallback(editor.current, metaContainer.current, props, init.boardId !== undefined),
    []
  )

  return (
    <WrapperDiv>
      {init.boardId && <MetaInfo container={metaContainer.current} boardId={init.boardId} />}
      <Editor editor={editor.current} onSendCallback={onSendCallback} />
    </WrapperDiv>
  )
}

/**
 * 选择合适的回调
 */
function chooseSendCallback(
  editor: EditorContainer,
  metaInfo: MetaInfoContainer,
  props: Props,
  isEditorTopic: boolean
): () => void {
  const { boardId, topicId, postId } = props

  const stopLoading = () => {
    editor.setState({ isSending: false })
  }

  /**
   * for test
   */
  // return () => {
  //   setTimeout(() => {
  //     stopLoading()
  //   }, 2000)
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
        res
          .fail(() => {
            snackbar.error('发布失败')
            stopLoading()
          })
          .succeed(() => {
            // TODO: 刷新帖子，下同
            snackbar.success('发布成功')
            goback()
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
        res
          .fail(() => {
            snackbar.error('回复失败')
            stopLoading()
          })
          .succeed(() => {
            snackbar.success('回复成功')
            goback()
          })
      )
    }
  }

  // 编辑帖子
  if (postId) {
    return () => {
      const params: ITopicParams | IPostParams = isEditorTopic
        ? {
          ...metaInfo.state,
          content: editor.fullContent,
          contentType: 0,
        }
        : {
          title: '',
          content: editor.fullContent,
          contentType: 0,
        }

      editorPost(postId, params).then(res =>
        res
          .fail(() => {
            snackbar.error('编辑失败')
            stopLoading()
          })
          .succeed(() => {
            snackbar.success('编辑成功')
            goback()
          })
      )
    }
  }

  // default callback
  return () => undefined
}
