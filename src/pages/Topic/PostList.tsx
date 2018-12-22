import React, { useState } from 'react'

import useInfList, { Service } from '@/hooks/useInfList'

import InfiniteList from '@/components/InfiniteList'
import PostItem from './PostItem'

import { IPost, IUser } from '@cc98/api'
import { getUsersInfoByIds } from '@/services/user'

interface IUserMap {
  [key: number]: IUser
}

interface Props {
  service: Service<IPost[]>
  isTrace: boolean
}

export function useUserMap() {
  const [userMap, setUserMap] = useState<IUserMap>({})

  const updateUserMap = async (list: IPost[]) => {
    const res = await getUsersInfoByIds(list.map(p => p.userId).filter(id => id))
    res.fail().succeed(users => {
      users.forEach(user => {
        userMap[user.id] = user
      })

      setUserMap(userMap)
    })
  }

  return [userMap, updateUserMap] as [typeof userMap, typeof updateUserMap]
}

const PostList: React.FunctionComponent<Props> = ({ service, isTrace, children }) => {
  const [userMap, updateUserMap] = useUserMap()

  const [posts, state, callback] = useInfList(service, {
    step: 10,
    success: updateUserMap,
  })
  const { isLoading, isEnd } = state

  return (
    <InfiniteList isLoading={isLoading} isEnd={isEnd} callback={callback}>
      {posts.map(info =>
        info.floor === 1 ? (
          <React.Fragment key={info.id}>
            <PostItem isTrace={isTrace} postInfo={info} userInfo={userMap[info.userId]} />
            {children/** <PostListHot /> */}
          </React.Fragment>
        ) : (
          <PostItem
            key={info.id}
            postInfo={info}
            userInfo={userMap[info.userId]}
            isTrace={isTrace}
          />
        )
      )}
    </InfiniteList>
  )
}

export default PostList
