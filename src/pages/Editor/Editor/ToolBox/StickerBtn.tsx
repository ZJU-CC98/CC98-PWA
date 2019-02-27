import React, { useState } from 'react'

import { EditorModel } from '../EditorModel'

import { IconButton, Dialog } from '@material-ui/core'
import TagFacesIcon from '@material-ui/icons/TagFaces'

import StickerBox from './StickerBox'

interface Props {
  editor: EditorModel
}

export default ({ editor }: Props) => {
  const [open, setOpen] = useState(false)
  const handleClose = () => {
    setOpen(false)
  }

  function clickHandler() {
    setOpen(!open)
  }

  return (
    <>
      <IconButton onClick={clickHandler}>
        <TagFacesIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose} fullWidth scroll="paper">
        <StickerBox editor={editor} handleClose={handleClose} />
      </Dialog>
    </>
  )
}
