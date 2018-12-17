import React, { useState } from 'react'
import styled from 'styled-components'

import { EditorContainer } from '../EditorContainer'

import { IconButton, Dialog, Typography } from '@material-ui/core'
import TransformIcon from '@material-ui/icons/Transform'
import CloseIcon from '@material-ui/icons/Close'

import UBB from '@/UBB'

const PreviewHeader = styled.div`
  position: fixed;
  right: 16px;
  bottom: 12px;
`

const PreviewBody = styled(Typography).attrs({
  component: 'div',
})`
  && {
    margin: 44px 20px;
    margin-bottom: 60px;
  }
`

interface PreviewProps {
  content: string
  handleClose: () => void
}

const Preview = ({ content, handleClose }: PreviewProps) => (
  <>
    <PreviewHeader>
      <IconButton color="primary" onClick={handleClose}>
        <CloseIcon />
      </IconButton>
    </PreviewHeader>
    <PreviewBody>{UBB(content)}</PreviewBody>
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
      <Dialog fullScreen open={open}>
        <Preview content={editor.fullContent} handleClose={handleClose} />
      </Dialog>
    </IconButton>
  )
}
