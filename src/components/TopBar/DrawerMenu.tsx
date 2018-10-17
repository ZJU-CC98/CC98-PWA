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
import FiberNew from '@material-ui/icons/FiberNew'
import AspectRatio from '@material-ui/icons/AspectRatio'
import DashBoard from '@material-ui/icons/DashBoard'
import Settings from '@material-ui/icons/Settings'

import history from '@/utils/history'

import UserInfo from './UserInfo'

const list = css`
  width: 180px;
`

type Props = {
  open: boolean
  onClose: () => void
}

const jump = (url: string) => {
  history.push(url)
}

const TopBar: React.SFC<Props> = ({open, onClose}) => (
  <Drawer open={open} onClose={onClose}>
    <List
      className={list}
      onClick={onClose}
    >
      <UserInfo />
      <Divider />
      <ListItem button onClick={() => {jump('/')}}>
        <ListItemIcon><HomeIcon /></ListItemIcon>
        <ListItemText primary="主页" />
      </ListItem>
      <ListItem button onClick={() => {jump('/hotTopic')}}>
        <ListItemIcon><Whatshot /></ListItemIcon>
        <ListItemText primary="十大" />
      </ListItem>
      <ListItem button onClick={() => {jump('/newTopic')}}>
        <ListItemIcon><FiberNew /></ListItemIcon>
        <ListItemText primary="新帖" />
      </ListItem>
      <ListItem button onClick={() => {jump('/boardList')}}>
        <ListItemIcon><AspectRatio /></ListItemIcon>
        <ListItemText primary="版面" />
      </ListItem>
      <ListItem button onClick={() => {jump('/userCenter')}}>
        <ListItemIcon><DashBoard /></ListItemIcon>
        <ListItemText primary="个人中心" />
      </ListItem>
      <ListItem button onClick={() => {jump('/setting')}}>
        <ListItemIcon><Settings /></ListItemIcon>
        <ListItemText primary="个性化" />
      </ListItem>
    </List>
  </Drawer>
)

export default TopBar
