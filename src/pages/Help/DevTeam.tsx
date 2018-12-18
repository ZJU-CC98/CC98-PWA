import React from 'react'
import styled from 'styled-components'

import { navigate } from '@/utils/history'

import { Avatar, CardHeader, Divider, Typography } from '@material-ui/core'

const Title = styled(Typography).attrs({
  align: 'center',
  variant: 'h6',
})`
  && {
    margin-top: 16px;
    margin-bottom: 16px;
  }
`

interface DevCardProps {
  name: string
  description: string
  userId: number
}

const CardHeaderS = styled(CardHeader)`
  && {
    width: 48%;
  }
`

const DevCard = ({ name, description, userId }: DevCardProps) => (
  <CardHeaderS
    avatar={<Avatar src={`https://github.com/${name}.png?s=100`} />}
    title={name}
    subheader={description}
    onClick={() => navigate(`/user/${userId}`)}
  />
)

const CardFlexDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
`

export default () => (
  <>
    <Title>开发组</Title>
    <Divider />

    <CardFlexDiv>
      <DevCard name="Deturium" description="项目背锅人" userId={530817} />
      <DevCard name="Dearkano" description="苦力" userId={556551} />
      <DevCard name="AsukaSong" description="高级 Webpack 配置工程师" userId={569380} />
      <DevCard name="Tsukiko15" description="后端开发" userId={405730} />
      <DevCard name="adddna" description="低级前端开发" userId={559244} />
      <DevCard name="c708423" description="前端开发" userId={558467} />
    </CardFlexDiv>
  </>
)
