import React, { useState } from 'react'

import { InfTopicList } from '@/components/TopicList'
import SearchInput from '@/components/SearchInput'
import StickyBar from '@/components/StickyBar'

import { searchTopics } from '@/services/topic'

import { throttle } from 'lodash-es'

export default () => {
  const [searchTerm, setSearchTerm] = useState('')

  const onSearch = throttle((value: string) => {
    setSearchTerm(value)
  }, 1000 * 10)

  return (
    <>
      <StickyBar>
        <SearchInput placeholder="搜索主题（限制10s一次）" onSearch={onSearch} />
      </StickyBar>
      {searchTerm && (
        <InfTopicList
          key={searchTerm}
          service={(from: number) => searchTopics(searchTerm, from)}
          place="search"
        />
      )}
    </>
  )
}
