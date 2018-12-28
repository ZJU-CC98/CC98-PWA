import React, { useState } from 'react'

import useFetcher from '@/hooks/useFetcher'

import { IconButton, Menu, MenuItem, ListItemIcon, Typography } from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import FavoriteIcon from '@material-ui/icons/Favorite'

import snackbar from '@/utils/snackbar'
import { ITopic } from '@cc98/api'

import { getTopicFavorite } from '@/services/topic'
import { favoriteHandler } from '@/services/utils/errorHandler'
import { FavoriteTopic } from '@/services/post'

interface Props {
  /**
   * 帖子信息
   */
  topicInfo: ITopic
}

export default ({ topicInfo }: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [isFavorite, setIsFavorite] = useFetcher(() => getTopicFavorite(topicInfo.id))

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleFavorite = async () => {
    const res = await FavoriteTopic(topicInfo.id, isFavorite)
    res.fail(favoriteHandler).succeed(() => {
      isFavorite ? snackbar.success('取消收藏') : snackbar.success('收藏成功')
      setIsFavorite(!isFavorite)
    })
  }

  return (
    <>
      <IconButton onClick={handleOpen}>
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            handleFavorite()
            handleClose()
          }}
        >
          <ListItemIcon>
            <FavoriteIcon color={isFavorite ? 'secondary' : 'disabled'} />
          </ListItemIcon>
          <Typography>{isFavorite ? '取消收藏' : '收藏主题'}</Typography>
        </MenuItem>
      </Menu>
    </>
  )
}
