import React, { useState } from 'react'
import { navigate } from '@/utils/history'
import styled from 'styled-components'

import { Avatar, IconButton, Typography, CircularProgress } from '@material-ui/core'

import ExpandPanel from './ExpandPanel'

import FavoriteIcon from '@material-ui/icons/Favorite'
import EditIcon from '@material-ui/icons/Edit'
import ChatIcon from '@material-ui/icons/Chat'

import { followUser, unFollowUser } from '@/services/user'
import { IUser } from '@cc98/api'

const WrapperDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 24px;
  margin-bottom: 0;
`

const AvatarDiv = styled.div`
  display: flex;
  align-items: center;
`

const ButtonDiv = styled.div`
  margin-right: -10px;
`

const AvatarS = styled(Avatar)`
  && {
    width: 70px;
    height: 70px;
    margin-right: 20px;
  }
`

interface Props {
  info: IUser
  isUserCenter: boolean
}

const UserAvatar: React.FC<Props> = ({ info, isUserCenter }) => {
  const [isFollowing, setIsFollowing] = useState(info.isFollowing)
  const [isLoading, setIsLoading] = useState(false)
  const toggleFunc = async () => {
    if (isLoading) {
      return
    }
    setIsLoading(true)
    if (isFollowing) {
      const res = await unFollowUser(info.id)
      res
        .fail(() => setIsLoading(false))
        .succeed(() => {
          setIsFollowing(false)
          setIsLoading(false)
        })
    } else {
      const res = await followUser(info.id)
      res
        .fail(() => setIsLoading(false))
        .succeed(() => {
          setIsFollowing(true)
          setIsLoading(false)
        })
    }
  }

  const buttonsJSX = isUserCenter ? (
    <IconButton onClick={() => navigate('/userCenter/edit')}>
      <EditIcon />
    </IconButton>
  ) : (
    <>
      <IconButton onClick={toggleFunc}>
        {isLoading ? (
          <CircularProgress size={20} />
        ) : (
          <FavoriteIcon color={isFollowing ? 'secondary' : 'disabled'} />
        )}
      </IconButton>
      <IconButton>
        <ChatIcon onClick={() => navigate(`/messageDetail/${info.id}`)} />
      </IconButton>
    </>
  )

  return (
    <ExpandPanel expanded>
      <WrapperDiv>
        <AvatarDiv>
          <AvatarS src={info.portraitUrl} />
          <Typography variant="h6">{info.name}</Typography>
        </AvatarDiv>
        <ButtonDiv>{buttonsJSX}</ButtonDiv>
      </WrapperDiv>
    </ExpandPanel>
  )
}

export default UserAvatar
