import React from 'react'
import { css } from 'emotion'

import { GET } from '@/utils/fetch'
import history from '@/utils/history'
import { IHotTopic } from '@cc98/api'

import {
  List
} from '@material-ui/core'
import TpoicItem from './TopicItem'

const root = css`
  background-color: #fff;
`

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
      .map(hotTopics => {
        this.setState({
          hotTopics
        })
      })
  }

  jump2Post(topicID: number) {
    history.push('/topic/' + topicID)
  }

  render() {
    const { hotTopics } = this.state
    return (
      <div className={root}>
        <List>
          {
            hotTopics.map(info => (
              <TpoicItem
                key={info.id}
                info={info}
                click={this.jump2Post}
              />
            ))
          }
        </List>
      </div>
    )
  }
}

export default TopicList
