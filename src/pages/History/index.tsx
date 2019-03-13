import React from 'react'

import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'

import useModel from '@/hooks/useModel'
import historyModel from '@/models/history'

import dayjs from 'dayjs'
import { navigate } from '@/utils/history'

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
      {historyList.reverse().map(item => (
        <ListItem key={item.id} onClick={() => navigate(`/topic/${item.id}`)}>
          <ListItemText
            primary={clamp(item.title)}
            secondary={`${dayjs(item.lastViewTime).fromNow()}`}
          />
          <ListItemSecondaryAction>
            <IconButton onClick={() => historyModel.DELETE(item.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  )
}

export default History
