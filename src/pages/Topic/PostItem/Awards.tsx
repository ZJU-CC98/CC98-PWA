import React, { useState } from 'react'
import styled from 'styled-components'

import {
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@material-ui/core'

import { IAward } from '@cc98/api'

const TableRowS = styled(TableRow)`
  && {
    height: 2rem;
    padding: 0;
  }
`

const CellLeft = styled(TableCell)`
  && {
    min-width: 5rem;
    max-width: 7rem;
    word-break: break-all;
    padding: 4px;
    padding-left: 0;
  }
`

const CellMiddle = CellLeft

const CellRight = styled(TableCell)`
  /* 保证优先级高于 .MuiTableCell-root-163:last-child */
  &&& {
    padding: 4px 0;
  }
`

const CellShowMore = styled(TableCell)`
  &&& {
    padding: 8px 0;
    text-align: center;
    cursor: pointer;
  }
`

interface Props {
  awards: IAward[]
}

// 显示的评分数，超出将默认折叠
const SHOW_AWARDS_NUM = 3

const Awards = ({ awards }: Props) => {
  const showExpanded = awards.length > SHOW_AWARDS_NUM
  const [expanded, setExpanded] = useState(false)

  const showAwards = expanded ? awards : awards.slice(0, SHOW_AWARDS_NUM)

  return (
    <>
      {showAwards.map(award => (
        <TableRowS key={award.id}>
          <CellLeft>{award.operatorName}</CellLeft>
          <CellMiddle>{award.content}</CellMiddle>
          <CellRight>{award.reason}</CellRight>
        </TableRowS>
      ))}
      {showExpanded && !expanded && <TableRowS >
        <CellShowMore
          colSpan={SHOW_AWARDS_NUM}
          onClick={() => setExpanded(true)}
        >
            展开剩余{awards.length - SHOW_AWARDS_NUM}个评分
        </CellShowMore>
      </TableRowS>
      }
    </>
  )
}

const AwardsTable: React.FunctionComponent = ({ children }) => (
  <Table>
    <TableHead>
      <TableRowS>
        <CellLeft>评分人</CellLeft>
        <CellMiddle>操作</CellMiddle>
        <CellRight>理由</CellRight>
      </TableRowS>
    </TableHead>
    <TableBody>
      {children}
    </TableBody>
  </Table>
)

const WrapperDiv = styled.div`
  margin: 16px;
  margin-top: 0;
`

export default ({ awards }: Props) => {
  if (awards.length === 0) {
    return null
  }

  return (
    <WrapperDiv>
      <AwardsTable>
        <Awards awards={awards} />
      </AwardsTable>
    </WrapperDiv>
  )
}
