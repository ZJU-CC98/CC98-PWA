import React from 'react'
import CardHeader from '@material-ui/core/CardHeader'
import Avatar from '@material-ui/core/Avatar'
import { GET } from '@/utils/fetch'
import { IUser, ITopic } from '@cc98/api'
import { css } from 'emotion'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import UBB from '@cc98/ubb-react'
import InfinitiList from '@/components/InfinitiList'
import getBoardNameById from '@/utils/getBoardName'
import { navigate } from '@reach/router'
type Props = {
  info: IUser,
  isUserCenter:boolean
}
type State = {
  recentTopics: ITopic[]
  isLoading: boolean
  isEnd: boolean
  from: number
  size: number
}
const styles = {
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
  expanded: {
    marginTop: '0.5rem',
    marginBottom: '0.5rem',
  },
  expandRoot: {
    width: '100%',
    margin: '0 0 0 0',
  },
  expandDetailRoot: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    padding: '0 0 0 0 ',
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
const ExpandPanelSummaryStyle = css`
  && {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 1rem;
    margin: 0 0 0 0;
  }
`
export default withStyles(styles)(
  class extends React.Component<Props & { classes: any }, State> {
    state: State = {
      recentTopics: [],
      isLoading: false,
      isEnd: false,
      from: 0,
      size: 10,
    }
    componentDidMount() {
      this.getRecentTopics()
    }
    getRecentTopics = async () => {
      const { info } = this.props
      this.setState({ isLoading: true })
      const { from, recentTopics, size } = this.state
      if (info) {
        const recentTopicsData = await GET<ITopic[]>(
          `/user/${info.id}/recent-topic?from=${from}&size=10`
        )
        recentTopicsData.fail().succeed(async (newRecentTopics: ITopic[]) => {
          newRecentTopics.forEach(async topic => {
            const boardName = await getBoardNameById(topic.boardId)
            topic.boardName = boardName
          })
          console.log(newRecentTopics)
          this.setState({
            recentTopics: recentTopics.concat(newRecentTopics),
            from: from + newRecentTopics.length,
            isLoading: false,
            isEnd: size !== newRecentTopics.length,
          })
        })
      }
    }
<<<<<<< HEAD

  }
  render() {
    const { classes, info,isUserCenter } = this.props;
    const { isLoading, isEnd, recentTopics } = this.state;
    if (info)
      return (
        <div className={UserStyle}>
          <CardHeader className={classes.row} classes={{ action: classes.action }}
            avatar={
              <Avatar className={classes.bigAvatar} src={info.portraitUrl} />
            }
            title={<div className={UserNameStyle}>{info.name}</div>}
            action={
            <div>
              <Button color="primary">{isUserCenter?"编辑":"关注"}</Button>
              {!isUserCenter?<Button color="primary">私信</Button>:null}
              </div>
              }
          />
          <List className={OptionStyle}>
            <Divider />
            <ListItem classes={{ root: classes.itemRoot }}>
              <ListItemText classes={{ root: classes.root, primary: classes.primary, secondary: classes.secondary }} primary="性别" secondary={info.gender===1?"男":"女"} />
            </ListItem>
            <ListItem classes={{ root: classes.itemRoot }}>
              <ListItemText classes={{ root: classes.root, primary: classes.primary, secondary: classes.secondary }} primary="发帖" secondary={info.postCount} />
            </ListItem>
            <ListItem classes={{ root: classes.itemRoot }}>
              <ListItemText classes={{ root: classes.root, primary: classes.primary, secondary: classes.secondary }} primary="粉丝" secondary={info.fanCount} />
            </ListItem>
            <ListItem classes={{ root: classes.itemRoot }}>
              <ListItemText classes={{ root: classes.root, primary: classes.primary, secondary: classes.secondary }} primary="财富值" secondary={info.wealth} />
            </ListItem>
            <ListItem classes={{ root: classes.itemRoot }}>
              <ListItemText classes={{ root: classes.root, primary: classes.primary, secondary: classes.secondary }} primary="威望" secondary={info.prestige} />
            </ListItem>
            <ListItem classes={{ root: classes.itemRoot }}>
              <ListItemText classes={{ root: classes.root, primary: classes.primary, secondary: classes.secondary }} primary="风评" secondary={info.popularity} />
            </ListItem>
            <ListItem classes={{ root: classes.itemRoot }}>
              <ListItemText classes={{ root: classes.root, primary: classes.primary, secondary: classes.secondary }} primary="注册时间" secondary={new Date(info.registerTime).toLocaleString()} />
            </ListItem>
            <ListItem classes={{ root: classes.itemRoot }}>
              <ListItemText classes={{ root: classes.root, primary: classes.primary, secondary: classes.secondary }} primary="最后登录" secondary={new Date(info.lastLogOnTime).toLocaleString()} />
            </ListItem>
            <ListItem classes={{ root: classes.itemRoot }}>
              <ListItemText classes={{ root: classes.root, primary: classes.primary, secondary: classes.secondary }} primary="生日" secondary={new Date(info.birthday).toLocaleDateString()} />
            </ListItem>
            <ListItem classes={{ root: classes.itemRoot }}>
              <ListItemText classes={{ root: classes.root, primary: classes.primary, secondary: classes.secondary }} primary="邮箱" secondary={info.emailAddress} />
            </ListItem>
            <ListItem classes={{ root: classes.itemRoot }}>
              <ListItemText classes={{ root: classes.root, primary: classes.primary, secondary: classes.secondary }} primary="QQ" secondary={info.qq} />
            </ListItem>
            <ListItem classes={{ root: classes.itemRoot }}>
              <ListItemText classes={{ root: classes.root, primary: classes.primary, secondary: classes.secondary }} primary="被删帖数" secondary={info.deleteCount} />
            </ListItem>
            <Divider />
          </List>
          <ExpansionPanel classes={{ expanded: classes.expanded, root: classes.expandRoot }} defaultExpanded={true}>
            <ExpansionPanelSummary style={{ maxHeight: "30px", minHeight: "30px" }} className={ExpandPanelSummaryStyle} expandIcon={<ExpandMoreIcon />}>
              <Typography >发表主题</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails classes={{root:classes.expandDetailRoot}}>
              <InfinitiList
                isLoading={isLoading}
                isEnd={isEnd}
                callback={this.getRecentTopics}
=======
    render() {
      const { classes, info } = this.props
      const { isLoading, isEnd, recentTopics } = this.state
      if (info)
        return (
          <div className={UserStyle}>
            <CardHeader
              className={classes.row}
              classes={{ action: classes.action }}
              avatar={<Avatar className={classes.bigAvatar} src={info.portraitUrl} />}
              title={<div className={UserNameStyle}>{info.name}</div>}
              action={<Button color="primary">编辑</Button>}
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
            <ExpansionPanel
              classes={{ expanded: classes.expanded, root: classes.expandRoot }}
              defaultExpanded={true}
            >
              <ExpansionPanelSummary
                style={{ maxHeight: '30px', minHeight: '30px' }}
                className={ExpandPanelSummaryStyle}
                expandIcon={<ExpandMoreIcon />}
>>>>>>> 6793fe3b1b7af77bdd39bc11a5a76a6249a1d858
              >
                <Typography>发表主题</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails classes={{ root: classes.expandDetailRoot }}>
                <InfinitiList isLoading={isLoading} isEnd={isEnd} callback={this.getRecentTopics}>
                  {recentTopics.map(topic => (
                    <TopicItem data={topic} />
                  ))}
                </InfinitiList>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </div>
        )
      else return null
    }
  }
)
type TopicProps = {
  data: ITopic
}
const TopicItemRootStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`
const TopicItemMetaStyle = css`
  display: flex;
  width: 100%;
`
const TopicItemTimeStyle = css`
  font-size: 0.8rem;
  margin-left: 2rem;
  color: rgba(0, 0, 0, 0.54);
`
<<<<<<< HEAD
const TopicItemBoardStyle=css`
  font-size :0.8rem;
  color:#35a7ff;
  cursor:pointer;
`
const TopicItemTitleStyle=css`&&{
  width:100%;
  cursor:pointer;
}`

=======
const TopicItemBoardStyle = css`
  font-size: 0.8rem;
  color: #35a7ff;
`
const TopicItemTitleStyle = css`
  && {
    width: 100%;
  }
`
>>>>>>> 6793fe3b1b7af77bdd39bc11a5a76a6249a1d858
const TopicItem = (props: TopicProps) => {
  return (
    <ListItem>
      <div className={TopicItemRootStyle}>
        <div className={TopicItemMetaStyle}>
          <div
            onClick={() => navigate(`/board/${props.data.boardId}`)}
            className={TopicItemBoardStyle}
          >
            {props.data.boardName}
          </div>
          <div className={TopicItemTimeStyle}>{new Date(props.data.time).toLocaleString()}</div>
        </div>
        <div className={TopicItemTitleStyle} onClick={() => navigate(`/topic/${props.data.id}`)}>
          {props.data.title}
        </div>
      </div>
    </ListItem>
  )
}
