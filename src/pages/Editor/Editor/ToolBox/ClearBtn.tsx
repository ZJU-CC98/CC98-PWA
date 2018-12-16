import React from 'react'

import { EditorContainer } from '../EditorContainer'

import { IconButton } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'

interface Props {
  editor: EditorContainer
}

export default ({ editor }: Props) => {
  function clickHandler() {
    editor.clearAll()
  }

  return (
    <IconButton>
      <DeleteIcon onClick={clickHandler} />
    </IconButton>
  )
}
