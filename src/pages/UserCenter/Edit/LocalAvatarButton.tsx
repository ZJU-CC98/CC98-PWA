import React, { useState, useRef } from 'react'

import { Dialog, Button } from '@material-ui/core'

import LocalAvatarBox from './LocalAvatarBox'

import snackbar from '@/utils/snackbar'

interface Props {
  handleAvatarSubmit: (avatarSrc: string) => void
}

export default ({ handleAvatarSubmit }: Props) => {
  const [open, setOpen] = useState(false)
  const [img, setImg] = useState({ imgSrc: '', fileType: '' })
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleClose = () => {
    setOpen(false)
  }

  const clickHandler = () => {
    if (!fileInputRef.current) {
      return
    }

    fileInputRef.current.click()
  }

  async function choosePicFinish(file: File) {
    if (!file) return
    if (!file.type.match('image.*')) {
      snackbar.error('请选择图片文件')

      return
    }
    setImg({ ...img, fileType: file.type })
    const render = new FileReader()

    render.readAsDataURL(file)
    render.onload = _ => {
      setImg({ ...img, imgSrc: render.result as string })
      setOpen(!open)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files: FileList | null = e.target.files
    if (files) {
      choosePicFinish(files[0])
    }
  }

  return (
    <>
      <Button onClick={clickHandler}>更换本地头像</Button>
      <input
        style={{ display: 'none' }}
        type="file"
        name="file"
        onChange={e => {
          handleInputChange(e)
          e.target.value = ''
        }}
        ref={fileInputRef}
        accept="image/*"
      />
      <Dialog open={open} onClose={handleClose} fullWidth scroll="paper">
        <LocalAvatarBox
          imgSrc={img.imgSrc}
          handleAvatarSubmit={handleAvatarSubmit}
          handleClose={handleClose}
          fileType={img.fileType}
        />
      </Dialog>
    </>
  )
}
