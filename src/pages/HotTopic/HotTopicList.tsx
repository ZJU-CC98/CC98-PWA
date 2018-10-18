import React from 'react'
import { navigate } from '@reach/router'

import { GET } from '@/utils/fetch'
import { IHotTopic } from '@cc98/api'

import { List } from '@material-ui/core'
import HotTopicItem from './HotTopicItem'


type State = {
  hotTopics: IHotTopic[]
}

class TopicList extends React.Component<{}, State> {
  state: State = {
    hotTopics: []
  }

  async componentDidMount() {
    const hotTopics = await GET<IHotTopic[]>('topic/hot')

    hotTopics
      .fail()
      .succeed(hotTopics => {
        this.setState({
          hotTopics
        })
      })
  }

  jump2Post(topicID: number) {
    navigate('/topic/' + topicID)
  }

  render() {
    const { hotTopics } = this.state
    return (
      <List>
        {
          hotTopics.map(info => (
            <HotTopicItem
              key={info.id}
              info={info}
              click={this.jump2Post}
            />
          ))
        }
      </List>
    )
  }
}

export default TopicList
