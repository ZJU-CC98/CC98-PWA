import InfinitiList from '@/components/InfinitiList'
import getBoardNameById from '@/services/getBoardName'
import { GET } from '@/utils/fetch'
import { ITopic, IUser } from '@cc98/api'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import { StyleRules, withStyles } from '@material-ui/core/styles'
import { ClassNameMap } from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { css } from 'emotion'
import React from 'react'
import TopicItem from './TopicItem'

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

const ExpandPanelSummaryStyle = css`
  && {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 1rem;
    margin: 0 0 0 0;
  }
`

interface Props {
  info: IUser
}

interface State {
  recentTopics: ITopic[]
  isLoading: boolean
  isEnd: boolean
  from: number
  size: number
}
export default withStyles(styles)(
  class extends React.Component<Props & { classes: ClassNameMap }, State> {
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
          // console.log(newRecentTopics)
          this.setState({
            recentTopics: recentTopics.concat(newRecentTopics),
            from: from + newRecentTopics.length,
            isLoading: false,
            isEnd: size !== newRecentTopics.length,
          })
        })
      }
    }

    render() {
      const { classes } = this.props
      const { isLoading, isEnd, recentTopics } = this.state

      return (
        <ExpansionPanel
          classes={{ expanded: classes.expanded, root: classes.expandRoot }}
          defaultExpanded={true}
        >
          <ExpansionPanelSummary
            style={{ maxHeight: '30px', minHeight: '30px' }}
            className={ExpandPanelSummaryStyle}
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography>发表主题</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails classes={{ root: classes.expandDetailRoot }}>
            <InfinitiList isLoading={isLoading} isEnd={isEnd} callback={this.getRecentTopics}>
              {recentTopics.map(topic => (
                <TopicItem key={topic.id} data={topic} />
              ))}
            </InfinitiList>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      )
    }
  }
)
