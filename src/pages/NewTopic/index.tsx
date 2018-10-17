import React from 'react'
import { css } from 'emotion'

import TopicList from './TopicList'

const root = css`
  background-color: #fff;
`

const NewTopic: React.SFC = () => (
  <div className={root}>
    <TopicList />
  </div>
)

export default NewTopic
