import React from 'react'
import { css } from 'emotion'

import {
  Drawer,
  List, ListItem,
  ListItemText, ListItemIcon,
  Divider,
} from '@material-ui/core'

import HomeIcon from '@material-ui/icons/Home'
import Whatshot from '@material-ui/icons/Whatshot'

import history from '@/utils/history'

const list = css`
  width: 200px;
`

type Props = {
  open: boolean
  onClose: () => void
}

const jump = (url: string) => {
  history.push(url)
}

const TopBar: React.SFC<Props> = ({open, onClose}) => (
  <Drawer open={open}>
    <List
      className={list}
      onClick={onClose}
    >
      <ListItem button onClick={() => {jump('/logIn')}}>
        <ListItemText primary="登录" />
      </ListItem>
      <Divider />
      <ListItem button onClick={() => {jump('/')}}>
        <ListItemIcon><HomeIcon /></ListItemIcon>
        <ListItemText primary="主页" />
      </ListItem>
      <ListItem button onClick={() => {jump('/hotTopic')}}>
        <ListItemIcon><Whatshot /></ListItemIcon>
        <ListItemText primary="十大" />
      </ListItem>
    </List>
  </Drawer>
)

export default TopBar
