import React, { useState } from 'react'

import { InfTopicList } from '@/components/TopicList'
import SearchInput from './SearchInput'

import { searchTopics } from '@/services/topic'

import { throttle } from 'lodash-es'

export default () => {
  const [searchTerm, setSearchTerm] = useState('')

  const onSearch = throttle((value: string) => {
    setSearchTerm(value)
  }, 1000)

  return (
    <>
      <SearchInput onSearch={onSearch} />
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
