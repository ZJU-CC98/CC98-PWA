import React, { useState, useRef } from 'react'

import styled from 'styled-components'
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
} from '@material-ui/core'

import ReactCropper, { Cropper } from './ReactCropper'
import 'cropperjs/dist/cropper.css'

import { updateMyAvatar } from '@/services/user'
import snackbar from '@/utils/snackbar'

const FlexDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`

interface Props {
  imgSrc: string
  uploadAvatorCallback: (avatarSrc: string) => void
}

export default ({ imgSrc, uploadAvatorCallback }: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const cropRef = useRef<{
    getCropper: () => Cropper
  }>(null)

  const submitHandle = () => {
    if (!cropRef.current) {
      return
    }
    const cropper = cropRef.current.getCropper()

    setIsLoading(true)
    const canvas = cropper.getCroppedCanvas()
    const blobCallback = (blob: Blob | null) => {
      if (!blob) {
        return
      }

      const file = new File([blob], 'user-avatar')

      updateMyAvatar(file).then(res =>
        res
          .fail(_ => {
            snackbar.error('上传头像失败')
            setIsLoading(false)
          })
          .succeed(data => {
            uploadAvatorCallback(data[0])
            setIsLoading(false)
          })
      )
    }

    canvas.toBlob(blobCallback)
  }

  return (
    <>
      <DialogTitle>本地头像</DialogTitle>
      <DialogContent>
        <FlexDiv>
          <ReactCropper style={{ height: 300, width: '100%' }} src={imgSrc} ref={cropRef} />
        </FlexDiv>
      </DialogContent>
      <DialogActions>
        <Button onClick={submitHandle} color="primary">
          {isLoading ? <CircularProgress size={24} /> : '提交'}
        </Button>
      </DialogActions>
    </>
  )
}
