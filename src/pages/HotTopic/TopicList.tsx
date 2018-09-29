import React from 'react'

import { GET } from '../../utils/fetch'
import { IHotTopic } from 'api'

import TpoicItem from './TopicItem'

type State = {
  hotTopics: IHotTopic[]
}

class TopicList extends React.Component<{}, State> {

  state: State = {
    hotTopics: []
  }

  async componentDidMount() {
    const hotTopics = await GET<IHotTopic[]>('topic/hot')
    // TODO: error handle

    this.setState({
      hotTopics
    })
  }

  render() {
    return (
      <>
        {
          this.state.hotTopics.map((info) => (
            <TpoicItem
              key={info.id}
              info={info}
            />
          ))
        }
      </>
    )
  }
}

export default TopicList
