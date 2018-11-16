import React, { useState, useEffect } from 'react'
import { css } from 'emotion'

import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  List,
  Typography,
} from '@material-ui/core'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import { StyleRules, withStyles } from '@material-ui/core/styles'
import { ClassNameMap } from '@material-ui/core/styles/withStyles'

import InfiniteList from '@/components/InfiniteList'
import TopicItem from '@/components/TopicItem'

import { getUsersRecentTopics } from '@/services/topic'
import { ITopic, IUser } from '@cc98/api'
import { getBoardNameById } from '@/services/board'

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
  classes: ClassNameMap
}

interface State {
  isLoading: boolean
  isEnd: boolean
  from: number
}

export default withStyles(styles)((props: Props) => {
  const [state, setState] = useState<State>({
    isLoading: false,
    isEnd: false,
    from: 0,
  })
  const [topics, setTopics] = useState<ITopic[]>([])
  const { info, classes } = props
  const { isLoading, isEnd, from } = state

  useEffect(() => {
    ;(async () => {
      getRecentTopics()
    })()
  }, [])

  const getRecentTopics = async () => {
    setState({ ...state, isLoading: true })
    if (info) {
      const recentTopicsData = await getUsersRecentTopics(info.id, from)
      recentTopicsData.fail().succeed(async (newRecentTopics: ITopic[]) => {
        newRecentTopics.forEach(async topic => {
          topic.boardName = await getBoardNameById(topic.boardId)
        })
        setTopics(prevTopics => prevTopics.concat(newRecentTopics))
        setState({
          from: from + newRecentTopics.length,
          isLoading: false,
          isEnd: 10 !== newRecentTopics.length,
        })
      })
    }
  }

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
        <InfiniteList isLoading={isLoading} isEnd={isEnd} callback={getRecentTopics}>
          <List>
            {topics.map(topic => (
              <TopicItem key={topic.id} data={topic} place={'usercenter'} />
            ))}
          </List>
        </InfiniteList>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
})
