import React from 'react'

import { EditorContainer } from '@/containers/editor'

import { IconButton } from '@material-ui/core'
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate'

import { uploadPicture } from '@/services/editor'

interface Props {
  editor: EditorContainer
}

export default ({ editor }: Props) => {
  function clickHandler() {
    uploadPicture().then(res =>
      res.fail().succeed(picURL => {
        editor.attachAttachment(`[img]${picURL}[/img]`)
      })
    )
  }

  return (
    <IconButton>
      <AddPhotoAlternateIcon onClick={clickHandler} />
    </IconButton>
  )
}
