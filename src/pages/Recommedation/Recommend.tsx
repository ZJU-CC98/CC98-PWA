import React from 'react'
import { navigate } from '@/utils/history'
import muiStyled from '@/muiStyled'

import { List, ListItem, ListItemText, ListItemIcon, Divider, Avatar } from '@material-ui/core'

import Event from '@material-ui/icons/Event'

import { IRecommendationReading } from '@cc98/api'

const AvatarS = muiStyled(Avatar)({
  backgroundColor: '#999',
})

const ListItemTextS = muiStyled(ListItemText)({
  padding: 0,
})

interface Props {
  recommendationReading: IRecommendationReading[]
}
export default (props: Props) => (
  <List>
    <ListItem>
      <ListItemIcon>
        <Event />
      </ListItemIcon>
      <ListItemText primary="推荐阅读" />
    </ListItem>
    <Divider />

    {props.recommendationReading.map((info: IRecommendationReading) => (
      <ListItem key={info.id} onClick={() => navigate(info.url)}>
        <ListItemIcon>
          <AvatarS src={info.imageUrl} />
        </ListItemIcon>
        <ListItemTextS primary={info.title} secondary={info.content} />
      </ListItem>
    ))}
  </List>
)
