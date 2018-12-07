import React from 'react'

import { EditorContainer } from '@/containers/editor'

import { IconButton } from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'

import { EditorGlobal } from '@/global/editor'

interface Props {
  editor: EditorContainer
}

export default ({ editor }: Props) => {
  function clickHandler() {
    const content = `${editor.state.mainContent}\n${editor.state.attachments.join('')}`

    EditorGlobal.onSendCallBack(content)
  }

  return (
    <IconButton>
      <SendIcon onClick={clickHandler} />
    </IconButton>
  )
}
