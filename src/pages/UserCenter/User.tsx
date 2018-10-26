import { DELETE, PUT } from '@/utils/fetch';
import { ITopic, IUser } from '@cc98/api'
import UBB from '@cc98/ubb-react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CardHeader from '@material-ui/core/CardHeader'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { StyleRules, withStyles } from '@material-ui/core/styles'
import { ClassNameMap } from '@material-ui/core/styles/withStyles'
import { navigate } from '@reach/router';
import { css } from 'emotion'
import React from 'react'
import Topics from './Topics'

interface Props {
  info: IUser
  isUserCenter: boolean
}

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
    borderTop: '#eaeaea solid thin',
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
    color: 'rgba(0, 0, 0, 0.54)',
    fontSize: '0.8rem',
  },
  secondary: {
    color: 'rgba(0, 0, 0, 0.87)',
  },
}
const UserNameStyle = css`
  && {
    font-size: 1.5rem;
  }
`
const UserStyle = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
`
const OptionStyle = css`
  && {
    width: 100%;
  }
`
interface State {
  buttonInfo: string
  disabled: boolean
  isFollowing: boolean
}
interface ClassNameProps {
  classes: ClassNameMap
}
export default withStyles(styles)(
  class extends React.Component<Props & ClassNameProps, State> {
    constructor(props: Props & ClassNameProps) {
      super(props);
      this.state = {
        buttonInfo: props.info.isFollowing ? '取关' : '关注',
        disabled: false,
        isFollowing: props.info.isFollowing,
      }
    }
    changeFollowStatus = async () => {
      const { info } = this.props;
      const { isFollowing } = this.state;
      this.setState({
        buttonInfo: '...',
        disabled: true,
      })
      const url = `/me/followee/${info.id}`;
      if (isFollowing) {
        const unfollowTry = await DELETE(url);
        unfollowTry
          .fail(
            () => this.setState({
              buttonInfo: '取关失败',
              disabled: false,
            })
          )
          .succeed(
            () => this.setState({
              buttonInfo: '关注',
              disabled: false,
              isFollowing: false,
            })
          )
      } else {
        const followTry = await PUT(url)
        followTry
          .fail(
            () => this.setState({
              buttonInfo: '关注失败',
              disabled: false,
            })
          )
          .succeed(
            () => this.setState({
              buttonInfo: '取关',
              disabled: false,
              isFollowing: true,
            })
          )
      }
    }
    render() {
      const { classes, info, isUserCenter } = this.props;
      const { buttonInfo, disabled } = this.state;
      const followBtn = (
        <Button
          onClick={this.changeFollowStatus}
          disabled={disabled}
          variant="contained"
          color="primary"
        >{buttonInfo}
        </Button>
      );
      const editBtn = (
        <Button
          onClick={() => { navigate('/userCenter/edit') }}
          variant="contained"
          color="primary"
        >
          编辑
        </Button>
      )
      if (info) {
        return (
          <div className={UserStyle}>

            <CardHeader
              className={classes.row}
              classes={{ action: classes.action }}
              avatar={<Avatar className={classes.bigAvatar} src={info.portraitUrl} />}
              title={<div className={UserNameStyle}>{info.name}</div>}
              action={
                <div>
                  {isUserCenter ? editBtn : followBtn}
                  {!isUserCenter ? <Button variant="contained" color="primary">私信</Button> : null}
                </div>
              }
            />

            <List className={OptionStyle}>
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
    }
  }
)
