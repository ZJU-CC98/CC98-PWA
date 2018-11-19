import React from 'react'
import { navigate } from '@reach/router'
import { css } from 'react-emotion'

import Button from '@material-ui/core/Button'

import { IBoard } from '@cc98/api'

interface Props {
  data: IBoard
}

const cardStyle = css`
  && {
    margin: 4px;
  }
`

export default (props: Props) => (
  <Button
    className={cardStyle}
    // variant="outlined"
    onClick={() => navigate(`/board/${props.data.id}`)}
  >
    {props.data.name}
  </Button>
)
