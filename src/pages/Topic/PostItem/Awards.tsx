import React from 'react'
import styled from 'styled-components'

import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core'

import { IAward } from '@cc98/api'

interface Props {
  awards: IAward[]
}

const TableS = styled(Table)`
  && {
    width: 100%;
    padding: 0 12px;
    margin-bottom: 12px;
  }
`

export default ({ awards }: Props) => (
  <TableS>
    <TableHead>
      <TableRow>
        <TableCell>评分人</TableCell>
        <TableCell>操作内容</TableCell>
        <TableCell>理由</TableCell>
      </TableRow>
    </TableHead>

    <TableBody>
      {awards.map(award => (
        <TableRow key={award.id}>
          <TableCell>{award.operatorName}</TableCell>
          <TableCell>{award.content}</TableCell>
          <TableCell>{award.reason}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </TableS>
)
