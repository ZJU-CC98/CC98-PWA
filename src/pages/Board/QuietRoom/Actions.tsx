import React, { useState } from 'react'
import styled from 'styled-components'


import { IconButton, Menu, MenuItem } from '@material-ui/core'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

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
  boardId: number | string
  /**
   * 用户 id
   */
  userId: number
}

const Actions: React.FC<Props> = ({ boardId, userId }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleCancle = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <IconButtonS onClick={handleOpen}>
        <ExpandMoreIcon />
      </IconButtonS>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleCancle}>解除TP</MenuItem>
      </Menu>
    </>
  )
}

export default Actions
