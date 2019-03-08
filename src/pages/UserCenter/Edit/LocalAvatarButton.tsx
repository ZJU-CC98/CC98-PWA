import React, { useState, useRef } from 'react'

import { Dialog, Button } from '@material-ui/core'

const LocalAvatarBox = React.lazy(() => import('./LocalAvatarBox'))

import snackbar from '@/utils/snackbar'

interface Props {
  handleAvatarSubmit: (avatarSrc: string) => void
}

export default ({ handleAvatarSubmit }: Props) => {
  const [open, setOpen] = useState(false)
  const [imgSrc, setImgSrc] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleClose = () => {
    setOpen(false)
  }

  const uploadAvatorCallback = (avatorSrc: string) => {
    handleAvatarSubmit(avatorSrc)
    handleClose()
  }

  const clickHandler = () => {
    fileInputRef.current && fileInputRef.current.click()
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) {
      return
    }
    const file = files[0]
    if (!file.type.match('image.*')) {
      snackbar.error('请选择图片文件')
      return
    }

    const render = new FileReader()

    render.readAsDataURL(file)
    render.onload = _ => {
      if (!render.result) {
        return
      }
      setImgSrc(render.result as string)
      setOpen(true)
    }
  }

  return (
    <>
      <Button onClick={clickHandler}>更换本地头像</Button>
      <input
        style={{ display: 'none' }}
        type="file"
        onChange={onChange}
        ref={fileInputRef}
        accept="image/*"
      />
      <React.Suspense fallback={null}>
        <Dialog open={open} onClose={handleClose} fullWidth scroll="paper">
          <LocalAvatarBox imgSrc={imgSrc} uploadAvatorCallback={uploadAvatorCallback} />
        </Dialog>
      </React.Suspense>
    </>
  )
}
