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

import UserInfo from './UserInfo'

const list = css`
  width: 200px;
`

const jump = (link: string) => () => {
  navigate(link)
}

type ItemProps = {
  icon: React.ReactElement<any>
  text: string
  link: string
}

const Item: React.SFC<ItemProps> = ({icon, text, link}) => (
  <ListItem button onClick={jump(link)}>
    <ListItemIcon>{icon}</ListItemIcon>
    <ListItemText primary={text} />
  </ListItem>
)

type Props = {
  open: boolean
  onClose: () => void
}

const TopBar: React.SFC<Props> = ({open, onClose}) => (
  <Drawer open={open} onClose={onClose}>
    <List
      className={list}
      onClick={onClose}
    >
      <UserInfo />

      <Divider />
      <Item icon={<HomeIcon />} text="主页" link="/" />
      <Item icon={<Whatshot />} text="十大" link="/hotTopic" />
      <Item icon={<FiberNew />} text="新帖" link="/newTopic" />
      <Item icon={<AspectRatio />} text="版面" link="/boardList" />
      <Item icon={<DashBoard />} text="个人中心" link="/userCenter" />
      <Item icon={<Settings />} text="个性化" link="/setting" />
    </List>
  </Drawer>
)

export default TopBar
