import React from 'react'
import styled from 'styled-components'

import img401 from '@/assets/401.png'

import { Button, Typography } from '@material-ui/core'
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

const Page401: React.FunctionComponent = () => (
  <LayoutCenter>
    <Body>
      <Img src={img401} alt="401" onClick={goback} />
      <Typography variant="h5">糟糕！好像出错了！</Typography>
      <Typography variant="subheading">您没有权限进入这个版面！</Typography>
      <Button variant="contained" color="primary" onClick={goback}>
        返回
      </Button>
    </Body>
  </LayoutCenter>
)

export default Page401
