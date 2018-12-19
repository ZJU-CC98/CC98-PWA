import React from 'react'
import { navigate } from '@/utils/history'
import styled from 'styled-components'

import { Button } from '@material-ui/core'

import { IBoard } from '@cc98/api'

interface Props {
  data: IBoard
}

const Item = styled(Button)`
  && {
    margin: 4px;
  }
`

export default (props: Props) => (
  <Item
    // variant="outlined"
    onClick={() => navigate(`/board/${props.data.id}`)}
  >
    {props.data.name}
  </Item>
)
