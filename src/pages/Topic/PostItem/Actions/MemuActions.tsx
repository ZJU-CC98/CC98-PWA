import React, { useState, useEffect } from 'react'

import { IconButton, Menu, MenuItem } from '@material-ui/core'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import { IPost, IUser } from '@cc98/api'

import userInstance from '@/containers/user'

import { navigate } from '@/utils/history'
import snackbar from '@/utils/snackbar'
import { getBoardMastersById } from '@/services/board'
import copy2Clipboard from 'copy-to-clipboard'

// TODO: fix
import Judge from '../Dialog/Judge'
import Manage from '../Dialog/Manage'

interface Props {
  /**
   * 帖子信息
   */
  postInfo: IPost
  /**
   * 用户信息
   */
  userInfo: IUser | undefined
  /**
   * 是否追踪
   */
  isTrace: boolean
  /**
   * 更新 Post 信息
   */
  refreshPost: () => void
}

const MenuActions: React.FC<Props> = ({ postInfo, isTrace, refreshPost, userInfo }) => {
  // 控制 Menu 的显示
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleTrace = () => {
    if (isTrace) {
      navigate(`/topic/${postInfo.topicId}`)
    } else {
      if (postInfo.isAnonymous) {
        navigate(`/topic/${postInfo.topicId}/anonymous/trace/${postInfo.id}`)
      } else {
        navigate(`/topic/${postInfo.topicId}/trace/${postInfo.userId}`)
      }
    }
    handleClose()
  }

  const handleShare = () => {
    if (document.location) {
      copy2Clipboard(
        `https://${document.location.host}/topic/${postInfo.topicId}#${postInfo.floor}`
      )
    }
    snackbar.success('分享链接已经成功复制到剪切板')
    handleClose()
  }

  // 控制 评分 的显示
  const [showJudge, setShowJudge] = useState(false)
  const [showManage, setShowManage] = useState(false)

  const judgeOpen = () => setShowJudge(true)
  const judgeClose = () => setShowJudge(false)

  const manageOpen = () => setShowManage(true)
  const manageClose = () => setShowManage(false)

  const handleJudge = () => {
    judgeOpen()
    handleClose()
  }

  const handleManage = () => {
    manageOpen()
    handleClose()
  }

  // FIXME: 显然组件的组织有问题，数据或许可以集中化处理

  // 获取该版面版主信息
  const [boardMasters, setBoardMasters] = useState<string[]>([])
  useEffect(
    () => {
      getBoardMastersById(postInfo.boardId).then(boardMasters => setBoardMasters(boardMasters))
    },
    [postInfo.boardId]
  )

  function judgeEdit() {
    // 本人是管理员允许修改任何帖子
    if (myInfo && myInfo.privilege === '管理员') return true
    // 不是管理员包括版主不允许修改管理员的帖子
    if (userInfo && userInfo.privilege === '管理员') return false
    // 本人是版主可以修改其他帖子
    if (myInfo && boardMasters.indexOf(myInfo.name) !== -1) return true

    return false
  }

  function judgeManage() {
    // 本人是管理员允许管理任何帖子
    if (myInfo && myInfo.privilege === '管理员') return true
    // 本人是版主可以管理本版帖子
    if (myInfo && boardMasters.indexOf(myInfo.name) !== -1) return true

    return false
  }

  const myInfo = userInstance.state.myInfo
  // 编辑操作
  const canEdit = postInfo.userId === (myInfo && myInfo.id) || postInfo.isAnonymous || judgeEdit()
  // 管理操作
  const canManage = judgeManage()

  return (
    <>
      {showJudge && (
        <Judge postInfo={postInfo} handleClose={judgeClose} refreshPost={refreshPost} />
      )}
      {showManage && (
        <Manage postInfo={postInfo} handleClose={manageClose} refreshPost={refreshPost} />
      )}
      <IconButton onClick={handleOpen}>
        <ExpandMoreIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleTrace}>{isTrace ? '返回' : '追踪'}</MenuItem>
        {canEdit && (
          <MenuItem
            onClick={() => {
              navigate(`/editor/edit/${postInfo.id}`)
              handleClose()
            }}
          >
            编辑
          </MenuItem>
        )}
        <MenuItem onClick={handleJudge}>评分</MenuItem>
        <MenuItem onClick={handleShare}>分享</MenuItem>
        {canManage && <MenuItem onClick={handleManage}>管理</MenuItem>}
      </Menu>
    </>
  )
}

export default MenuActions
