import React from 'react'
import { css } from 'emotion'

import {
  Typography,
} from '@material-ui/core'

import { ITopic } from '@cc98/api'

const root = css`
  padding: 16px;
  background-color: #fff;
`

type Props = {
  topicInfo: ITopic
}

const PostHead: React.SFC<Props> = ({topicInfo}) => (
  <div className={root}>
    <Typography variant="subtitle2">
      {topicInfo.title}
    </Typography>
  </div>
)

export default PostHead
