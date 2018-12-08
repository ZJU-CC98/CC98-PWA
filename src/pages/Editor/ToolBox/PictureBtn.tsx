import React from 'react'

import { EditorContainer } from '@/containers/editor'

import { IconButton } from '@material-ui/core'
import PhotoIcon from '@material-ui/icons/Photo'

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
      <PhotoIcon onClick={clickHandler} />
    </IconButton>
  )
}
