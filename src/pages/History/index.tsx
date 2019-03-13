import React from 'react'
import styled from 'styled-components'
import muiStyled from '@/muiStyled'

import { List, ListItem, ListItemSecondaryAction, IconButton, Typography } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'

import useModel from '@/hooks/useModel'
import historyModel from '@/models/history'

import dayjs from 'dayjs'
import { navigate } from '@/utils/history'

const TitleArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const Title = muiStyled(Typography).attrs({
  variant: 'subtitle2',
})({})

const SubTitle = muiStyled(Typography).attrs({
  color: 'textSecondary',
})({
  marginTop: 4,
})

const History: React.FC = () => {
  const { historyList } = useModel(historyModel)

  function clamp(str: string) {
    if (str.length <= 20) {
      return str
    }
    return `${str.slice(0, 20)}...`
  }

  return (
    <List>
      {historyList.map(item => (
        <ListItem key={item.id} onClick={() => navigate(`/topic/${item.id}`)}>
          <TitleArea>
            <Title>{clamp(item.title)}</Title>
            <SubTitle>{`${dayjs(item.lastViewTime).fromNow()}`}</SubTitle>
          </TitleArea>
          <ListItemSecondaryAction>
            <IconButton onClick={() => historyModel.DELETE(item.id)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  )
}

export default History
