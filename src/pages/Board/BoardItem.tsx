import { IBoard } from '@cc98/api'
import Button from '@material-ui/core/Button'
import { navigate } from '@reach/router'
import React from 'react'
import { css } from 'react-emotion'
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
export default class extends React.PureComponent<Props> {
  render() {
    const { data } = this.props

    return (
      <Button
        onClick={() => navigate(`/board/${data.id}`)}
        className={cardStyle}
        variant="outlined"
      >
        {data.name}
      </Button>
    )
  }
}
