import React from 'react'

import { IconButton, CircularProgress } from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'

import { EditorContainer } from '../EditorContainer'

interface Props {
  editor: EditorContainer
  onSendCallback: () => void
}

export default ({ editor, onSendCallback }: Props) => {
  function clickHandler() {
    editor.setState({ isSending: true })
    onSendCallback()
  }

  return (
    <IconButton onClick={clickHandler}>
      {!editor.state.isSending && <SendIcon />}
      {editor.state.isSending && <CircularProgress size={24} />}
    </IconButton>
  )
}
