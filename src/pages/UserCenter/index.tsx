import React from 'react'

import useGlobalContainer from '@/hooks/useContainer'
import userInstance from '@/containers/user'

import useFetcher from '@/hooks/useFetcher'

import { IUser } from '@cc98/api'
import { getUserInfoById } from '@/services/user'

import UserAvatar from './UserAvatar'
import UserSignature from './UserSignature'
import UserDetail from './UserDetail'
import UserRecentTopics from './UserRecentTopics'

interface Props {
  info: IUser
  isUserCenter: boolean
}

const UserCenter: React.FunctionComponent<Props> = ({ info, isUserCenter }) => (
  <>
    <UserAvatar info={info} isUserCenter={isUserCenter} />
    <UserDetail info={info} />
    <UserSignature info={info} />
    <UserRecentTopics info={info} />
  </>
)

interface WrapperProps {
  /**
   * 来自路由
   */
  id: string | undefined
}

const Wrapper: React.FunctionComponent<WrapperProps> = props => {
  const {
    state: { myInfo },
  } = useGlobalContainer(userInstance)

  const [userInfo] = useFetcher(
    props.id ? () => getUserInfoById(parseInt(props.id as string, 10)) : null
  )

  if (!props.id) {
    return myInfo && <UserCenter info={myInfo} isUserCenter={true} />
  }

  return userInfo && <UserCenter info={userInfo} isUserCenter={false} />
}

export default Wrapper
