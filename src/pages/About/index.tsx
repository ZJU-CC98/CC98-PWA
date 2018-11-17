import React, { useState, useEffect } from 'react'
import { css } from 'emotion'
import { navigate } from '@reach/router'
import Deturium from '@/assets/developTeam/Deturium.jpg'
import Dearkano from '@/assets/developTeam/Dearkano.jpg'
import AsukaSong from '@/assets/developTeam/AsukaSong.jpg'
import adddna from '@/assets/developTeam/adddna.jpg'
import Tsukiko15 from '@/assets/developTeam/Tsukiko15.jpg'
import c708423 from '@/assets/developTeam/c708423.jpg'

import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  Card,
  Avatar,
  CardHeader,
  Divider,
  Typography,
} from '@material-ui/core'

import { getSiteInfo } from '@/services/global'
import { ISite } from '@cc98/api'

const headStyle = css`
  && {
    margin-top: 16px;
    margin-bottom: 16px;
  }
`
export default () => {
  const [data, setData] = useState<ISite | null>(null)
  useEffect(() => {
    ; (async () => {
      const res = await getSiteInfo()
      res.fail().succeed(setData)
    })()
  }, [])
  const rows = data
    ? [
        { name: '今日帖数', data: data.todayCount },
        { name: '论坛总主题数', data: data.maxPostCount },
        { name: '论坛总回复数', data: data.postCount },
        { name: '总用户数', data: data.userCount },
        { name: '最新加入用户', data: data.lastUserName },
    ]
    : []

  return (
    <>
      <Typography className={headStyle} align="center" variant="title">
        论坛统计
      </Typography>
      <Divider />
      <Table>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.data}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Typography className={headStyle} align="center" variant="title">
        开发组
      </Typography>
      <Divider />
      <Card elevation={0}>
        <CardHeader
          onClick={() => navigate('/user/530817')}
          avatar={<Avatar src={Deturium} />}
          title="Deturium"
          subheader="项目背锅人"
        />
      </Card>
      <Card elevation={0}>
        <CardHeader
          onClick={() => navigate('/user/556551')}
          avatar={<Avatar src={Dearkano} />}
          title="Dearkano"
          subheader="苦力"
        />
      </Card>
      <Card elevation={0}>
        <CardHeader
          onClick={() => navigate('/user/569380')}
          avatar={<Avatar src={AsukaSong} />}
          title="AsukaSong"
          subheader="高级 Webpack 配置工程师"
        />
      </Card>
      <Card elevation={0}>
        <CardHeader
          onClick={() => navigate('/user/405730')}
          avatar={<Avatar src={Tsukiko15} />}
          title="Tsukiko15"
          subheader="后端开发"
        />
      </Card>
      <Card elevation={0}>
        <CardHeader
          onClick={() => navigate('/user/559244')}
          avatar={<Avatar src={adddna} />}
          title="adddna"
          subheader="低级前端开发"
        />
      </Card>
      <Card elevation={0}>
        <CardHeader
          onClick={() => navigate('/user/558467')}
          avatar={<Avatar src={c708423} />}
          title="c708423"
          subheader="前端开发"
        />
      </Card>
    </>
  )
}
