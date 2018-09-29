import React from 'react'
import { RouteComponentProps } from 'react-router-dom'

import {
  Typography,
} from '@material-ui/core'

import PostHead from './PostHead'
import PostList from './PostList'

import { GET } from '../../utils/fetch'


type Props = RouteComponentProps<{
  topicID: string
}>

const Topic: React.SFC<Props> = (props) => {
  const topicID = parseInt(props.match.params.topicID)

  // GET(`/topic/${topicID}`)

  if (isNaN(topicID)) {
    props.history.push('/404')
    return null
  }

  return (
    <>
      <PostHead />
      <PostList
        topicID={topicID}
      />
    </>
  )
}

export default Topic
