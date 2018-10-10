import React from 'react'

import PostItem from './PostItem'

import { GET } from '../../utils/fetch'
import { IPost, IUser } from '@cc98/api'

type Props = {
  topicID: number
}

type State = {
  postList: IPost[]
  userMap: {
    [id: string]: IUser
  }

  from: number
  size: number
}

class TopicList extends React.Component<Props, State> {
  state: State = {
    postList: [],
    userMap: {},
    from: 0,
    size: 10,
  }

  async componentDidMount() {
    const { topicID } = this.props
    const { from, size } = this.state

    const postList = await GET<IPost[]>(`topic/${topicID}/post?from=${from}&size=${size}`)

    this.setState({
      postList
    })
  }

  render() {
    const { postList, userMap } = this.state

    return (
      <>
        {
          postList.map((info) => (
            <PostItem
              key={info.id}
              postInfo={info}
              userInfo={userMap[info.id]}
            />
          ))
        }
      </>
    )
  }
}

export default TopicList
