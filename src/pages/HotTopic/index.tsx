import React from 'react'
import { css } from 'emotion'

import {
  Typography,
} from '@material-ui/core'

import TopBar from '../../components/TopBar'
import TopicList from './TopicList'


const HotTopic: React.SFC = () => (
  <>
    <TopBar />

    <TopicList />
  </>
)

export default HotTopic
