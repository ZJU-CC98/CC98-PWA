import React from 'react'

import { EditorContainer } from '@/containers/editor'

import { IconButton } from '@material-ui/core'
import TagFacesIcon from '@material-ui/icons/TagFaces'

interface Props {
  editor: EditorContainer
}

export default ({ editor }: Props) => {
  function clickHandler() {
    // TODO:
  }

  return (
    <IconButton>
      <TagFacesIcon onClick={clickHandler} />
    </IconButton>
  )
}
