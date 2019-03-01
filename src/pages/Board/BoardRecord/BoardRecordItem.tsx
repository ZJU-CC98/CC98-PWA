import React from 'react'
import styled from 'styled-components'
import muiStyled from '@/muiStyled'

import {
  Typography,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
} from '@material-ui/core'

import { IBoardEvent } from '@cc98/api'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import dayjs from 'dayjs'

const FlexDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const ExpansionPanelS = muiStyled(ExpansionPanel)({
  width: '100%',
})

interface Props {
  /**
   * 事件信息
   */
  eventInfo: IBoardEvent
}

export default ({ eventInfo }: Props) => (
  <FlexDiv>
    <ExpansionPanelS>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <FlexDiv>
          <Typography>
            对象：
            {eventInfo.boardId === 182 ? '匿名用户' : eventInfo.targetUserName}
          </Typography>
          <Typography>时间：{dayjs(eventInfo.time).format('YYYY/MM/DD HH:mm')}</Typography>
        </FlexDiv>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <FlexDiv>
          <Typography>{eventInfo.content}</Typography>
          <Typography>操作人：{eventInfo.operatorUserName}</Typography>
        </FlexDiv>
      </ExpansionPanelDetails>
    </ExpansionPanelS>
  </FlexDiv>
)
