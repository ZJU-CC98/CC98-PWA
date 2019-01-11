import React from 'react'
import styled from 'styled-components'

import { DialogTitle, DialogContent } from '@material-ui/core'

const DialogTitleS = styled(DialogTitle)`
  && {
    padding: 12px;
  }
`

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
  'https://www.cc98.org/static/images/default_avatar_boy.png',
  'https://www.cc98.org/static/images/default_avatar_girl.png',
  'https://www.cc98.org/static/images/default_avatar_boy2.jpg',
  'https://www.cc98.org/static/images/default_avatar_girl2.jpg',
  'https://www.cc98.org/static/images/default_avatar_boy3.jpg',
  'https://www.cc98.org/static/images/default_avatar_girl3.jpg',
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
      <DialogTitleS>论坛头像</DialogTitleS>
      <DialogContent>
        <FlexDiv>{ForumAvatarArr}</FlexDiv>
      </DialogContent>
    </>
  )
}
