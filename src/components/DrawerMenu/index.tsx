import React from 'react'
import { navigate } from '@/utils/history'
import styled from 'styled-components'

import useContainer from '@/hooks/useContainer'
import userInstance from '@/containers/user'
import stateInstance from '@/containers/state'

import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'

import AspectRatio from '@material-ui/icons/AspectRatio'
import Book from '@material-ui/icons/Book'
import ExitToApp from '@material-ui/icons/ExitToApp'
import FiberNew from '@material-ui/icons/FiberNew'
import HomeIcon from '@material-ui/icons/Home'
import Search from '@material-ui/icons/Search'
import Settings from '@material-ui/icons/Settings'
import Subject from '@material-ui/icons/Subject'
import SpeakerNotes from '@material-ui/icons/SpeakerNotes'
import Whatshot from '@material-ui/icons/Whatshot'

import UserInfo from './UserInfo'

interface ItemProps {
  /**
   * 图标
   */
  // tslint:disable-next-line:no-any
  icon: React.ReactElement<any>
  /**
   * 文字
   */
  text: string
  /**
   * 单击回调
   */
  onClick: () => void
}

const Item: React.FunctionComponent<ItemProps> = ({ icon, text, onClick }) => (
  <ListItem button onClick={onClick}>
    <ListItemIcon>{icon}</ListItemIcon>
    <ListItemText primary={text} />
  </ListItem>
)

const ListS = styled(List)`
  && {
    width: 190px;
  }
`

const DividerS = styled(Divider)`
  && {
    margin: 0 16px;
    height: 1.5px;
  }
`

const jump = (link: string) => () => navigate(link)

const DrawerMenu: React.FunctionComponent = () => {
  const { state: user, LOG_OUT } = useContainer(userInstance)
  const { state, CLOSE_DRAWER } = useContainer(stateInstance)

  return (
    <Drawer open={state.isDrawerOpen} onClose={CLOSE_DRAWER}>
      <ListS onClick={CLOSE_DRAWER}>
        <UserInfo isLogIn={user.isLogIn} info={user.myInfo} />
        <DividerS />
        <Item icon={<HomeIcon />} text="主页" onClick={jump('/')} />
        <Item icon={<Whatshot />} text="热门" onClick={jump('/hotTopics')} />
        <Item icon={<FiberNew />} text="新帖" onClick={jump('/newTopics')} />
        <Item icon={<AspectRatio />} text="版面" onClick={jump('/boardList')} />
        {user.isLogIn && (
          <>
            <Item icon={<Book />} text="关注" onClick={jump('/myFollow')} />
            <Item icon={<SpeakerNotes />} text="私信" onClick={jump('/messageList')} />
            <Item icon={<Search />} text="搜索" onClick={jump('/search')} />
            <Item icon={<ExitToApp />} text="登出" onClick={LOG_OUT} />
          </>
        )}
        <Item icon={<Settings />} text="设置" onClick={jump('/setting')} />
        <Item icon={<Subject />} text="关于" onClick={jump('/about')} />
      </ListS>
    </Drawer>
  )
}

export default DrawerMenu
