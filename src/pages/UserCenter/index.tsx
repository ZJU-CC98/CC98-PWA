import React from 'react'

import useGlobalContainer from '@/hooks/useContainer'
import userInstance from '@/containers/user'

import useFetcher from '@/hooks/useFetcher'

import { getUserInfoById } from '@/services/user'

import User from './User'
interface Props {
  /**
   * 来自路由
   */
  id: string | undefined
}

const UserCenter: React.FunctionComponent<Props> = props => {
  const {
    state: { myInfo },
  } = useGlobalContainer(userInstance)

  const [userInfo] = useFetcher(
    props.id ? () => getUserInfoById(parseInt(props.id as string, 10)) : null
  )

  if (!props.id) {
    return myInfo && <User info={myInfo} isUserCenter={true} />
  }

  return userInfo && <User info={userInfo} isUserCenter={false} />
}

export default UserCenter
