import React, { useState } from 'react'
import styled from 'styled-components'

import useFetcher from '@/hooks/useFetcher'

import { IconButton, Typography, Menu, MenuItem } from '@material-ui/core'

import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import ThumbDownIcon from '@material-ui/icons/ThumbDown'
import FormatQuoteIcon from '@material-ui/icons/FormatQuote'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import { IPost, ILikeState, IUser, IBoard } from '@cc98/api'
import { putLike, putDislike } from '@/services/post'

import userInstance from '@/containers/user'

import { navigate } from '@/utils/history'
import snackbar from '@/utils/snackbar'
import { getBoardsInfo } from '@/services/board'
import copy2Clipboard from 'copy-to-clipboard'

import Judge from './Judge'
import Manage from './Manage'

// @babel/plugin-transform-typescript does not support const enums
enum LikeState {
  NONE = 0,
  LIKE = 1,
  DISLIKE = 2,
}

interface Props {
  /**
   * 帖子信息
   */
  postInfo: IPost
  /**
   * 用户信息
   */
  userInfo?: IUser
  /**
   * 是否追踪
   */
  isTrace?: boolean
  /**
   * 更新 Post 信息
   */
  refreshPost: () => void
}

const ActionDiv = styled.div`
  display: flex;
  align-items: center;
  margin-left: 8px;
`

const Count = styled(Typography).attrs({
  color: 'textSecondary',
})`
  && {
    margin-left: -2px;
    margin-right: 12px;
  }
`

const DividerCol = styled.span`
  margin: 0 4px;
  /* FIXME: remove hardcode color */
  border: solid thin rgba(0, 0, 0, 0.54);
  height: 1rem;
`

/**
 * 检查是否登录
 */
function checkLogIn() {
  if (!userInstance.state.isLogIn) {
    snackbar.error('请先登录')

    return false
  }

  return true
}

const IconActions: React.FunctionComponent<Props> = ({ postInfo, refreshPost }) => {
  const { likeState } = postInfo

  const handleLike = (newLikeState: ILikeState) => () => {
    if (!checkLogIn()) return

    const putService = newLikeState === 1 ? putLike : putDislike

    putService(postInfo.id).then(res =>
      res.fail().succeed(_ => {
        refreshPost()
      })
    )
  }

  const handleQuote = () => {
    if (!checkLogIn()) return

    if (postInfo.isDeleted) {
      snackbar.error('不能引用已删除的帖子')

      return
    }
    navigate(`/editor/replyTopic/${postInfo.topicId}/quote/${postInfo.floor}`)
  }

  return (
    <ActionDiv>
      <IconButton onClick={handleLike(LikeState.LIKE)}>
        <ThumbUpIcon color={likeState === LikeState.LIKE ? 'secondary' : 'inherit'} />
      </IconButton>
      <Count>{postInfo.likeCount}</Count>

      <DividerCol />

      <IconButton onClick={handleLike(LikeState.DISLIKE)}>
        <ThumbDownIcon color={likeState === LikeState.DISLIKE ? 'secondary' : 'inherit'} />
      </IconButton>
      <Count>{postInfo.dislikeCount}</Count>

      <DividerCol />
      <IconButton>
        <FormatQuoteIcon onClick={handleQuote} />
      </IconButton>
    </ActionDiv>
  )
}

const MoreActions = ({ postInfo, isTrace, refreshPost, userInfo }: Props) => {
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

  // FIXME: 不接受每次都这样请求，写一个新的 service
  const [childBoards, setChildBoards] = useState<IBoard[]>([])
  useFetcher(getBoardsInfo, {
    success: boards => {
      setChildBoards(
        boards.map(baseBoard => baseBoard.boards).reduce((prev, cur) => cur.concat(prev))
      )
    },
  })
  const board = childBoards.find(b => b.id === postInfo.boardId)

  function isManager() {
    // 本人是管理员允许修改任何帖子
    if (myInfo && myInfo.privilege === '管理员') return true
    // 不是管理员包括版主不允许修改管理员的帖子
    if (userInfo && userInfo.privilege === '管理员') return false
    // 本人是版主可以修改其他帖子
    if (myInfo && board && board.boardMasters.indexOf(myInfo.name) !== -1) return true
  }

  const myInfo = userInstance.state.myInfo
  const isMaster = isManager()
  const canEdit = postInfo.userId === (myInfo && myInfo.id) || postInfo.isAnonymous || isMaster

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
        {isMaster && <MenuItem onClick={handleManage}>管理</MenuItem>}
      </Menu>
    </>
  )
}

const FlexDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export default ({ postInfo, isTrace, refreshPost, userInfo }: Props) => (
  <FlexDiv>
    <IconActions postInfo={postInfo} refreshPost={refreshPost} />
    <MoreActions
      postInfo={postInfo}
      userInfo={userInfo}
      isTrace={isTrace}
      refreshPost={refreshPost}
    />
  </FlexDiv>
)
