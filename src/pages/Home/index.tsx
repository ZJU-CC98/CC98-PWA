import React from 'react'

import useContainer from '@/hooks/useContainer'
import settingInstance from '@/containers/setting'

import HotTopic from '../HotTopic'
import NewTopic from '../NewTopic'
import MyFollow from '../MyFollow'
import Recommedation from '../Recommedation'

export default () => {
  const {
    state: { customHome },
  } = useContainer(settingInstance)

  return (
    <>
      {customHome === 1 && <Recommedation />}
      {customHome === 2 && <HotTopic />}
      {customHome === 3 && <NewTopic />}
      {customHome === 4 && <MyFollow />}
    </>
  )
}
