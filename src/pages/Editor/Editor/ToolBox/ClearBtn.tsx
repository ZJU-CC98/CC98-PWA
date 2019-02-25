import React, { useState } from 'react'

import { EditorContainer } from '../EditorContainer'

import {
  IconButton,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'

interface Props {
  editor: EditorContainer
}

export default ({ editor }: Props) => {
  const [open, setOpen] = useState(false)
  const handleClose = () => {
    setOpen(false)
  }

  const handlerComfirm = () => {
    editor.clearAll()
    handleClose()
  }

  function clickHandler() {
    setOpen(true)
  }

  return (
    <IconButton onClick={clickHandler}>
      <DeleteIcon />
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <DialogContentText>确认要清空已输入的内容吗？</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            取消
          </Button>
          <Button onClick={handlerComfirm} color="primary">
            确认
          </Button>
        </DialogActions>
      </Dialog>
    </IconButton>
  )
}
