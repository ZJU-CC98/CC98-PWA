import React, { useState } from 'react'
import { navigate } from '@/utils/history'
import { css } from 'emotion'

import {
  Avatar,
  IconButton,
  ExpansionPanel,
  ExpansionPanelDetails,
  Typography,
} from '@material-ui/core'

import FavoriteIcon from '@material-ui/icons/Favorite'
import EditIcon from '@material-ui/icons/Edit'
import ChatIcon from '@material-ui/icons/Chat'

import { followUser, unFollowUser } from '@/services/user'
import { IUser } from '@cc98/api'

interface Props {
  info: IUser
  isUserCenter: boolean
}

const wrapper = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

const avatarInfo = css`
  display: flex;
  align-items: center;
`

const avatar = css`
  && {
    width: 70px;
    height: 70px;
    margin-right: 20px;
  }
`

const UserAvatar: React.FunctionComponent<Props> = ({ info, isUserCenter }) => {
  const [state, setState] = useState({
    isFollowing: info.isFollowing,
    loading: false,
  })

  const { isFollowing, loading } = state

  async function handleFollowClick() {
    if (loading) {
      return
    }

    setState({
      ...state,
      loading: false,
    })

    const res = await (isFollowing ? unFollowUser(info.id) : followUser(info.id))

    res.fail().succeed(_ =>
      setState({
        isFollowing: !isFollowing,
        loading: true,
      })
    )
  }

  const iconButtons = isUserCenter ? (
    <IconButton onClick={() => navigate('/userCenter/edit')}>
      <EditIcon />
    </IconButton>
  ) : (
    <>
      <IconButton onClick={handleFollowClick}>
        <FavoriteIcon color={isFollowing ? 'secondary' : 'disabled'} />
      </IconButton>
      {/* TODO: 私信 */}
      <IconButton>
        <ChatIcon />
      </IconButton>
    </>
  )

  return (
    <div className={wrapper}>
      <div className={avatarInfo}>
        <Avatar className={avatar} src={info.portraitUrl} />
        <Typography variant="h6">{info.name}</Typography>
      </div>
      <div>{iconButtons}</div>
    </div>
  )
}

const root = css`
  && {
    padding: 24px;
  }
`

export default (props: Props) => (
  <ExpansionPanel expanded>
    <ExpansionPanelDetails className={root}>
      <UserAvatar {...props} />
    </ExpansionPanelDetails>
  </ExpansionPanel>
)
