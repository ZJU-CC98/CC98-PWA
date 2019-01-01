import React, { useState } from 'react'

import useFetcher from '@/hooks/useFetcher'

import { IconButton, Menu, MenuItem, ListItemIcon, Typography } from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShareIcon from '@material-ui/icons/Share'

import snackbar from '@/utils/snackbar'
import { ITopic } from '@cc98/api'

import { getTopicFavorite } from '@/services/topic'
import { favoriteHandler } from '@/services/utils/errorHandler'
import { FavoriteTopic } from '@/services/post'

import copy2Clipboard from 'copy-to-clipboard'

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

  const handleShare = () => {
    if (document.location) {
      copy2Clipboard(`https://${document.location.host}/topic/${topicInfo.id}`)
    }
    snackbar.success('分享链接已经成功复制到剪切板')
    handleClose()
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
        <MenuItem
          onClick={() => {
            handleShare()
          }}
        >
          <ListItemIcon>
            <ShareIcon />
          </ListItemIcon>
          <Typography>分享链接</Typography>
        </MenuItem>
      </Menu>
    </>
  )
}
