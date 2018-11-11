import { IconButton, Snackbar, SnackbarContent } from '@material-ui/core'
import Autorenew from '@material-ui/icons/Autorenew'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import CloseIcon from '@material-ui/icons/Close'
import ErrorIcon from '@material-ui/icons/Error'
import InfoIcon from '@material-ui/icons/Info'
import { css } from 'emotion'
import React from 'react'
type CloseEvent = (
  // tslint:disable-next-line:no-any
  event: React.SyntheticEvent<any>,
  reason: string
) => void

interface Props {
  open: boolean
  content: string
  duration: number
  type?: 'success' | 'error' | 'loading' | 'info'
  handleClose: CloseEvent
  onExited: () => void
}
const variantIcon = {
  success: CheckCircleIcon,
  loading: Autorenew,
  error: ErrorIcon,
  info: InfoIcon,
}
const variantStyle = {
  golbal: css`
    margin-right: 10px;
    font-size: 10px;
  `,
  success: css`
    background-color: #43a047 !important;
  `,
  loading: css`
    background-color: #ffa000 !important;
  `,
  error: css`
    background-color: #d32f2f !important;
  `,
  info: css`
    background-color: #1976d2 !important;
  `,
}
const message = css`
  display: flex;
  align-items: center;
  font-size: 15px;
`
const ToastBox = ({ open, content, duration, type, handleClose, onExited }: Props) => {
  const variant = type ? type : 'success'
  const Icon = variantIcon[variant]

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      open={open}
      autoHideDuration={duration}
      onClose={handleClose}
      onExited={() => {
        onExited()
      }}
    >
      <SnackbarContent
        key={'toast'}
        className={variantStyle[variant]}
        message={
          <span id="client-snackbar" className={message}>
            <Icon className={`${variantStyle[variant]} ${variantStyle.golbal}`} />
            {content}
          </span>}
        // TODO: 撤销选项
        // action={[
        //  <Button key="undo" color="secondary" size="small" onClick={this.handleClose}>
        //    UNDO
        //  </Button>,
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={() => {
              handleClose()
            }}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </Snackbar>
  )
}

export default ToastBox
