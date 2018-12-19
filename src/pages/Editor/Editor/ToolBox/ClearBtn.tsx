import React from 'react'

import { EditorContainer } from '../EditorContainer'

import { IconButton } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import snackbar from '@/utils/snackbar'
interface Props {
  editor: EditorContainer
}

export default ({ editor }: Props) => {
  function clickHandler() {
    snackbar({
      message: '清空输入的内容？',
      variant: 'info',
      customButton: '确认',
      callback: () => editor.clearAll(),
    })
  }

  return (
    <IconButton>
      <DeleteIcon onClick={clickHandler} />
    </IconButton>
  )
}
