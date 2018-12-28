import React, { useState } from 'react'
import styled from 'styled-components'

import {
  Typography,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  IconButton,
  CircularProgress,
  Menu,
  MenuItem,
  ListItemIcon,
} from '@material-ui/core'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import FavoriteIcon from '@material-ui/icons/Favorite'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import EventIcon from '@material-ui/icons/Event'
import WarningIcon from '@material-ui/icons/Warning'

import { IBoard } from '@cc98/api'
import { customBoard } from '@/services/board'

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

const ExpansionPanelS = styled(ExpansionPanel)`
  && {
    width: 100%;
  }
`

export default ({ data }: Props) => {
  const [state, setState] = useState({
    isFollowed: data.isUserCustomBoard,
    loading: false,
  })
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

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
          <IconButton onClick={handleOpen}>
            <MoreVertIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
            <MenuItem>
              <ListItemIcon>
                <EventIcon />
              </ListItemIcon>
              <Typography>版面事件</Typography>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <WarningIcon />
              </ListItemIcon>
              <Typography>小黑屋</Typography>
            </MenuItem>
          </Menu>
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
