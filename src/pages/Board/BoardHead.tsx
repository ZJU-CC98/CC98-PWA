import React, { useState } from 'react'
import { navigate } from '@/utils/history'
import { css } from 'emotion'

import {
  Typography,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  IconButton,
} from '@material-ui/core'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Favorite from '@material-ui/icons/Favorite'
import EditIcon from '@material-ui/icons/Edit'

import FixButton from '@/components/FixButton'

import { IBoard } from '@cc98/api'
import { customBoard } from '@/services/board'

interface Props {
  data: IBoard
}

const root = css`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const header = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 10px 10px 24px;
`

const panel = css`
  width: 100%;
`

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
      loading: false,
    })

    const res = await customBoard(data.id, isFollowed ? 0 : 1)
    res.fail().succeed(_ =>
      setState({
        isFollowed: !isFollowed,
        loading: true,
      })
    )
  }

  return (
    <div className={root}>
      <div className={header}>
        <div>
          <Typography variant="h5" color="primary">
            {data.name}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            {`${data.todayCount} / ${data.topicCount}`}
          </Typography>
        </div>

        <IconButton onClick={handleClick}>
          <Favorite color={isFollowed ? 'secondary' : 'disabled'} />
        </IconButton>
      </div>

      <ExpansionPanel className={panel}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle2" color="primary">
            版面描述
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>{data.description}</Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>

      {/* FIXME: 不知道哪里来的透明度，先当 feature 再说 */}
      <FixButton onClick={() => navigate(`/compose/${data.id}/newpost`)}>
        <EditIcon />
      </FixButton>
    </div>
  )
}
