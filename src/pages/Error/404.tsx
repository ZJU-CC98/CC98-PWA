import React, { useState } from 'react'
import styled from 'styled-components'

import img401 from '@/assets/401.png'
import img404 from '@/assets/404.png'
import { Typography, Button } from '@material-ui/core'

import LayoutCenter from '@/components/LayoutCenter'

import { goback } from '@/utils/history'

const Img = styled.img`
  width: 60%;
  max-width: 600px;
`

const Body = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
`
const Page404: React.FunctionComponent = () => {
  const [imgSrc, setImgSrc] = useState(img404)

  const changeImage = () => {
    imgSrc === img404 ? setImgSrc(img401) : setImgSrc(img404)
  }

  return (
    <LayoutCenter>
      <Body>
        <Img src={imgSrc} alt="404" onTouchStart={changeImage} />
        <Typography variant="h5">糟糕！好像出错了！</Typography>
        <Typography variant="subheading">页面不存在！</Typography>
        <Button variant="contained" color="primary" onClick={goback}>
          返回
        </Button>
      </Body>
    </LayoutCenter>
  )
}

export default Page404
