import React, { useState, useEffect } from 'react'
import { navigate } from '@reach/router'
import { css } from 'emotion'

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

import { getSignState, sign } from '@/services/global'

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

interface Props {
  isLogIn: boolean
  open: boolean
  onClose: () => void
  onLogout: () => void
}

const TopBar: React.FunctionComponent<Props> = ({ isLogIn, open, onClose, onLogout, children }) => {
  const [signState, setSignState] = useState(false)
  useEffect(() => {
    ; (async () => {
      await freshSignState()
    })()
  }, [])
  async function signAction() {
    await sign()
    await freshSignState()
  }
  async function freshSignState() {
    const res = await getSignState()
    res.fail().succeed(data => setSignState(data.hasSignedInToday))
  }

  return (
    <Drawer open={open} onClose={onClose}>
      <List className={list} onClick={onClose}>
        {children}
        <Divider className={divider} />
        <Item icon={<HomeIcon />} text="主页" onClick={jump('/')} />
        <Item icon={<Whatshot />} text="热门" onClick={jump('/hotTopics')} />
        <Item icon={<FiberNew />} text="新帖" onClick={jump('/newTopics')} />
        <Item icon={<AspectRatio />} text="版面" onClick={jump('/boardList')} />
        {isLogIn && (
          <>
            <Item icon={<Book />} text="关注" onClick={jump('/myFollow')} />
            <Item icon={<SpeakerNotes />} text="私信" onClick={jump('/messageList')} />
            <Item icon={<Search />} text="搜索" onClick={jump('/search')} />
            {/* TODO  签到后不关闭窗口 登出后刷新状态 状态转移到全局 */}
            <Item
              icon={<CheckCircleOutline />}
              text={signState ? '已签到' : '签到'}
              onClick={signState ? () => null : () => signAction()}
            />
            <Item icon={<ExitToApp />} text="登出" onClick={onLogout} />
          </>
        )}
        <Item icon={<Settings />} text="设置" onClick={jump('/setting')} />
        <Item icon={<Subject />} text="关于" onClick={jump('/about')} />
      </List>
    </Drawer>
  )
}

export default TopBar
