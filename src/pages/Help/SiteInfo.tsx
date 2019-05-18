import React from 'react'
import muiStyled from '@/muiStyled'

import useFetcher from '@/hooks/useFetcher'

import { Table, TableRow, TableBody, TableCell, Divider, Typography } from '@material-ui/core'

import { getSiteInfo } from '@/services/global'

const Title = muiStyled(Typography).attrs({
  align: 'center',
  variant: 'h6',
  color: 'textPrimary',
})({
  marginTop: 16,
  marginBottom: 16,
})

export { Title }

export default () => {
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
