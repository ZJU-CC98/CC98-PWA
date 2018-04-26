import React from 'react'
import { RouteComponentProps } from 'react-router-dom'

import PostList from '../containers/PostList'
import PostHeader from '../components/PostHeader'

import { TopicInfo } from '../TypeDefinitions/TopicInfo'

import { fetchTopic } from '../utility/api'

interface Props extends RouteComponentProps<{
  topicID: number
}> {}

interface State {
  topicInfo: TopicInfo | null
}

class Topic extends React.Component<Props, State> {
  state: State = {
    topicInfo: null
  }

  async componentDidMount() {
    const topicID = this.props.match.params.topicID
    this.setState({
      topicInfo: await fetchTopic(topicID)
    })
  }

  render() {
    const topicID = this.props.match.params.topicID
    const { topicInfo } = this.state

    return (
      <div>
        {
          topicInfo && <PostHeader
            topicData={topicInfo}
          />
        }
        <PostList
          topicID={topicID}
        />
      </div>
    )
  }
}

export default Topic
