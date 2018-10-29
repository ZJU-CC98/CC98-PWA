import { navigate } from '@reach/router'
import { css } from 'emotion'
import React from 'react'

import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'

import AspectRatio from '@material-ui/icons/AspectRatio'
import DashBoard from '@material-ui/icons/DashBoard'
import ExitToApp from '@material-ui/icons/ExitToApp'
import FiberNew from '@material-ui/icons/FiberNew'
import HomeIcon from '@material-ui/icons/Home'
import Settings from '@material-ui/icons/Settings'
import SpeakerNotes from '@material-ui/icons/SpeakerNotes'
import Whatshot from '@material-ui/icons/Whatshot'

const list = css`
  width: 190px;
`

const jump = (link: string) => () => {
  navigate(link)
}

interface ItemProps {
  icon: React.ReactElement<any>
  text: string
  onClick: () => void
}

const Item: React.SFC<ItemProps> = ({ icon, text, onClick }) => (
  <ListItem button onClick={onClick}>
    <ListItemIcon>{icon}</ListItemIcon>
    <ListItemText primary={text} />
  </ListItem>
)

interface Props {
  isLogIn: boolean
  open: boolean
  onClose: () => void
  onLogout: () => void
}

const TopBar: React.SFC<Props> = ({ isLogIn, open, onClose, onLogout, children }) => (
  <Drawer open={open} onClose={onClose}>
    <List className={list} onClick={onClose}>
      {children}
      <Divider />
      <Item icon={<HomeIcon />} text="主页" onClick={jump('/')} />
      <Item icon={<Whatshot />} text="热门" onClick={jump('/hotTopic')} />
      <Item icon={<FiberNew />} text="新帖" onClick={jump('/newTopic')} />
      <Item icon={<AspectRatio />} text="版面" onClick={jump('/boardList')} />
      <Item icon={<Settings />} text="个性化" onClick={jump('/setting')} />
      {isLogIn && (
        <>
          <Item icon={<DashBoard />} text="我的关注" onClick={jump('/myFollow')} />
          <Item icon={<DashBoard />} text="个人中心" onClick={jump('/userCenter')} />
          <Item icon={<SpeakerNotes />} text="私信" onClick={jump('/messageList')} />
          <Item icon={<ExitToApp />} text="登出" onClick={onLogout} />
        </>
      )}
    </List>
  </Drawer>
)

export default TopBar
