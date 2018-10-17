import React from 'react'
import { css } from 'emotion'

import HotTopicList from './HotTopicList'

const root = css`
  background-color: #fff;
`

const HotTopic: React.SFC = () => (
  <div className={root}>
    <HotTopicList />
  </div>
)

export default HotTopic
