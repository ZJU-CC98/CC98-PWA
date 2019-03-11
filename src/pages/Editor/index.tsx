import React, { useRef } from 'react'
import styled from 'styled-components'

import MetaInfo, { MetaInfoModel } from './MetaInfo'
import Editor, { EditorModel } from './Editor'

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
 * topicId & floor - 引用帖子
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
   * 引用楼层数
   */
  floor?: string
  /**
   * 楼层 ID
   */
  postId?: string
}

export default (props: Props) => {
  const init = useInit(props)

  const isModelInit = useRef(false)

  const editor = useRef<EditorModel | null>(null)
  const metaModel = useRef<MetaInfoModel | null>(null)

  if (init === null) {
    // init 还在获取中
    return null
  }

  if (!isModelInit.current) {
    editor.current = new EditorModel(init.editor.initContent)
    metaModel.current = new MetaInfoModel(init.metaInfo)

    isModelInit.current = true
  }

  const onSendCallback = chooseSendCallback(
    editor.current!,
    metaModel.current!,
    props,
    init.boardId !== undefined
  )

  return (
    <WrapperDiv>
      {init.boardId && <MetaInfo model={metaModel.current!} boardId={init.boardId} />}
      <Editor editor={editor.current!} onSendCallback={onSendCallback} />
    </WrapperDiv>
  )
}

/**
 * 选择合适的回调
 */
function chooseSendCallback(
  editor: EditorModel,
  metaInfo: MetaInfoModel,
  props: Props,
  isEditorTopic: boolean
): () => void {
  const { boardId, topicId, postId } = props

  const failCallback = () => {
    editor.setState({ isSending: false })
  }

  const successCallback = () => {
    editor.clearAll()
    editor.setState({ isSending: false })
    // TODO: 刷新帖子
    goback()
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
            failCallback()
          })
          .succeed(() => {
            snackbar.success('发布成功')
            successCallback()
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
            failCallback()
          })
          .succeed(() => {
            snackbar.success('回复成功')
            successCallback()
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
            failCallback()
          })
          .succeed(() => {
            snackbar.success('编辑成功')
            successCallback()
          })
      )
    }
  }

  // default callback
  return () => undefined
}
