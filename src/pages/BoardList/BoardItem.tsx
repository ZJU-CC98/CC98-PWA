import React from 'react'
import { navigate } from '@/utils/history'
import muiStyled from '@/muiStyled'

import { Button } from '@material-ui/core'

import { IBoard } from '@cc98/api'

interface Props {
  data: IBoard
}

const Item = muiStyled(Button)({
  margin: 4,
  textAlign: 'left',
})

export default (props: Props) => (
  <Item
    // variant="outlined"
    onClick={() => navigate(`/board/${props.data.id}`)}
  >
    {props.data.name}
  </Item>
)
