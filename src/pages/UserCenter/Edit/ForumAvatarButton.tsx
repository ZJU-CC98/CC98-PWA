import React, { useState } from 'react'
import styled from 'styled-components'

import { Button, Dialog } from '@material-ui/core'

import ForumAvatarBox from './ForumAvatarBox'

interface Props {
  handleAvatarSubmit: (AvatarSrc: string) => void
}

const SubmitButton = styled(Button).attrs({
  variant: 'contained',
})`
  && {
    margin: 8px;
    padding: 5px;
  }
`

export default ({ handleAvatarSubmit }: Props) => {
  const [open, setOpen] = useState(false)
  const handleClose = () => {
    setOpen(false)
  }

  function clickHandler() {
    setOpen(!open)
  }

  return (
    <>
      <SubmitButton onClick={clickHandler}>选择论坛头像</SubmitButton>
      <Dialog open={open} onClose={handleClose} fullWidth scroll="paper">
        <ForumAvatarBox handleClose={handleClose} handleAvatarSubmit={handleAvatarSubmit} />
      </Dialog>
    </>
  )
}
