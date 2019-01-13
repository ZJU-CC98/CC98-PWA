import React from 'react'
import styled from 'styled-components'

import { DialogTitle, DialogContent } from '@material-ui/core'

import { IMG_BASE_URL } from '@/config'

const FlexDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`

const Img = styled.img`
  max-width: 50%;
  padding: 5px;
`

const ForumAvatarsUrl = [
  `${IMG_BASE_URL}/default_avatar_boy.png`,
  `${IMG_BASE_URL}/default_avatar_girl.png`,
  `${IMG_BASE_URL}/default_avatar_boy2.jpg`,
  `${IMG_BASE_URL}/default_avatar_girl2.jpg`,
  `${IMG_BASE_URL}/default_avatar_boy3.jpg`,
  `${IMG_BASE_URL}/default_avatar_girl3.jpg`,
]

interface Props {
  handleClose: () => void
  handleAvatarSubmit: (AvatarSrc: string) => void
}

export default ({ handleClose, handleAvatarSubmit }: Props) => {
  const handleClick = (src: string) => {
    handleAvatarSubmit(src)
    handleClose()
  }

  const ForumAvatarArr = ForumAvatarsUrl.map((item, index) => (
    <Img key={index} src={item} onClick={() => handleClick(item)} />
  ))

  return (
    <>
      <DialogTitle>论坛头像</DialogTitle>
      <DialogContent>
        <FlexDiv>{ForumAvatarArr}</FlexDiv>
      </DialogContent>
    </>
  )
}
