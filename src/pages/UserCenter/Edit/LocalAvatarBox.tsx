import React, { useState, useRef } from 'react'

import styled from 'styled-components'
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
} from '@material-ui/core'

import ReactCropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'

import { updateMyAvatar } from '@/services/user'

const CircularProgressS = styled(CircularProgress)`
  && {
    margin-right: 24px;
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
  handleAvatarSubmit: (avatarSrc: string) => void
  handleClose: () => void
}

export default ({ imgSrc, handleAvatarSubmit, handleClose, fileType }: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  // tslint:disable
  const cropRef = useRef<any>(null)

  const submitHandle = () => {
    if (!cropRef.current) {
      return
    }

    setIsLoading(true)
    const avatarCanvas: HTMLCanvasElement = cropRef.current.getCroppedCanvas()
    avatarCanvas.toBlob(
      async result => {
        if (result) {
          const name: string = `头像.${fileType.slice(fileType.indexOf('/'), fileType.length)}`
          const file: File = new File([result], name, { type: fileType })

          const res = await updateMyAvatar(file)
          res
            .fail(() => setIsLoading(false))
            .succeed(data => {
              handleAvatarSubmit(data[0])
              setIsLoading(false)
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
      <DialogTitle>本地头像</DialogTitle>
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
        {isLoading ? (
          <CircularProgressS size={20} />
        ) : (
          <Button onClick={submitHandle} color="primary">
            提交
          </Button>
        )}
      </DialogActions>
    </>
  )
}
