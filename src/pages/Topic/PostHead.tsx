import React from 'react'
import { css } from 'emotion'

import { IconButton, Typography, Paper } from '@material-ui/core'

import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace'

import { ITopic } from '@cc98/api'
import { navigate } from '@reach/router'

// FIXME: if history stack is empty ?
const goback = () => window.history.back()

const root = css`
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  height: 56px;
  padding: 0 16px;
  background-color: #fff;
  /* z-index of TopBar is 1100 and DrawerMenu is 1200 */
  z-index: 1105;

  @media (min-width: 600px) {
    height: 64px;
  }
`

const gobackIcon = css`
  && {
    margin-left: -12px;
    margin-right: 5px;
  }
`

const title = css`
  && {
    flex-grow: 2;
  }
`

const subTitle = css`
  && {
    margin-left: 8px;
    margin-right: -5px;
    flex-shrink: 0;
    opacity: 0.5;
  }
`

interface Props {
  topicInfo: ITopic
}

const PostHead: React.FunctionComponent<Props> = ({ topicInfo }) => (
  <Paper square elevation={1} className={root}>
    <IconButton className={gobackIcon} onClick={goback}>
      <KeyboardBackspaceIcon />
    </IconButton>
    <Typography variant="subtitle2" className={title}>
      {topicInfo.title}
    </Typography>
    <Typography className={subTitle} onClick={() => navigate(`/board/${topicInfo.boardId}`)}>
      {topicInfo.boardName}
    </Typography>
  </Paper>
)

export default PostHead
