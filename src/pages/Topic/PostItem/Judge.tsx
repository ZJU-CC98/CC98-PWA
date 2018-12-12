import React from 'react'

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tab,
  Tabs,
  TextField,
} from '@material-ui/core'
import blue from '@material-ui/core/colors/blue'
import { StyleRules, withStyles } from '@material-ui/core/styles'

import { PUT } from '@/utils/fetch'
import { IPost } from '@cc98/api'
import { ClassNameMap } from '@material-ui/core/styles/withStyles'

const styles: StyleRules = {
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
  tabRoot: {
    flexGrow: 1,
  },
}
interface Props {
  currentPost: IPost
  handleClose: () => void
  refresh: () => void
  classes: ClassNameMap
}
interface State {
  value: number
  text: string
}

export default withStyles(styles)(
  class extends React.Component<Props, State> {
    state: State = {
      value: 1,
      text: '',
    }
    // tslint:disable-next-line:no-any
    handleChange = (event: any, value: number) => {
      this.setState({ value })
    }
    onClose = () => this.props.handleClose()
    // tslint:disable-next-line:no-any
    handleTextChange = (event: any) => {
      this.setState({ text: event.target.value })
    }
    submit = async () => {
      const { currentPost, handleClose, refresh } = this.props
      const url = `/post/${currentPost.id}/rating`
      const request = await PUT(url, {
        params: {
          value: this.state.value,
          reason: this.state.text,
        },
      })
      // TODO: 错误的五种or更多情况下的toast提示
      request.fail().succeed(() => {
        handleClose()
        refresh()
        // this.props.refreshItem({
        //   id: this.props.currentPost.id,
        //   reason: this.state.text,
        //   content: this.state.value === 1 ? '风评值+1' : '风评值-1',
        // })
      })
    }

    render() {
      const { classes, ...other } = this.props
      const { value } = this.state

      return (
        <Dialog
          open={true}
          onClose={this.onClose}
          aria-labelledby="simple-dialog-title"
          {...other}
          style={{ zIndex: 1010 }}
        >
          <DialogTitle id="form-dialog-title">评分</DialogTitle>
          <DialogContent>
            <DialogContentText>评分需要发帖数达到500以上，您每天有一次评分机会。</DialogContentText>
            <Tabs value={value} onChange={this.handleChange}>
              <Tab value={1} classes={{ root: classes.tabRoot }} label="+1" />
              <Tab value={-1} classes={{ root: classes.tabRoot }} label="-1" />
            </Tabs>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="请输入理由"
              type="email"
              fullWidth
              onChange={this.handleTextChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.onClose} color="primary">
              取消
            </Button>
            <Button onClick={this.submit} color="primary">
              提交
            </Button>
          </DialogActions>
        </Dialog>
      )
    }
  }
)