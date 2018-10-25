import { navigate } from '@reach/router'
import { css } from 'emotion'
import React from 'react'

import LoadingCircle from '@/components/LoadingCircle'
import Editor from './Editor'
import PostHead from './PostHead'
import PostList from './PostList'

import { GET } from '@/utils/fetch'
import { ITopic } from '@cc98/api'

const root = css`
  background-color: #eee;
`

interface Props {
  topicID: string
}

interface State {
  topicInfo: ITopic | null
}

class Topic extends React.PureComponent<Props, State> {
  state: State = {
    topicInfo: null,
  }

  async componentDidMount() {
    const topicID = parseInt(this.props.topicID, 10)

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
        <Editor topic={topicInfo} />
      </div>
    )
  }
}

export default Topic
