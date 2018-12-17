import React from 'react'
import styled from 'styled-components'

import img400 from '@/assets/401.png'

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

const Page400: React.FunctionComponent = () => (
  <LayoutCenter>
    <Body>
      <Img src={img400} alt="400" onClick={goback} />
      <Message>糟糕！好像出错了！</Message>
      <Message>您的操作出现了问题！</Message>
      <Button variant="contained" color="primary" onClick={goback}>
        返回
      </Button>
    </Body>
  </LayoutCenter>
)

export default Page400
