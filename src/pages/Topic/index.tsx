import React from 'react'
import { navigate } from '@reach/router'
import { css } from 'emotion'

import LoadingCircle from '@/components/LoadingCircle'
import PostHead from './PostHead'
import PostList from './PostList'
import Editor from './Editor'

import { GET } from '@/utils/fetch'
import { ITopic } from '@cc98/api'

const root = css`
  background-color: #eee;
`

type Props = {
  topicID: string
}

type State = {
  topicInfo: ITopic | null
}

class Topic extends React.PureComponent<Props, State> {
  state: State = {
    topicInfo: null,
  }

  async componentDidMount() {
    const topicID = parseInt(this.props.topicID)

    if (isNaN(topicID)) {
      navigate('/404')
      return null
    }

    const topic = await GET<ITopic>(`/topic/${topicID}`)

    topic.fail().succeed(topicInfo => {
      this.setState({
        topicInfo,
      })
    })
  }

  render() {
    const { topicInfo } = this.state

    if (topicInfo === null) {
      return <LoadingCircle />
    }
    return (
      <div className={root}>
        <PostHead topicInfo={topicInfo} />
        <PostList topicID={topicInfo.id} />
        <Editor />
      </div>
    )
  }
}

export default Topic
