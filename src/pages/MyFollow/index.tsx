import InfinitiList from '@/components/InfinitiList'
import { GET } from '@/utils/fetch';
import { ITopic } from '@cc98/api'
import React from 'react'
import TopicItem from './TopicItem'

interface State {
  isLoading: boolean
  isEnd: boolean
  topics: ITopic[]
  from: number
}
export default class extends React.Component<{}, State> {
  state: State = {
    isLoading: false,
    isEnd: false,
    topics: [],
    from: 0,
  }

  componentDidMount() {
    this.getFollowBoardTopics();
  }

  getFollowBoardTopics = async () => {
    const { from } = this.state

    this.setState({
      isLoading: true,
    })

    const topicsTry = await GET<ITopic[]>(`/me/custom-board/topic?from=${from}&size=10`);

    topicsTry.map(topicList => {
      this.setState({
        topics: this.state.topics.concat(topicList),
        from: from + topicList.length,

        isLoading: false,
        isEnd: topicList.length !== 10,
      })
    })
  }

  render() {
    const { isLoading, isEnd, topics } = this.state;

    return (
      <div>
        <InfinitiList isLoading={isLoading} isEnd={isEnd} callback={this.getFollowBoardTopics}>
          {topics.map(topic => (
            <TopicItem key={topic.id} data={topic} />
          ))}
        </InfinitiList>
      </div>
    )
  }
}
