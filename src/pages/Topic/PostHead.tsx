import React from 'react'
import { css } from 'emotion'

import {
  Typography,
} from '@material-ui/core'

import { ITopic } from '@cc98/api'

const root = css`
  position: sticky;
  top: 0;
  padding: 18px;
  background-color: #fff;
  /* z-index of TopBar is 1100 and DrawerMenu is 1200 */
  z-index: 1105;
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
