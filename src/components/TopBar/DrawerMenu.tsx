import { navigate } from '@reach/router'
import { css } from 'emotion'
import React from 'react'

import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'

import AspectRatio from '@material-ui/icons/AspectRatio'
import Book from '@material-ui/icons/Book'
import CheckCircleOutline from '@material-ui/icons/CheckCircleOutline'
import Dashboard from '@material-ui/icons/Dashboard'
import ExitToApp from '@material-ui/icons/ExitToApp'
import FiberNew from '@material-ui/icons/FiberNew'
import HomeIcon from '@material-ui/icons/Home'
import Search from '@material-ui/icons/Search'
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
  // tslint:disable-next-line:no-any
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

const DividerStyle = css`&&{
  margin-left:16px;
  margin-right:16px;
  margin-top:-6px;
  height:1.5px;
}`

const TopBar: React.SFC<Props> = ({ isLogIn, open, onClose, onLogout, children }) => (
  <Drawer open={open} onClose={onClose}>
    <List className={list} onClick={onClose}>
      {children}
      <Divider className={DividerStyle} />
      <Item icon={<HomeIcon />} text="主页" onClick={jump('/')} />
      <Item icon={<Whatshot />} text="热门" onClick={jump('/hotTopics')} />
      <Item icon={<FiberNew />} text="新帖" onClick={jump('/newTopics')} />
      <Item icon={<AspectRatio />} text="版面" onClick={jump('/boardList')} />
      <Item icon={<Settings />} text="个性化" onClick={jump('/setting')} />
      {isLogIn && (
        <>
          <Item icon={<Book />} text="我的关注" onClick={jump('/myFollow')} />
          <Item icon={<SpeakerNotes />} text="私信" onClick={jump('/messageList')} />
          <Item icon={<Search />} text="搜索" onClick={jump('/search')} />
          <Item icon={<CheckCircleOutline />} text="签到" onClick={jump('/signin')} />
          <Item icon={<ExitToApp />} text="登出" onClick={onLogout} />
        </>
      )}
    </List>
  </Drawer>
)

export default TopBar
