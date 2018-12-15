import React from 'react'

import { EditorContainer } from '@/containers/editor'

import { IconButton } from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'

interface Props {
  editor: EditorContainer
}

export default ({ editor }: Props) => {
  function clickHandler() {
    editor.state.onSendCallBack(editor.fullContent)
  }

  return (
    <IconButton>
      <SendIcon onClick={clickHandler} />
    </IconButton>
  )
}
