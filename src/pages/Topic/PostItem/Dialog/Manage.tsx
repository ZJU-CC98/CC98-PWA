import React, { useState } from 'react'
import styled from 'styled-components'

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Select,
  CircularProgress,
  MenuItem,
  TextField,
} from '@material-ui/core'

import { manageHandler } from '@/services/utils/errorHandler'
import {
  operateWealth,
  deletePost,
  stopPost,
  cancelStopPost,
  operatePrestige,
} from '@/services/manage'

import { IPost } from '@cc98/api'
import snackbar from '@/utils/snackbar'

const TextFieldS = styled(TextField).attrs({
  fullWidth: true,
})`
  && {
    margin-top: 16px;
  }
` as typeof TextField

const ButtonProgress = styled(CircularProgress).attrs({
  size: 20,
  color: 'secondary',
})``

interface Props {
  /**
   * 帖子信息
   */
  postInfo: IPost
  /**
   * 可管理
   */
  isManager: boolean
  /**
   * 关闭 Dialog
   */
  handleClose: () => void
  /**
   * 更新 postInfo
   */
  refreshPost: () => void
}

interface SubmitState {
  loading: boolean
  submitFail: boolean
}

const Manage: React.FC<Props> = ({ postInfo, isManager, handleClose, refreshPost }) => {
  const [point, setPoint] = useState(-1)
  const [submitState, setSubmitState] = useState<SubmitState>({
    loading: false,
    submitFail: false,
  })

  const handlePointChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const point = parseInt(event.target.value, 10)
    setPoint(point)
  }

  const [value, setValue] = useState(0)
  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(parseInt(event.target.value, 10))
  }

  const [reason, setReason] = useState('')
  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReason(event.target.value)
  }

  const submit = async () => {
    setSubmitState({
      loading: true,
      submitFail: false,
    })
    let res = null
    switch (point) {
      case 0:
        res = await operateWealth(postInfo.id, value, reason, 0)
        break
      case 1:
        res = await operateWealth(postInfo.id, value, reason, 1)
        break
      case 2:
        res = await deletePost(postInfo.id, reason)
        break
      case 3:
        res = await operatePrestige(postInfo.id, value, reason, 0)
        break
      case 4:
        res = await operatePrestige(postInfo.id, value, reason, 1)
        break
      case 5:
        res = await stopPost(postInfo.id, value, reason)
        break
      case 6:
        res = await cancelStopPost(postInfo.boardId, postInfo.userId)
    }

    if (!res) {
      return
    }

    res
      .fail(err => {
        setSubmitState({
          loading: false,
          submitFail: true,
        })
        manageHandler(err)
      })
      .succeed(() => {
        setSubmitState({
          loading: false,
          submitFail: false,
        })
        snackbar.success('操作成功')
        handleClose()
        refreshPost()
      })
  }

  const { submitFail, loading } = submitState

  return (
    <Dialog open={true} onClose={handleClose} style={{ zIndex: 1010 }}>
      <DialogTitle>管理</DialogTitle>
      <DialogContent>
        <Select value={point} onChange={handlePointChange}>
          <MenuItem key={0} value={-1} />
          <MenuItem key={1} value={0}>
            奖励财富值
          </MenuItem>
          <MenuItem key={2} value={1}>
            扣除财富值
          </MenuItem>
          <MenuItem key={3} value={2}>
            删除
          </MenuItem>
          {isManager && (
            <MenuItem key={4} value={3}>
              奖励威望
            </MenuItem>
          )}
          {isManager && (
            <MenuItem key={5} value={4}>
              扣除威望
            </MenuItem>
          )}
          <MenuItem key={6} value={5}>
            TP
          </MenuItem>
          <MenuItem key={7} value={6}>
            解除TP
          </MenuItem>
        </Select>
        {(point === 0 || point === 1 || point === 3 || point === 4 || point === 5) && (
          <TextFieldS label="请输入数量" onChange={handleValueChange} />
        )}
        {point !== 6 && <TextFieldS label="请输入理由" onChange={handleTextChange} />}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          取消
        </Button>
        <Button color="primary" disabled={loading} onClick={submit}>
          {submitFail ? '重试' : '提交'}
          {loading && <ButtonProgress />}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default Manage
