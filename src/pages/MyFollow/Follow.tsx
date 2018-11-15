import React from 'react'
import { css } from 'emotion'

import { TopicInfoStore } from '@/model/topic'

import TopicItem from '@/components/TopicItem'
import InfiniteList from '@/components/InfiniteList'

import { List, Paper, Tab, Tabs } from '@material-ui/core'

import { Theme, withStyles } from '@material-ui/core/styles'
import { ClassNameMap } from '@material-ui/core/styles/withStyles'
import { GET } from '@/utils/fetch'
import { IBoardGroup, ITopic } from '@cc98/api'
import { getBoardNameById } from '@/services/board'

interface Props {
  boards: IBoardGroup[]
  classes: ClassNameMap
  topicInstance: TopicInfoStore
}
interface State {
  isLoading: boolean
  isEnd: boolean
  b_topics: ITopic[]
  b_from: number
  u_topics: ITopic[]
  u_from: number
  current: string
}

const indexStyle = css`
  && {
    min-height: 90vh;
  }
`

const styles = (theme: Theme) => ({
  root: {
    color: theme.palette.primary.main,
  },
})

export default withStyles(styles)(
  class extends React.Component<Props, State> {
    state: State = {
      isLoading: false,
      isEnd: false,
      b_topics: [],
      b_from: 0,
      u_topics: [],
      u_from: 0,
      current: 'board',
    }

    componentDidMount() {
      if (this.state.current === 'board') {
        this.getFollowBoardTopics()
      } else {
        this.getFolloweeTopics()
      }
    }

    changeFocus = () => {
      if (this.state.current === 'board') {
        this.getFolloweeTopics()
      } else {
        this.getFollowBoardTopics()
      }
      this.setState({
        current: this.state.current === 'board' ? 'user' : 'board',
      })
    }

    getFollowBoardTopics = async () => {
      const { b_from } = this.state
      const { boards } = this.props
      this.setState({
        isLoading: true,
      })

      const topicsTry = await GET<ITopic[]>(`me/custom-board/topic?from=${b_from}&size=20`)
      topicsTry.map(async topicList => {
        // tslint:disable-next-line:prefer-array-literal
        topicList.map(topic => (topic.boardName = getBoardNameById(boards, topic.boardId)))
        this.setState({
          b_topics: this.state.b_topics.concat(topicList),
          b_from: b_from + topicList.length,
          isLoading: false,
          isEnd: topicList.length !== 20,
        })
      })
    }

    getFolloweeTopics = async () => {
      const { u_from } = this.state
      const { boards } = this.props
      this.setState({
        isLoading: true,
      })

      const topicsTry = await GET<ITopic[]>(`me/followee/topic?from=${u_from}&size=20`)
      topicsTry.map(async topicList => {
        // tslint:disable-next-line:prefer-array-literal
        topicList.map(topic => (topic.boardName = getBoardNameById(boards, topic.boardId)))
        this.setState({
          u_topics: this.state.u_topics.concat(topicList),
          u_from: u_from + topicList.length,
          isLoading: false,
          isEnd: topicList.length !== 20,
        })
      })
    }

    render() {
      const { isLoading, isEnd, b_topics, u_topics, current } = this.state
      const { classes } = this.props
      const topics = current === 'board' ? b_topics : u_topics

      return (
        <div>
          <Paper className={indexStyle}>
            <Tabs fullWidth value={current} onChange={this.changeFocus}>
              <Tab classes={{ root: classes.root }} value="board" label="关注版面" />
              <Tab classes={{ root: classes.root }} value="user" label="关注用户" />
            </Tabs>

            <InfiniteList
              isLoading={isLoading}
              isEnd={isEnd}
              callback={current === 'board' ? this.getFollowBoardTopics : this.getFolloweeTopics}
            >
              <List>
                {topics.map(topic => (
                  <TopicItem key={topic.id} data={topic} place={'follow'} />
                ))}
              </List>
            </InfiniteList>
          </Paper>
        </div>
      )
    }
  }
)
