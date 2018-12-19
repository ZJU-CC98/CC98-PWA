import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { Snackbar } from '@material-ui/core'
import { SnackbarProps } from '@material-ui/core/Snackbar'

import MySnackbarContent from './MySnackbarContent'

// https://material-ui.com/demos/snackbars/#snackbars
// Only one snackbar may be displayed at a time.

type ISnackBar = Pick<SnackbarProps, 'autoHideDuration' | 'anchorOrigin'> & {
  message: string
  variant?: 'info' | 'success' | 'error'
}

/**
 * 指向 MySnackBar 的引用
 */
let snackBarRef!: (props: ISnackBar) => void

const MySnackBar: React.FunctionComponent = () => {
  const [open, setOpen] = useState(false)
  const handleClose = () => setOpen(false)

  const [snackBarProps, setSnackBarProps] = useState<ISnackBar>({
    message: 'NO MSG',
  })

  const pushSnackBar = (props: ISnackBar) => {
    setSnackBarProps(props)
    setOpen(true)
  }

  snackBarRef = pushSnackBar

  return (
    <Snackbar
      open={open}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      autoHideDuration={snackBarProps.autoHideDuration || 4000}
      message={snackBarProps.message}
    >
      <MySnackbarContent
        variant={snackBarProps.variant || 'info'}
        message={snackBarProps.message}
        onClose={handleClose}
      />
    </Snackbar>
  )
}

function snackbar(snackBarProps: ISnackBar) {
  snackBarRef(snackBarProps)
}

snackbar.info = (message: string) => {
  snackbar({
    variant: 'info',
    message,
  })
}

snackbar.success = (message: string) => {
  snackbar({
    variant: 'success',
    message,
  })
}

snackbar.error = (message: string) => {
  snackbar({
    variant: 'error',
    message,
  })
}

export default snackbar

// mount the Component to DOM
function renderSnackBar() {
  ReactDOM.render(<MySnackBar />, document.getElementById('snackbar'))
}
renderSnackBar()
