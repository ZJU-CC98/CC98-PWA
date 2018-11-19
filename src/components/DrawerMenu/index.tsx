import React, { useState, useEffect } from 'react'
import { navigate } from '@reach/router'
import { css } from 'emotion'

import { useGlobalContainer } from '@/hooks/useContainer'
import userInstance from '@/containers/user'
import stateInstance from '@/containers/state'

import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'

import AspectRatio from '@material-ui/icons/AspectRatio'
import Book from '@material-ui/icons/Book'
import CheckCircleOutline from '@material-ui/icons/CheckCircleOutline'
import ExitToApp from '@material-ui/icons/ExitToApp'
import FiberNew from '@material-ui/icons/FiberNew'
import HomeIcon from '@material-ui/icons/Home'
import Search from '@material-ui/icons/Search'
import Settings from '@material-ui/icons/Settings'
import Subject from '@material-ui/icons/Subject'
import SpeakerNotes from '@material-ui/icons/SpeakerNotes'
import Whatshot from '@material-ui/icons/Whatshot'

import UserInfo from './UserInfo'

import { getSignState, signIn } from '@/services/global'

const jump = (link: string) => () => {
  navigate(link)
}

const list = css`
  width: 190px;
`

const divider = css`
  && {
    margin: 0 16px;
    height: 1.5px;
  }
`

interface ItemProps {
  // tslint:disable-next-line:no-any
  icon: React.ReactElement<any>
  text: string
  onClick: () => void
}

const Item: React.FunctionComponent<ItemProps> = ({ icon, text, onClick }) => (
  <ListItem button onClick={onClick}>
    <ListItemIcon>{icon}</ListItemIcon>
    <ListItemText primary={text} />
  </ListItem>
)

const DrawerMenu: React.FunctionComponent = () => {
  // 今日是否已经签到
  const [hasSigned, setHasSigned] = useState(false)

  const { state: user, LOG_OUT } = useGlobalContainer(userInstance)
  const { state, CLOSE_DRAWER } = useGlobalContainer(stateInstance)

  useEffect(() => {
    if (user.isLogIn) {
      getSignState().then(res => {
        res.fail().succeed(signIn => setHasSigned(signIn.hasSignedInToday))
      })
    }
  }, [])

  const signOnClick = async () => {
    if (hasSigned) {
      return
    }

    const res = await signIn()
    res.fail().succeed(_ => setHasSigned(true))
  }

  return (
    <Drawer open={state.isDrawerOpen} onClose={CLOSE_DRAWER}>
      <List className={list} onClick={CLOSE_DRAWER}>
        <UserInfo isLogIn={user.isLogIn} info={user.myInfo} />

        <Divider className={divider} />
        <Item icon={<HomeIcon />} text="主页" onClick={jump('/')} />
        <Item icon={<Whatshot />} text="热门" onClick={jump('/hotTopics')} />
        <Item icon={<FiberNew />} text="新帖" onClick={jump('/newTopics')} />
        <Item icon={<AspectRatio />} text="版面" onClick={jump('/boardList')} />
        {user.isLogIn && (
          <>
            <Item icon={<Book />} text="关注" onClick={jump('/myFollow')} />
            <Item icon={<SpeakerNotes />} text="私信" onClick={jump('/messageList')} />
            <Item icon={<Search />} text="搜索" onClick={jump('/search')} />

            <Item
              icon={<CheckCircleOutline />}
              text={hasSigned ? '已签到' : '签到'}
              onClick={signOnClick}
            />
            <Item icon={<ExitToApp />} text="登出" onClick={LOG_OUT} />
          </>
        )}
        <Item icon={<Settings />} text="设置" onClick={jump('/setting')} />
        <Item icon={<Subject />} text="关于" onClick={jump('/about')} />
      </List>
    </Drawer>
  )
}

export default DrawerMenu
