import React from 'react'
import styled from 'styled-components'

import { Paper, Divider, Typography } from '@material-ui/core'
import { IBoardStopPostUser } from '@cc98/api'

import dayjs from 'dayjs'
import Actions from './Actions'

const Wrapper = styled(Paper).attrs({
  square: true,
  elevation: 0,
})`
  && {
    margin-top: 6px;
  }
`

const FlexDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 8px 16px;
`

const RightDiv = styled.div`
  text-align: right;
`

const SubTitle = styled(Typography).attrs({
  color: 'textSecondary',
})``

interface Props {
  /**
   * TP信息
   */
  info: IBoardStopPostUser
  /**
   * 版面 id
   */
  boardId: number
  /**
   * 解除TP后刷新
   */
  refreshFunc: () => void
  /**
   * 判断能否解除TP
   */
  canManage: boolean
}

export default ({ info, boardId, refreshFunc, canManage }: Props) => (
  <Wrapper>
    <FlexDiv>
      <div>
        <Typography>{info.userName}</Typography>
        <SubTitle>{`天数：${info.days}`}</SubTitle>
        <SubTitle>{`到期时间：${dayjs(info.expiredTime).format('YYYY/MM/DD HH:mm')}`}</SubTitle>
      </div>
      <RightDiv>
        <Typography>{`操作人：${info.operatorUserName}`}</Typography>
        <Actions
          boardId={boardId}
          userId={info.userId}
          refreshFunc={refreshFunc}
          canManage={canManage}
        />
      </RightDiv>
    </FlexDiv>

    <Divider />
  </Wrapper>
)
