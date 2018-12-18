import React, { useRef } from 'react'

import { EditorContainer } from '../EditorContainer'

import { IconButton } from '@material-ui/core'
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate'

import { uploadPicture } from '@/services/editor'

interface Props {
  editor: EditorContainer
}

export default ({ editor }: Props) => {
  const fileInput = useRef(null)
  function clickHandler() {
    // FIXME: 不知道怎么改
    // @ts-ignore
    fileInput.current.click()
    // uploadPicture().then(res =>
    //   res.fail().succeed(picURL => {
    //     editor.attachAttachment(`[img]${picURL}[/img]`)
    //   })
    // )
  }
  async function choosePicFinish(files: FileList | null) {
    if (!files || files.length === 0) return
    for (let i = 0; i <= files.length; i = i + 1) {
      const res = await uploadPicture(files[i])
      res.fail().succeed(data => {
        editor.attachAttachment(`[img]${data[0]}[/img]`)
      })
    }
  }

  return (
    <IconButton>
      <input
        type="file"
        name="file"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          choosePicFinish(e.target.files)
        }}
        style={{ display: 'none' }}
        ref={fileInput}
        multiple
        accept="image/*"
      />
      <AddPhotoAlternateIcon onClick={clickHandler} />
    </IconButton>
  )
}
