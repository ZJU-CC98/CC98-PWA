import React from 'react'

import { GET } from '../../utils/fetch'
import { IHotTopic } from 'api'

import TpoicItem from './TopicItem'

type State = {
  hotTopic: IHotTopic[]
}

class TopicList extends React.Component<{}, State> {

  state: State = {
    hotTopic: []
  }

  async componentDidMount() {
    const hotTopic = await GET<IHotTopic[]>('topic/hot')

    this.setState({
      hotTopic
    })
  }

  render() {
    return (
      <>
        {
          this.state.hotTopic.map((info) => (
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
