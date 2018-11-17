import React from 'react'
import Toast from './toast'
import { NotifFnData } from './type'
interface State {
  open: boolean
  messageInfo?: NotifFnData
}
class ConsecutiveSnackbars extends React.Component<{}, State> {
  queue: NotifFnData[] = []

  state: State = {
    open: false,
  }

  addNotice = (w: NotifFnData) => {
    this.queue.push(w)
    // console.log(this.state.open)
    if (this.state.open) {
      // immediately begin dismissing current message
      // to start showing new one
      this.setState({ open: false })
    } else {
      this.processQueue()
    }
  }

  processQueue = () => {
    if (this.queue.length > 0) {
      this.setState({
        messageInfo: this.queue.shift(),
        open: true,
      })
    }
  }

  // tslint:disable-next-line:no-any
  handleClose = (event: React.SyntheticEvent<any>, reason: string) => {
    if (reason === 'clickaway') {
      return
    }
    this.setState({ open: false })
  }

  handleExited = () => {
    const { messageInfo } = this.state
    if (messageInfo && messageInfo.onClose) messageInfo.onClose()
    this.processQueue()
  }

  render() {
    if (this.state.messageInfo) {
      const messageInfo = this.state.messageInfo
      const duration = messageInfo.duration ? messageInfo.duration : 5000

      return (
        <Toast
          open={this.state.open}
          content={messageInfo.content}
          handleClose={this.handleClose}
          onExited={this.handleExited}
          duration={duration}
          type={messageInfo.type}
        />
      )
    }

    return <></>
  }
}

export default ConsecutiveSnackbars
