import React, { useState } from 'react'

import { Button, Dialog } from '@material-ui/core'

import ForumAvatarBox from './ForumAvatarBox'

interface Props {
  handleAvatarSubmit: (AvatarSrc: string) => void
}

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
      <Button onClick={clickHandler}>更换论坛头像</Button>
      <Dialog open={open} onClose={handleClose} fullWidth scroll="paper">
        <ForumAvatarBox handleClose={handleClose} handleAvatarSubmit={handleAvatarSubmit} />
      </Dialog>
    </>
  )
}
