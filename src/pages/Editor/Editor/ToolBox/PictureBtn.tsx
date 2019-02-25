import React, { useRef } from 'react'

import { EditorContainer } from '../EditorContainer'

import { IconButton } from '@material-ui/core'
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate'

import { uploadPicture } from '@/services/editor'

interface Props {
  editor: EditorContainer
}

export default ({ editor }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  function clickHandler() {
    if (!fileInputRef.current) {
      return
    }

    fileInputRef.current.click()
  }

  async function choosePicFinish(files: FileList | null) {
    if (!files || files.length === 0) return
    for (const file of files) {
      const res = await uploadPicture(file)
      res.fail().succeed(data => {
        editor.attachAttachment(`[img]${data[0]}[/img]`)
      })
    }
  }

  return (
    <>
      <IconButton onClick={clickHandler}>
        <AddPhotoAlternateIcon />
      </IconButton>
      <input
        style={{ display: 'none' }}
        type="file"
        name="file"
        onChange={e => choosePicFinish(e.target.files)}
        ref={fileInputRef}
        multiple
        accept="image/*"
      />
    </>
  )
}
