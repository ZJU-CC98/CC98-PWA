import { navigate } from '@reach/router'
import React from 'react'

import InfiniteList from '@/components/InfiniteList'
import { List } from '@material-ui/core'
import TopicItem from '../TopicItem'

import getBoardName from '@/services/getBoardName'
import { GET } from '@/utils/fetch'
import { IBaseBoard, ITopic } from '@cc98/api'
interface Props {
  boards: IBaseBoard[]
}
interface State {
  topicList: ITopic[]

  from: number
  size: number

  isLoading: boolean
  isEnd: boolean
}

class TopicList extends React.Component<Props, State> {
  state: State = {
    topicList: [],
    from: 0,
    size: 15,

    isLoading: false,
    isEnd: false,
  }

  async componentDidMount() {
    this.fetchTopics()
  }

  fetchTopics = async () => {
    const { from, size } = this.state

    this.setState({
      isLoading: true,
    })

    const posts = await GET<ITopic[]>(`topic/new?from=${from}&size=${size}`)

    posts.map(topicList => {
      topicList.map(
        topic =>
          topic.boardName = getBoardName(this.props.boards, topic.boardId)
      )
      this.setState({
        topicList: this.state.topicList.concat(topicList),
        from: from + topicList.length,

        isLoading: false,
        isEnd: topicList.length !== size,
      })
    })
  }

  jump2Post(topicID: number) {
    navigate(`/topic/${topicID}`)
  }

  render() {
    const { topicList, isLoading, isEnd } = this.state

    return (
      <InfiniteList isLoading={isLoading} isEnd={isEnd} callback={this.fetchTopics}>
        <List>
          {topicList.map(info => (
            <TopicItem key={info.id} data={info} place={'newtopic'} />
          ))}
        </List>
      </InfiniteList>
    )
  }
}

export default TopicList
