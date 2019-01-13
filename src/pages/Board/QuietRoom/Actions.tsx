import React, { useState } from 'react'
import styled from 'styled-components'

import { IconButton, Menu, MenuItem } from '@material-ui/core'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import { cancelStopPost } from '@/services/manage'
import snackbar from '@/utils/snackbar'
import { manageHandler } from '@/services/utils/errorHandler'

const IconButtonS = styled(IconButton)`
  && {
    padding-top: 24px;
    padding-bottom: 0;
  }
`

interface Props {
  /**
   * 版面 id
   */
  boardId: number
  /**
   * 用户 id
   */
  userId: number
  /**
   * 刷新列表
   */
  refreshFunc: () => void
  /**
   * 判断能否解除TP
   */
  canManage: boolean
}

const Actions: React.FC<Props> = ({ boardId, userId, refreshFunc, canManage }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const submit = async () => {
    const res = await cancelStopPost(boardId, userId)

    if (!res) {
      return
    }
    res.fail(manageHandler).succeed(() => {
      snackbar.success('操作成功')
      setAnchorEl(null)
      refreshFunc()
    })
  }

  return (
    <>
      <IconButtonS onClick={handleOpen}>
        <ExpandMoreIcon />
      </IconButtonS>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {canManage && <MenuItem onClick={submit}>解除TP</MenuItem>}
      </Menu>
    </>
  )
}

export default Actions
