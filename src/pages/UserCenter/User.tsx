import React, { useState } from 'react'

import { navigate } from '@reach/router'
import { css } from 'emotion'

import {
  Avatar,
  Button,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core'
import { StyleRules, withStyles } from '@material-ui/core/styles'
import { ClassNameMap } from '@material-ui/core/styles/withStyles'

import Topics from './Topics'
import { followUser, unFollowUser } from '@/services/user'
import { IUser } from '@cc98/api'

const styles: StyleRules = {
  root: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  itemRoot: {
    paddingTop: 3,
    paddingBottom: 3,
  },
  bigAvatar: {
    width: '5rem',
    height: '5rem',
  },
  action: {
    alignSelf: 'center',
    marginTop: 0,
    marginBottom: 0,
  },
  primary: {
    width: '5rem',
    marginRight: '2rem',
    opacity: 0.54,
    fontSize: '0.8rem',
  },
  secondary: {
    opacity: 0.54,
  },
}
const userNameStyle = css`
  && {
    font-size: 1.5rem;
  }
`
const userStyle = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
`
const optionStyle = css`
  && {
    width: 100%;
  }
`
const actionStyle = css`
  display: flex;
  justify-content: flex-end;
`
const btnStyle = css`
  && {
    margin-right: 10px;
    margin-left: 10px;
  }
`
interface State {
  buttonInfo: string
  disabled: boolean
  isFollowing: boolean
}

interface Props {
  info: IUser
  isUserCenter: boolean
  classes: ClassNameMap
}

export default withStyles(styles)((props: Props) => {
  const { classes, info, isUserCenter } = props
  const [state, setState] = useState<State>({
    buttonInfo: props.info.isFollowing ? '取关' : '关注',
    disabled: false,
    isFollowing: props.info.isFollowing,
  })
  const { buttonInfo, disabled, isFollowing } = state

  const changeFollowStatus = async () => {
    setState({
      ...state,
      buttonInfo: '...',
      disabled: true,
    })
    if (isFollowing) {
      const unfollowTry = await unFollowUser(info.id)
      unfollowTry
        .fail(() =>
          setState({
            ...state,
            buttonInfo: '取关失败',
            disabled: false,
          })
        )
        .succeed(() =>
          setState({
            buttonInfo: '关注',
            disabled: false,
            isFollowing: false,
          })
        )
    } else {
      const followTry = await followUser(info.id)
      followTry
        .fail(() =>
          setState({
            ...state,
            buttonInfo: '关注失败',
            disabled: false,
          })
        )
        .succeed(() =>
          setState({
            buttonInfo: '取关',
            disabled: false,
            isFollowing: true,
          })
        )
    }
  }
  const followBtn = (
    <Button
      className={btnStyle}
      onClick={changeFollowStatus}
      disabled={disabled}
      variant="contained"
      color="primary"
    >
      {buttonInfo}
    </Button>
  )
  const editBtn = (
    <Button
      className={btnStyle}
      onClick={() => {
        navigate('/userCenter/edit')
      }}
      variant="contained"
      color="primary"
    >
      编辑
    </Button>
  )
  if (info) {
    return (
      <div className={userStyle}>
        <CardHeader
          className={classes.row}
          classes={{ action: classes.action }}
          avatar={<Avatar className={classes.bigAvatar} src={info.portraitUrl} />}
          title={<div className={userNameStyle}>{info.name}</div>}
          action={
            <div className={actionStyle}>
              {isUserCenter ? editBtn : followBtn}
              {!isUserCenter ? (
                <Button variant="contained" color="primary">
                  私信
                </Button>
              ) : null}
            </div>}
        />

        <List className={optionStyle}>
          <Divider />
          <ListItem classes={{ root: classes.itemRoot }}>
            <ListItemText
              classes={{
                root: classes.root,
                primary: classes.primary,
                secondary: classes.secondary,
              }}
              primary="性别"
              secondary={info.gender === 1 ? '男' : '女'}
            />
          </ListItem>
          <ListItem classes={{ root: classes.itemRoot }}>
            <ListItemText
              classes={{
                root: classes.root,
                primary: classes.primary,
                secondary: classes.secondary,
              }}
              primary="发帖"
              secondary={info.postCount}
            />
          </ListItem>
          <ListItem classes={{ root: classes.itemRoot }}>
            <ListItemText
              classes={{
                root: classes.root,
                primary: classes.primary,
                secondary: classes.secondary,
              }}
              primary="粉丝"
              secondary={info.fanCount}
            />
          </ListItem>
          <ListItem classes={{ root: classes.itemRoot }}>
            <ListItemText
              classes={{
                root: classes.root,
                primary: classes.primary,
                secondary: classes.secondary,
              }}
              primary="财富值"
              secondary={info.wealth}
            />
          </ListItem>
          <ListItem classes={{ root: classes.itemRoot }}>
            <ListItemText
              classes={{
                root: classes.root,
                primary: classes.primary,
                secondary: classes.secondary,
              }}
              primary="威望"
              secondary={info.prestige}
            />
          </ListItem>
          <ListItem classes={{ root: classes.itemRoot }}>
            <ListItemText
              classes={{
                root: classes.root,
                primary: classes.primary,
                secondary: classes.secondary,
              }}
              primary="风评"
              secondary={info.popularity}
            />
          </ListItem>
          <ListItem classes={{ root: classes.itemRoot }}>
            <ListItemText
              classes={{
                root: classes.root,
                primary: classes.primary,
                secondary: classes.secondary,
              }}
              primary="注册时间"
              secondary={new Date(info.registerTime).toLocaleString()}
            />
          </ListItem>
          <ListItem classes={{ root: classes.itemRoot }}>
            <ListItemText
              classes={{
                root: classes.root,
                primary: classes.primary,
                secondary: classes.secondary,
              }}
              primary="最后登录"
              secondary={new Date(info.lastLogOnTime).toLocaleString()}
            />
          </ListItem>
          <ListItem classes={{ root: classes.itemRoot }}>
            <ListItemText
              classes={{
                root: classes.root,
                primary: classes.primary,
                secondary: classes.secondary,
              }}
              primary="生日"
              secondary={new Date(info.birthday).toLocaleDateString()}
            />
          </ListItem>
          <ListItem classes={{ root: classes.itemRoot }}>
            <ListItemText
              classes={{
                root: classes.root,
                primary: classes.primary,
                secondary: classes.secondary,
              }}
              primary="邮箱"
              secondary={info.emailAddress}
            />
          </ListItem>
          <ListItem classes={{ root: classes.itemRoot }}>
            <ListItemText
              classes={{
                root: classes.root,
                primary: classes.primary,
                secondary: classes.secondary,
              }}
              primary="QQ"
              secondary={info.qq}
            />
          </ListItem>
          <ListItem classes={{ root: classes.itemRoot }}>
            <ListItemText
              classes={{
                root: classes.root,
                primary: classes.primary,
                secondary: classes.secondary,
              }}
              primary="被删帖数"
              secondary={info.deleteCount}
            />
          </ListItem>
          <Divider />
        </List>

        <Topics info={info} />
      </div>
    )
  }

  return null
})
