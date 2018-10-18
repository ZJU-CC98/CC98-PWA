import React from 'react'
import { css } from 'emotion'

import {
  Typography,
  IconButton,
} from '@material-ui/core'

import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace'

import { ITopic } from '@cc98/api'

// FIXME: if history stack is empty ?
const goback = () => window.history.back()

const root = css`
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  padding: 5px 18px;
  background-color: #fff;
  /* z-index of TopBar is 1100 and DrawerMenu is 1200 */
  z-index: 1105;
`

const gobackIcon = css`
  && {
    margin-left: -12px;
    margin-right: 5px;
  }
`

type Props = {
  topicInfo: ITopic
}

const PostHead: React.SFC<Props> = ({topicInfo}) => (
  <div className={root}>
    <IconButton className={gobackIcon} onClick={goback}>
      <KeyboardBackspaceIcon />
    </IconButton>
    <Typography variant="subtitle2">
      {topicInfo.title}
    </Typography>
  </div>
)

export default PostHead
