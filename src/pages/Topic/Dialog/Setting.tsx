import React, { useState } from 'react'
import styled from 'styled-components'

import { navigate } from '@/utils/history'

import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Select,
  MenuItem,
  TextField,
  Input,
  InputLabel,
  FormControl,
} from '@material-ui/core'

import { manageHandler } from '@/services/utils/errorHandler'
import {
  deleteTopic,
  lockTopic,
  unlockTopic,
  notHot,
  deleteNotHot,
  upTopic,
  topTopic,
  deleteTopTopic,
  bestTopic,
  deleteBestTopic,
  moveTopic,
} from '@/services/manage'
import { ITopic } from '@cc98/api'
import snackbar from '@/utils/snackbar'

import MoveTopic from './MoveTopic'

const ButtonProgress = styled(CircularProgress).attrs({
  size: 20,
  color: 'secondary',
})``

const TextFieldS = styled(TextField).attrs({
  fullWidth: true,
})`
  && {
    margin-top: 16px;
  }
` as typeof TextField

interface Props {
  /**
   * 主题信息
   */
  topicInfo: ITopic
  /**
   * 关闭 Dialog
   */
  handleClose: () => void
  refreshFunc: () => void
}

interface SubmitState {
  loading: boolean
  submitFail: boolean
}

const Setting: React.FC<Props> = ({ topicInfo, handleClose, refreshFunc }) => {
  const [point, setPoint] = useState('')
  const [reason, setReason] = useState('')
  const [value, setValue] = useState(0)
  const [moveBoard, setMoveBoard] = useState<number | null>(null)

  const [submitState, setSubmitState] = useState<SubmitState>({
    loading: false,
    submitFail: false,
  })

  const handlePointChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPoint(event.target.value.toString())
  }

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(parseInt(event.target.value, 10))
  }

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReason(event.target.value)
  }

  const handleBoardChange = (boardId: number) => setMoveBoard(boardId)

  const submit = async () => {
    setSubmitState({
      loading: true,
      submitFail: false,
    })
    let res = null
    switch (point) {
      case '0':
        res = await (topicInfo.state
          ? unlockTopic(topicInfo.id, reason)
          : lockTopic(topicInfo.id, reason, value))
        break
      case '1':
        res = await (topicInfo.disableHot
          ? deleteNotHot(topicInfo.id, reason)
          : notHot(topicInfo.id, reason))
        break
      case '2':
        res = await deleteTopic(topicInfo.id, reason)
        break
      case '3':
        res = await upTopic(topicInfo.id, reason)
        break
      case '4':
        res = await (topicInfo.topState === 2
          ? deleteTopTopic(topicInfo.id, reason)
          : topTopic(topicInfo.id, reason, value, 2))
        break
      case '5':
        res = await (topicInfo.bestState
          ? deleteBestTopic(topicInfo.id, reason)
          : bestTopic(topicInfo.id, reason))
        break
      case '6':
        if (moveBoard) {
          res = await moveTopic(topicInfo.id, reason, moveBoard)
        }
        break
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
        snackbar.success('操作成功')
        handleClose()
        navigate(`/topic/${topicInfo.id}`)
        refreshFunc()
      })
  }

  const { submitFail, loading } = submitState

  return (
    <Dialog fullWidth open={true} onClose={handleClose} style={{ zIndex: 1010 }}>
      <DialogTitle>管理</DialogTitle>
      <DialogContent>
        <form>
          <FormControl fullWidth>
            <InputLabel htmlFor="setting">操作</InputLabel>
            <Select
              value={point}
              onChange={handlePointChange}
              input={<Input name="setting" id="setting" />}
            >
              <MenuItem value="" />
              <MenuItem value={0}>{topicInfo.state ? '解锁' : '锁定'}</MenuItem>
              <MenuItem value={1}>{topicInfo.disableHot ? '允许热门' : '禁止热门'}</MenuItem>
              <MenuItem value={2}>删除</MenuItem>
              <MenuItem value={3}>提升</MenuItem>
              <MenuItem value={4}>
                {/*固顶为2，全站置顶为4，其余未知，暂不做全站置顶*/}
                {!topicInfo.topState ? '固顶' : '取消固顶'}
              </MenuItem>
              <MenuItem value={5}>{topicInfo.bestState ? '解除精华' : '加精'}</MenuItem>
              <MenuItem value={6}>移动</MenuItem>
            </Select>
          </FormControl>
        </form>
        {((point === '0' && !topicInfo.state) || (point === '4' && !topicInfo.topState)) && (
          <TextFieldS label="请输入天数" onChange={handleValueChange} />
        )}
        {point !== '6' ? (
          <TextFieldS label="请输入理由" onChange={handleTextChange} />
        ) : (
          <>
            <TextFieldS label="请输入理由" onChange={handleTextChange} />
            <MoveTopic handleBoardChange={boardId => handleBoardChange(boardId)} />
          </>
        )}
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

export default Setting
