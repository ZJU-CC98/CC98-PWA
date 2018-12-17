import React from 'react'
import styled from 'styled-components'

import img500 from '@/assets/500.gif'
import Button from '@material-ui/core/Button'

import LayoutCenter from '@/components/LayoutCenter'

import { goback } from '@/utils/history'

const Img = styled.img`
  width: 60%;
  max-width: 600px;
`
const Message = styled.div`
  font-size: 1.2rem;
  font-weight: bolder;
  font-family: 微软雅黑;
  margin-bottom: 1rem;
`

const Body = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
`
const Page500: React.FunctionComponent = () => (
  <LayoutCenter>
    <Body>
      <Img src={img500} alt="500" onClick={goback} />
      <Message>糟糕！好像出错了！</Message>
      <Message>服务器内部错误！</Message>
      <Button variant="contained" color="primary" onClick={goback}>
        返回
      </Button>
    </Body>
  </LayoutCenter>
)

export default Page500
