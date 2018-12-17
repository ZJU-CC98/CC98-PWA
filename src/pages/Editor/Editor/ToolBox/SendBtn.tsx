import React from 'react'

import { IconButton } from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'

interface Props {
  onSendCallback: () => void
}

export default ({ onSendCallback }: Props) => {
  function clickHandler() {
    onSendCallback()
  }

  return (
    <IconButton>
      <SendIcon onClick={clickHandler} />
    </IconButton>
  )
}
