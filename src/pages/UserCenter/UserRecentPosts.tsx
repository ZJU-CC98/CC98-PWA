import React, { useState } from 'react'

import ExpandPanel from './ExpandPanel'

import InfiniteList from '@/components/InfiniteList'
import useInfList from '@/hooks/useInfList'

import { navigateHandler } from '@/services/utils/errorHandler'

import UserRecentPostsItem from './UserRecentPostsItem'

import { getMyRecentPosts } from '@/services/post'

const RecentPosts: React.FC = () => {
  const [expand, setExpand] = useState(false)

  const [posts, state, callback] = useInfList(getMyRecentPosts, { fail: navigateHandler })
  const { isLoading, isEnd } = state
  const onChange = () => {
    setExpand(!expand)
  }

  return (
    <ExpandPanel expanded={expand} title="发表回复" onChange={onChange}>
      {expand && (
        <InfiniteList isLoading={isLoading} isEnd={isEnd} callback={callback}>
          {posts.map(info => (
            <UserRecentPostsItem key={info.id} data={info} />
          ))}
        </InfiniteList>
      )}
    </ExpandPanel>
  )
}

export default RecentPosts
