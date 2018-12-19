import React, { useState } from 'react'
import styled from 'styled-components'

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tab,
  Tabs,
  TextField,
} from '@material-ui/core'

import { manageHandler } from '@/services/utils/errorHandler'
import { operateWealth, deletePost, stopPost, cancelStopPost } from '@/services/manage'
import { IPost } from '@cc98/api'
import snackbar from '@/utils/snackbar'

const TabS = styled(Tab)`
  && {
    flex-grow: 1;
  }
`

const TextFieldS = styled(TextField).attrs({
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

const Manage: React.FunctionComponent<Props> = ({ postInfo, handleClose, refreshPost }) => {
  const [point, setPoint] = useState(0)
  const handlePointChange = (_: React.ChangeEvent, value: number) => {
    setPoint(value)
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
        res = await stopPost(postInfo.id, value, reason)
        break
      case 4:
        res = await cancelStopPost(postInfo.boardId, postInfo.userId)
        break
    }

    if (!res) {
      return
    }

    res.fail(manageHandler).succeed(() => {
      snackbar.success('操作成功')
      handleClose()
      refreshPost()
    })
  }

  return (
    <Dialog open={true} onClose={handleClose} style={{ zIndex: 1010 }}>
      <DialogTitle>管理</DialogTitle>
      <DialogContent>
        <Tabs value={point} onChange={handlePointChange} scrollable>
          <TabS label="奖励" value={0} />
          <TabS label="惩罚" value={1} />
          <TabS label="删除" value={2} />
          <TabS label="TP" value={3} />
          <TabS label="解除TP" value={4} />
        </Tabs>
        {(point === 0 || point === 1 || point === 3) && (
          <TextFieldS label="请输入数量" onChange={handleValueChange} />
        )}
        <TextFieldS label="请输入理由" onChange={handleTextChange} />
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
}

export default Manage
