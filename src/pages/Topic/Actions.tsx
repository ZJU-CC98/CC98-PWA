import React, { useState } from 'react'

import useFetcher from '@/hooks/useFetcher'

import { IconButton, Menu, MenuItem, ListItemIcon, Typography } from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'

import snackbar from '@/utils/snackbar'
import { ITopic } from '@cc98/api'

import { getTopicFavorite } from '@/services/topic'
import { favoriteHandler } from '@/services/utils/errorHandler'
import { putFavorite, deleteFavorite } from '@/services/post'

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
    if (isFavorite) {
      const res = await deleteFavorite(topicInfo.id)
      res.fail(favoriteHandler).succeed(() => {
        snackbar.success('取消收藏')
        setIsFavorite(false)
      })
    } else {
      const res = await putFavorite(topicInfo.id)
      res.fail(favoriteHandler).succeed(() => {
        snackbar.success('收藏成功')
        setIsFavorite(true)
      })
    }
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
          {isFavorite ? (
            <>
              <ListItemIcon>
                <FavoriteIcon />
              </ListItemIcon>
              <Typography variant="inherit">取消收藏</Typography>
            </>
          ) : (
            <>
              <ListItemIcon>
                <FavoriteBorderIcon />
              </ListItemIcon>
              <Typography variant="inherit">收藏主题</Typography>
            </>
          )}
        </MenuItem>
      </Menu>
    </>
  )
}
