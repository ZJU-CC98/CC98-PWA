import React, { useState } from 'react'
import styled from 'styled-components'
import muiStyled from '@/muiStyled'

import {
  Typography,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  IconButton,
  CircularProgress,
} from '@material-ui/core'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import FavoriteIcon from '@material-ui/icons/Favorite'

import { IBoard } from '@cc98/api'
import { customBoard } from '@/services/board'

import BoardMenu from './components/BoardMenu'

interface Props {
  data: IBoard
}

const FlexDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const HeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 10px 10px 24px;
`

const ExpansionPanelS = muiStyled(ExpansionPanel)({
  width: '100%',
})

export default ({ data }: Props) => {
  const [state, setState] = useState({
    isFollowed: data.isUserCustomBoard,
    loading: false,
  })
  const { isFollowed, loading } = state

  async function handleClick() {
    if (loading) {
      return
    }

    setState({
      ...state,
      loading: true,
    })

    const res = await customBoard(data.id, isFollowed ? 0 : 1)
    res
      .fail(() => setState({ ...state, loading: false }))
      .succeed(_ =>
        setState({
          isFollowed: !isFollowed,
          loading: false,
        })
      )
  }

  return (
    <FlexDiv>
      <HeaderDiv>
        <div>
          <Typography variant="h5" color="primary">
            {data.name}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            {`${data.todayCount} / ${data.topicCount}`}
          </Typography>
        </div>
        <div>
          <IconButton onClick={handleClick}>
            {state.loading ? (
              <CircularProgress size={20} />
            ) : (
              <FavoriteIcon color={isFollowed ? 'secondary' : 'disabled'} />
            )}
          </IconButton>
          <BoardMenu boardId={data.id} />
        </div>
      </HeaderDiv>

      <ExpansionPanelS>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle2" color="primary">
            版面描述
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>{data.description}</Typography>
        </ExpansionPanelDetails>
      </ExpansionPanelS>
    </FlexDiv>
  )
}
