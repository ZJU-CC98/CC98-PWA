import React from 'react'
import { navigate } from '@reach/router'
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
import ExitToApp from '@material-ui/icons/ExitToApp'

const list = css`
  width: 190px;
`

const jump = (link: string) => () => {
  navigate(link)
}

type ItemProps = {
  icon: React.ReactElement<any>
  text: string
  onClick: () => void
}

const Item: React.SFC<ItemProps> = ({icon, text, onClick}) => (
  <ListItem button onClick={onClick}>
    <ListItemIcon>{icon}</ListItemIcon>
    <ListItemText primary={text} />
  </ListItem>
)

type Props = {
  isLogIn: boolean
  open: boolean
  onClose: () => void
  onLogout: () => void
}

const TopBar: React.SFC<Props> = ({isLogIn, open, onClose, onLogout, children}) => (
  <Drawer open={open} onClose={onClose}>
    <List
      className={list}
      onClick={onClose}
    >
      {children}
      <Divider />
      <Item icon={<HomeIcon />} text="主页" onClick={jump('/')} />
      <Item icon={<Whatshot />} text="热门" onClick={jump('/hotTopic')} />
      <Item icon={<FiberNew />} text="新帖" onClick={jump('/newTopic')} />
      <Item icon={<AspectRatio />} text="版面" onClick={jump('/boardList')} />
      {isLogIn && <>
        <Item icon={<DashBoard />} text="个人中心" onClick={jump('/userCenter')} />
        <Item icon={<Settings />} text="个性化" onClick={jump('/setting')} />
        <Item icon={<ExitToApp />} text="登出" onClick={onLogout} />
      </>}
    </List>
  </Drawer>
)

export default TopBar
