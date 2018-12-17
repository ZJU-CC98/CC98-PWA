import React from 'react'
import styled from 'styled-components'

import useFetcher from '@/hooks/useFetcher'

import { navigate } from '@/utils/history'

import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  Avatar,
  CardHeader,
  Divider,
  Typography,
} from '@material-ui/core'

import { getSiteInfo } from '@/services/global'

const Title = styled(Typography).attrs({
  align: 'center',
  variant: 'h6',
})`
  && {
    margin-top: 16px;
    margin-bottom: 16px;
  }
`

const SiteInfo = () => {
  const [info] = useFetcher(getSiteInfo)

  if (info === null) {
    return null
  }

  const rows = [
    { name: '今日帖数', data: info.todayCount },
    { name: '论坛总主题数', data: info.maxPostCount },
    { name: '论坛总回复数', data: info.postCount },
    { name: '总用户数', data: info.userCount },
    { name: '最新加入用户', data: info.lastUserName },
  ]

  return (
    <>
      <Title>论坛统计</Title>
      <Divider />

      <Table>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.name}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.data}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}

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

const DevTeam = () => (
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

export default () => (
  <>
    <SiteInfo />
    <DevTeam />
  </>
)
