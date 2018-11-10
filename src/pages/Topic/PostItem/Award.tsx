import React from 'react'
import { css } from 'emotion'
import { IPost } from '@cc98/api'
import { CardContent, Table, TableHead, TableBody, TableCell, TableRow } from '@material-ui/core'

interface Props {
  postInfo: IPost
}

const left = css`
  && {
    min-width: 4rem;
    white-space: nowrap;
    padding: 0 0 0 0;
  }
`
const middle = css`
  && {
    min-width: 5rem;
    white-space: nowrap;
    padding: 0 0 0 0;
  }
`
const right = css`
  && {
    flex-grow: 2;
    padding: 0 0 0 0;
  }
`
const row = css`
  && {
    padding: 0 0 0 0;
    height: 30px;
  }
`

export default (props: Props) => {
  const { postInfo } = props

  return (
    <CardContent>
      <Table>
        <TableHead>
          <TableRow className={row}>
            <TableCell className={left}>评分人</TableCell>
            <TableCell className={middle}>操作内容</TableCell>
            <TableCell className={right}>理由</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {postInfo.awards.length !== 0 &&
            postInfo.awards.map(award => (
              <TableRow key={award.id} className={row}>
                <TableCell className={left}>{award.operatorName}</TableCell>
                <TableCell className={middle}>{award.content}</TableCell>
                <TableCell className={right}>{award.reason}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </CardContent>
  )
}
