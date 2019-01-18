import React from 'react'

import useContainer from '@/hooks/useContainer'
import userInstance from '@/containers/user'

import useFetcher from '@/hooks/useFetcher'

import { IUser } from '@cc98/api'
import { getUserInfoById } from '@/services/user'

import UserAvatar from './UserAvatar'
import UserSignature from './UserSignature'
import UserDetail from './UserDetail'
import UserRecentTopics from './UserRecentTopics'
import UserRecentPosts from './UserRecentPosts'

interface Props {
  info: IUser
  isUserCenter: boolean
}

const UserCenter: React.FC<Props> = ({ info, isUserCenter }) => {
  const {
    state: { myInfo },
  } = useContainer(userInstance)

  return (
    <>
      <UserAvatar info={info} isUserCenter={isUserCenter} />
      <UserDetail info={info} />
      <UserSignature info={info} />
      <UserRecentTopics info={info} isUserCenter={isUserCenter} />
      {myInfo && info.id === myInfo.id && <UserRecentPosts />}
    </>
  )
}

interface WrapperProps {
  /**
   * 来自路由
   */
  id?: string
}

const Wrapper: React.FC<WrapperProps> = props => {
  const {
    state: { myInfo },
  } = useContainer(userInstance)

  const [userInfo] = useFetcher(props.id ? () => getUserInfoById(props.id as string) : null)

  if (!props.id && myInfo) {
    return <UserCenter info={myInfo} isUserCenter={true} />
  }

  return userInfo && <UserCenter info={userInfo} isUserCenter={false} />
}

export default Wrapper
