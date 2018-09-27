import React from 'react'
import { css } from 'emotion'

import {
  // Card, CardContent,
  // CardActions,
  Typography,
} from '@material-ui/core'

import { IHotTopic } from 'api'

const root = css`
  padding: 12px 20px;
  border-bottom: 1.5px solid rgba(0, 0, 0, 0.12);
`

type Props = {
  info: IHotTopic
}

const TopicItem: React.SFC<Props> = ({info}) => (
  <div className={root}>
    <Typography variant="body2">
      {info.boardName}
    </Typography>
    <Typography>
      {info.title}
    </Typography>
  </div>
)

export default TopicItem
