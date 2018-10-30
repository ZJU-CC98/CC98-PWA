import React from 'react'

import { ListItem, ListItemText } from '@material-ui/core'

import { IHotTopic } from '@cc98/api'

import { css } from 'emotion';
interface Props {
  info: IHotTopic
  click?: (topicID: number) => void
}
const LineStyle = css`
  display:flex;
  justify-content:space-between;
  width:100%;
`
const TopicItem: React.SFC<Props> = ({ info, click }) => (
  <ListItem
    divider
    button
    onClick={() => click && click(info.id)}
  >
    <ListItemText
      primary={
        <div className={LineStyle}>
          <div>{info.boardName}</div>
          <div>{info.authorName ? info.authorName : '匿名'}</div>
        </div>}
      secondary={info.title}
    />
  </ListItem>
)

export default TopicItem
