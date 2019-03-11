import React from 'react'

import useModel from '@/hooks/useModel'
import settingModel from '@/models/setting'

import HotTopic from '../HotTopic'
import NewTopic from '../NewTopic'
import MyFollow from '../MyFollow'
import Recommedation from '../Recommedation'

export default () => {
  const { customHome } = useModel(settingModel, ['customHome'])

  return (
    <>
      {customHome === 1 && <Recommedation />}
      {customHome === 2 && <HotTopic />}
      {customHome === 3 && <NewTopic />}
      {customHome === 4 && <MyFollow />}
    </>
  )
}
