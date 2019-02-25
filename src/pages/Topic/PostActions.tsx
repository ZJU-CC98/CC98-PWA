import React, { useState, useEffect } from 'react'

import useFetcher from '@/hooks/useFetcher'

import { IconButton, Menu, MenuItem, ListItemIcon, Typography } from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShareIcon from '@material-ui/icons/Share'
import SettingIcon from '@material-ui/icons/Settings'

import userInstace from '@/containers/user'

import snackbar from '@/utils/snackbar'
import { judgeManagerOrBoardMasters } from '@/utils/ActionsJudge'

import { ITopic } from '@cc98/api'

import { getTopicFavorite, FavoriteTopic } from '@/services/topic'
import { getBoardMastersById } from '@/services/board'

import { favoriteHandler } from '@/services/utils/errorHandler'

import Setting from './Dialog/Setting'

import copy2Clipboard from 'copy-to-clipboard'

interface Props {
  /**
   * 帖子信息
   */
  topicInfo: ITopic
  refreshFunc: () => void
}

export default ({ topicInfo, refreshFunc }: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [showSetting, setShowSetting] = useState(false)
  const [isFavorite, setIsFavorite] = useFetcher(() => getTopicFavorite(topicInfo.id))
  const [boardMasters, setBoardMasters] = useState<string[]>([])

  useEffect(() => {
    getBoardMastersById(topicInfo.boardId).then(res => setBoardMasters(res))
  }, [topicInfo.boardId])

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const settingOpen = () => {
    setShowSetting(true)
  }
  const settingClose = () => {
    setShowSetting(false)
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

  const handleSetting = () => {
    settingOpen()
    handleClose()
  }

  const myInfo = userInstace.state.myInfo
  const canManage = judgeManagerOrBoardMasters(myInfo, boardMasters)

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
        <MenuItem onClick={() => handleShare()}>
          <ListItemIcon>
            <ShareIcon />
          </ListItemIcon>
          <Typography>分享链接</Typography>
        </MenuItem>
        {canManage && (
          <MenuItem onClick={() => handleSetting()}>
            <ListItemIcon>
              <SettingIcon />
            </ListItemIcon>
            <Typography>管理主题</Typography>
          </MenuItem>
        )}
      </Menu>
      {showSetting && (
        <Setting topicInfo={topicInfo} handleClose={settingClose} refreshFunc={refreshFunc} />
      )}
    </>
  )
}
