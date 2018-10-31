import { navigate } from '@reach/router'
import { css } from 'emotion'
import React from 'react'

import LoadingCircle from '@/components/LoadingCircle'
import Editor from './Editor'
import PostHead from './PostHead'

import InfiniteList from '@/components/InfiniteList'
import postInstance from '@/model/post'
import { GET } from '@/utils/fetch'
import { IPost, IPostUtil, ITopic } from '@cc98/api'
import { Subscribe } from '@cc98/state'
import PostItem from './PostItem'
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
  constructor(props: Props) {
    super(props)
    // tslint:disable-next-line:radix
    postInstance.init(parseInt(props.topicID))
  }

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
    await postInstance.fetchPosts()
    topic.fail().succeed(topicInfo => {
      this.setState({
        topicInfo,
      })
    })
  }

  componentWillUnmount() {
    postInstance.reset()
  }

  render() {
    const { topicInfo } = this.state

    if (topicInfo === null) {
      return <LoadingCircle />
    }

    return (
      <div className={root}>
        <PostHead topicInfo={topicInfo} />

        <Subscribe to={[postInstance]}>
          {() => {
            const { isLoading, isEnd, posts, userMap } = postInstance.state

            return (
              <InfiniteList isLoading={isLoading} isEnd={isEnd} callback={postInstance.fetchPosts}>
                {posts.map((info: IPost) => (
                  <PostItem
                    key={info.id}
                    postInfo={info}
                    userInfo={userMap[info.userId]}
                  />
                ))}
              </InfiniteList>
            )
          }}
        </Subscribe>
        <Editor topic={topicInfo} />

      </div>
    )
  }
}

export default Topic
