import React, { useState } from 'react'

import { EditorContainer } from '../EditorContainer'

import { IconButton, Dialog } from '@material-ui/core'
import TagFacesIcon from '@material-ui/icons/TagFaces'

import StickerBox from './StickerBox'

interface Props {
  editor: EditorContainer
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
    <IconButton>
      <TagFacesIcon onClick={clickHandler} />
      <Dialog open={open} onClose={handleClose} fullWidth scroll="paper">
        <StickerBox editor={editor} handleClose={handleClose} />
      </Dialog>
    </IconButton>
  )
}
