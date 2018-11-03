import { css } from 'emotion'
import React from 'react'

import { IconButton, Typography } from '@material-ui/core'

import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace'

import { ITopic } from '@cc98/api'
import Paper from '@material-ui/core/paper'
// FIXME: if history stack is empty ?
const goback = () => window.history.back()

const root = css`
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  height: 56px;
  padding: 0 18px;
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
const BoardNameStyle = css`&&{
  opacity:0.54;
  white-space: nowrap;
}`
const TitleStyle = css`&&{
  flex-grow:2;
}`
interface Props {
  topicInfo: ITopic
}

const PostHead: React.SFC<Props> = ({ topicInfo }) => (
  <Paper className={root}>
    <IconButton className={gobackIcon} onClick={goback}>
      <KeyboardBackspaceIcon />
    </IconButton>
    <Typography className={TitleStyle} variant="subtitle2">{topicInfo.title}</Typography>
    <Typography className={BoardNameStyle}>{topicInfo.boardName}</Typography>
  </Paper>
)

export default PostHead
