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
    margin: 0.25rem 0.25rem 0.25rem 0.25rem;
    font-size: 0.8rem;
    padding-left: 0.2rem;
    padding-right: 0.2rem;
    padding-top: 0;
    padding-bottom: 0;
    min-height: 32px;
    min-width: 80px;
  }
`
export default (props: Props) => (
  <Button
    onClick={() => navigate(`/board/${props.data.id}`)}
    className={cardStyle}
    variant="outlined"
  >
    {props.data.name}
  </Button>
)
