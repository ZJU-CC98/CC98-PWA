import React from 'react'
import { css } from 'emotion'

import { Background } from './config'
import HotTopics from '../HotTopic'
import RecommendReadings from './Recommend'

const img = css`
  position: fixed;
  width: 100%;
  height: 100%;
  background-image: url(${Background});
  background-size: cover;
  opacity: 0.85;
`

const button = css`
  && {
    border-color: rgba(255, 255, 255, 0.4);
    transform: translateY(30px);
  }
`

const text = css`
  && {
    /* variant h6 */
    font-size: 1.25rem;
    font-weight: normal;
    color: #ddd;
  }
`

const Home: React.FunctionComponent = () => (
  <>
    <RecommendReadings />
    <HotTopics />
  </>
)

export default Home
