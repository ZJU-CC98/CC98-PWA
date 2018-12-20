import React, { useState } from 'react'
import styled from 'styled-components'

import { EditorContainer } from '../EditorContainer'

import {
  IconButton,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@material-ui/core'

import TransformIcon from '@material-ui/icons/Transform'

import UBB from '@/UBB'

const DialogContentTextS = styled(DialogContentText)`
  && {
    min-height: 160px;
  }
`

interface PreviewProps {
  content: string
  handleClose: () => void
}

const Preview = ({ content, handleClose }: PreviewProps) => (
  <>
    <DialogContent>
      <DialogContentTextS>
        <UBB ubbText={content || '[ 没有内容 ]'} />
      </DialogContentTextS>
    </DialogContent>
    <DialogActions>
      <Button color="primary" onClick={handleClose}>
        关闭预览
      </Button>
    </DialogActions>
  </>
)

interface Props {
  editor: EditorContainer
}

export default ({ editor }: Props) => {
  const [open, setOpen] = useState(false)
  const handleClose = () => setOpen(false)

  function clickHandler() {
    setOpen(true)
  }

  return (
    <IconButton>
      <TransformIcon onClick={clickHandler} />
      <Dialog open={open} fullWidth scroll="paper">
        <Preview content={editor.fullContent} handleClose={handleClose} />
      </Dialog>
    </IconButton>
  )
}
