import React from 'react'

import { useGlobalContainer } from '@/hooks/useContainer'
import userInstace from '@/containers/user'

import EditContainer from './Edit'

export default () => {
  const { state: user } = useGlobalContainer(userInstace)

  return <>{user.myInfo && <EditContainer info={user.myInfo} />}</>
}
