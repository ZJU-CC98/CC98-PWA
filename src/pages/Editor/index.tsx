import React from 'react'
import styled from 'styled-components'

import MetaInfo from './MetaInfo'
import Editor, { EditorContainer } from './Editor'

const WrapperDiv = styled.div`
  margin: 8px 12px;
`

interface Props {
  /**
   * 发布帖子
   */
  boardId?: string
  /**
   * 回复帖子
   */
  topicId?: string
  /**
   * 编辑帖子
   */
  postId?: string
}

export default (props: Props) => {
  const { boardId, topicId, postId } = props

  const editor = new EditorContainer()

  const onSendCallback = () => {
    alert(editor.fullContent)
  }

  return (
    <WrapperDiv>
      <MetaInfo />
      <Editor editor={editor} onSendCallback={onSendCallback} />
    </WrapperDiv>
  )
}
