import React, { useState } from 'react'
import styled from 'styled-components'

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

import { rateHandler } from '@/services/utils/errorHandler'

import { PUT } from '@/utils/fetch'
import { IPost } from '@cc98/api'

const TabS = styled(Tab)`
  && {
    flex-grow: 1;
  }
`

const TextFieldS = styled(TextField).attrs({
  autoFocus: true,
  fullWidth: true,
})`
  && {
    margin-top: 16px;
  }
` as typeof TextField

interface Props {
  /**
   * 帖子信息
   */
  postInfo: IPost
  /**
   * 关闭 Dialog
   */
  handleClose: () => void
  /**
   * 更新 postInfo
   */
  refreshPost: () => void
}

const Judge: React.FunctionComponent<Props> = ({ postInfo, handleClose, refreshPost }) => {
  const [point, setPoint] = useState(1)

  const handlePointChange = (_: React.ChangeEvent, value: number) => {
    setPoint(value)
  }

  const [reason, setReason] = useState('')
  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReason(event.target.value)
  }

  const submitJudge = async () => {
    const url = `/post/${postInfo.id}/rating`
    const res = await PUT(url, {
      params: {
        value: point,
        reason,
      },
    })

    res.fail(rateHandler).succeed(() => {
      handleClose()
      refreshPost()
    })
  }

  return (
    <Dialog open={true} onClose={handleClose} style={{ zIndex: 1010 }}>
      <DialogTitle>评分</DialogTitle>
      <DialogContent>
        <DialogContentText>评分需要发帖数达到500以上，您每天有一次评分机会。</DialogContentText>
        <Tabs value={point} onChange={handlePointChange}>
          <TabS label="+1" value={1} />
          <TabS label="-1" value={-1} />
        </Tabs>
        <TextFieldS label="请输入理由" onChange={handleTextChange} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          取消
        </Button>
        <Button onClick={submitJudge} color="primary">
          提交
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default Judge
