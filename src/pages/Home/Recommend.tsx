import React from 'react'
import { navigate } from '@/utils/history'
import styled from 'styled-components'

import useFetcher from '@/hooks/useFetcher'

import { List, ListItem, ListItemText, ListItemIcon, Divider, Avatar } from '@material-ui/core'

import Event from '@material-ui/icons/Event'

import { getHomeInfo } from '@/services/global'
import { notificationHandler } from '@/services/utils/errorHandler'
import { IRecommendationReading } from '@cc98/api'

const AvatarS = styled(Avatar)`
  && {
    background-color: #999;
  }
`

const ListItemTextS = styled(ListItemText)`
  && {
    padding: 0;
  }
`

export default () => {
  const [data] = useFetcher(getHomeInfo, {
    fail: notificationHandler,
  })

  if (data === null) {
    return null
  }

  return (
    <List>
      <ListItem>
        <ListItemIcon>
          <Event />
        </ListItemIcon>
        <ListItemText primary="推荐阅读" />
      </ListItem>
      <Divider />

      {data.recommendationReading.map((info: IRecommendationReading) => (
        <ListItem key={info.id} onClick={() => navigate(info.url)}>
          <ListItemIcon>
            <AvatarS src={info.imageUrl} />
          </ListItemIcon>
          <ListItemTextS primary={info.title} secondary={info.content} />
        </ListItem>
      ))}
    </List>
  )
}
