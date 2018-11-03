import { navigate } from '@reach/router'
import React from 'react'

import { GET } from '@/utils/fetch'
import { IHotTopic } from '@cc98/api'

import LoadingCircle from '@/components/LoadingCircle'
import { List } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import HotTopicItem from './HotTopicItem'
interface State {
  hotTopics: IHotTopic[]
  isLoading: boolean
}

class TopicList extends React.Component<{}, State> {
  state: State = {
    hotTopics: [],
    isLoading: false,
  }

  async componentDidMount() {
    this.setState({
      isLoading: true,
    })

    const res = await GET<IHotTopic[]>('topic/hot')

    res.fail().succeed(hotTopics => {
      this.setState({
        hotTopics,
        isLoading: false,
      })
    })
  }

  jump2Post(topicID: number) {
    navigate(`/topic/${topicID}`)
  }

  render() {
    const { hotTopics, isLoading } = this.state
    if (isLoading) {
      return <LoadingCircle />
    }

    return (
      <Paper>
      <List>
        {hotTopics.map(info => (
          <HotTopicItem key={info.id} info={info} click={this.jump2Post} />
        ))}
      </List>
      </Paper>
    )
  }
}

export default TopicList
