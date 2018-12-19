import React, { useState } from 'react'

import { IconButton } from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'
import CircularProgress from '@material-ui/core/CircularProgress'

interface Props {
  onSendCallback: () => void
}

export default ({ onSendCallback }: Props) => {
  const [buttonDisable, setDisable] = useState<boolean>(false)
  function clickHandler() {
    setDisable(true)
    onSendCallback()
  }

  return (
    <IconButton disabled={buttonDisable}>
      {!buttonDisable && <SendIcon onClick={clickHandler} />}
      {buttonDisable && <CircularProgress size={30} />}
    </IconButton>
  )
}
