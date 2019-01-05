import React, { useRef } from 'react'

import styled from 'styled-components'
import { DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core'

import ReactCropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'

import { updateMyAvatar } from '@/services/user'

const DialogTitleS = styled(DialogTitle)`
  && {
    padding: 12px;
  }
`

const FlexDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`

interface Props {
  imgSrc: string
  /**
   * 文件类型
   */
  fileType: string
  handleAvatarSubmit: (AvatarSrc: string) => void
  handleClose: () => void
}

export default ({ imgSrc, handleAvatarSubmit, handleClose, fileType }: Props) => {
  // 版本低，不兼容
  // tslint:disable
  const cropRef = useRef<any>(null)

  const submitHandle = () => {
    if (!cropRef.current) {
      return
    }

    const avatarCanvas: HTMLCanvasElement = cropRef.current.getCroppedCanvas()
    avatarCanvas.toBlob(
      async result => {
        if (result) {
          const name: string = `头像.${fileType.slice(fileType.indexOf('/'), fileType.length)}`
          const file: File = new File([result], name, { type: fileType })

          const res = await updateMyAvatar(file)
          res.fail().succeed(data => {
            handleAvatarSubmit(data[0])
            handleClose()
          })
        }
      },
      fileType,
      0.75
    )
  }

  return (
    <>
      <DialogTitleS>本地头像</DialogTitleS>
      <DialogContent>
        <FlexDiv>
          <ReactCropper
            viewMode={2}
            src={imgSrc}
            style={{ height: 300, width: '100%' }}
            aspectRatio={1 / 1}
            zoomable
            ref={cropRef}
          />
        </FlexDiv>
      </DialogContent>
      <DialogActions>
        <Button onClick={submitHandle} color="primary">
          提交
        </Button>
      </DialogActions>
    </>
  )
}
