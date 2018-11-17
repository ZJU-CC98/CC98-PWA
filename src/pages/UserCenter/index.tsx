import React, { useState, useEffect } from 'react'

import { useGlobalContainer } from '@/hooks/useContainer'
import userInstance from '@/containers/user'

import { IUser } from '@cc98/api'
import { getUserInfoById } from '@/services/user'

import User from './User'
interface Props {
  id: string | undefined
}

const UserCenter: React.FunctionComponent<Props> = props => {
  const {
    state: { myInfo },
  } = useGlobalContainer(userInstance)
  const [userInfo, setUserInfo] = useState<IUser | null>(null)

  useEffect(() => {
    ; (async () => {
      if (props.id) {
        const userInfo = await getUserInfoById(parseInt(props.id, 10))
        userInfo.fail().succeed(userInfo => {
          setUserInfo(userInfo)
        })
      }
    })()
  }, [])

  if (!props.id) {
    return myInfo && <User info={myInfo} isUserCenter={true} />
  }

  return userInfo && <User info={userInfo} isUserCenter={false} />
}

export default UserCenter
