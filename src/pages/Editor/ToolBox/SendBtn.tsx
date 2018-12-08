import React from 'react'

import { EditorContainer } from '@/containers/editor'

import { IconButton } from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'

interface Props {
  editor: EditorContainer
}

export default ({ editor }: Props) => {
  function clickHandler() {
    let attachments = editor.state.attachments.join('')
    if (attachments) {
      attachments = `'\n${attachments}`
    }

    editor.state.onSendCallBack(editor.state.mainContent + attachments)
  }

  return (
    <IconButton>
      <SendIcon onClick={clickHandler} />
    </IconButton>
  )
}
