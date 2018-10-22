import React from 'react'
import { navigate } from '@reach/router'

import { GET } from '@/utils/fetch'
import { IHotTopic } from '@cc98/api'

import { List } from '@material-ui/core'
import LoadingCircle from '@/components/LoadingCircle'
import HotTopicItem from './HotTopicItem'

type State = {
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

    const hotTopics = await GET<IHotTopic[]>('topic/hot')

    hotTopics.fail().succeed(hotTopics => {
      this.setState({
        hotTopics,
        isLoading: false,
      })
    })
  }

  jump2Post(topicID: number) {
    navigate('/topic/' + topicID)
  }

  render() {
    const { hotTopics, isLoading } = this.state
    if (isLoading) {
      return <LoadingCircle />
    }

    return (
      <List>
        {hotTopics.map(info => (
          <HotTopicItem key={info.id} info={info} click={this.jump2Post} />
        ))}
      </List>
    )
  }
}

export default TopicList
