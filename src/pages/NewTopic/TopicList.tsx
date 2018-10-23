import { navigate } from '@reach/router'
import React from 'react'

import InfinitiList from '@/components/InfinitiList'
import { List } from '@material-ui/core'
import TpoicItem from './TopicItem'

import { GET } from '@/utils/fetch'
import { ITopic } from '@cc98/api'

interface State {
  topicList: ITopic[]

  from: number
  size: number

  isLoading: boolean
  isEnd: boolean
}

class TopicList extends React.Component<{}, State> {
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
      <InfinitiList isLoading={isLoading} isEnd={isEnd} callback={this.fetchTopics}>
        <List>
          {topicList.map(info => (
            <TpoicItem key={info.id} info={info} click={this.jump2Post} />
          ))}
        </List>
      </InfinitiList>
    )
  }
}

export default TopicList
