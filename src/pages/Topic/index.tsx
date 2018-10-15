import React from 'react'
import { RouteComponentProps } from 'react-router-dom'

import PostHead from './PostHead'
import PostList from './PostList'

import { GET } from '@/utils/fetch'
import { ITopic } from '@cc98/api'


type Props = RouteComponentProps<{
  topicID: string
}>

type State = {
  topicInfo: ITopic | null
}

class Topic extends React.PureComponent<Props, State> {
  state: State = {
    topicInfo: null,
  }

  async componentDidMount() {
    const topicID = parseInt(this.props.match.params.topicID)

    if (isNaN(topicID)) {
      this.props.history.push('/404')
      return null
    }

    const res = await GET<ITopic>(`/topic/${topicID}`)

    res
      .fail()
      .succeed(topicInfo => {
        this.setState({
          topicInfo
        })
      })
  }

  render() {
    const { topicInfo } = this.state
    return (
      <>
        { topicInfo && <>
          <PostHead
            topicInfo={topicInfo}
          />
          <PostList
          topicID={topicInfo.id}
          />
        </>
        }
      </>
    )
  }
}

export default Topic
