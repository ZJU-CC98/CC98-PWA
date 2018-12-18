import React from 'react'

import { EditorContainer } from '../EditorContainer'

import { IconButton } from '@material-ui/core'
import TagFacesIcon from '@material-ui/icons/TagFaces'

interface Props {
  editor: EditorContainer
}

export default ({ editor }: Props) => {
  function clickHandler() {
    if (!editor.state.stickerDisplay) editor.showSticker()
    else editor.hiddenSticker()
  }

  return (
    <IconButton>
      <TagFacesIcon onClick={clickHandler} />
    </IconButton>
  )
}
