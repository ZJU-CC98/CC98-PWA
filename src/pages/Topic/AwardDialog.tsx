import React, { useState } from 'react'

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
import { ClassNameMap } from '@material-ui/core/styles/withStyles'
import toast from '../Compose/Toast'
import { rate } from '@/services/post'
import { IPost } from '@cc98/api'

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
  onClose: () => void
  open: boolean
  currentPost: IPost
  classes: ClassNameMap
  callback: (data: { id: number; content: string; reason: string }) => void
}

export default withStyles(styles)((props: Props) => {
  const [value, setValue] = useState(1)
  const [reason, setReason] = useState('')
  const handleClose = () => {
    props.onClose()
  }
  // tslint:disable-next-line:no-any
  const handleChange = (event: any, value: number) => setValue(value)

  // tslint:disable-next-line:no-any
  const handleTextChange = (event: any) => setReason(event.target.value)
  const submit = async () => {
    const { currentPost } = this.props
    const request = await rate(currentPost.id, value, reason)
    request
      .fail(fetchError => {
        if (fetchError.msg === 'cannot_rate_yourself') {
          toast.error({ content: '您不能给自己评分' })
        } else if (fetchError.msg === 'has_rated_tody') {
          toast.error({ content: '您今天已经评过分了，请明天再来' })
        } else if (fetchError.msg === 'you_cannot_rate') {
          toast.error({ content: '您发帖还不足500，不能评分' })
        } else if (fetchError.msg === 'has_rated_this_post') {
          toast.error({ content: '您已经给这个贴评过分了' })
        } else if (fetchError.msg === 'post_user_not_exists') {
          toast.error({ content: '这个回复的账号已经不存在了' })
        }
      })
      .succeed(() => {
        this.props.onClose()
        this.props.callback({
          id: this.props.currentPost.id,
          reason: this.state.text,
          content: this.state.value === 1 ? '风评值+1' : '风评值-1',
        })
      })
  }
  const { onClose, open, classes, ...other } = props

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="simple-dialog-title"
      {...other}
      style={{ zIndex: 1010 }}
    >
      <DialogTitle id="form-dialog-title">评分</DialogTitle>
      <DialogContent>
        <DialogContentText>评分需要发帖数达到500以上，您每天有一次评分机会。</DialogContentText>
        <Tabs value={value} onChange={handleChange}>
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
          onChange={handleTextChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          取消
        </Button>
        <Button onClick={submit} color="primary">
          提交
        </Button>
      </DialogActions>
    </Dialog>
  )
})
