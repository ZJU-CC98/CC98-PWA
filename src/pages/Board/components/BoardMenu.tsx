import React, { useState } from 'react'

import { IconButton, Typography, Menu, MenuItem, ListItemIcon } from '@material-ui/core'

import MoreVertIcon from '@material-ui/icons/MoreVert'
import InfoIcon from '@material-ui/icons/Info'
import BlockIcon from '@material-ui/icons/Block'

import { navigate } from '@/utils/history'

interface Props {
  boardId: string | number
}

export default ({ boardId }: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const menuItem = [
    {
      key: 0,
      name: '版面事件',
      router: `/board/${boardId}/record`,
      icon: <InfoIcon />,
    },
    {
      key: 1,
      name: '小黑屋',
      router: `/board/${boardId}/quietRoom`,
      icon: <BlockIcon />,
    },
  ]

  return (
    <>
      <IconButton color="inherit" onClick={handleOpen}>
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {menuItem.map(item => (
          <MenuItem
            key={item.key}
            onClick={() => {
              navigate(item.router)
              handleClose()
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <Typography>{item.name}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}
