import React, { useState } from 'react'

import { InfTopicList } from '@/components/TopicList'

import { Tab, Tabs } from '@material-ui/core'

import { getFollowBoardsTopics, getFollowUsersTopics, getFavoriteTopics } from '@/services/topic'

export default () => {
  const [current, setCurrent] = useState('board')

  const handleChange = (_: React.ChangeEvent, value: string) => {
    setCurrent(value)
  }

  return (
    <>
      <Tabs
        textColor="primary"
        indicatorColor="primary"
        variant="fullWidth"
        value={current}
        onChange={handleChange}
      >
        <Tab value="board" label="关注版面" />
        <Tab value="user" label="关注用户" />
        <Tab value="topic" label="我的收藏" />
      </Tabs>

      {current === 'board' && <InfTopicList service={getFollowBoardsTopics} place="follow" />}
      {current === 'user' && <InfTopicList service={getFollowUsersTopics} place="follow" />}
      {current === 'topic' && <InfTopicList service={getFavoriteTopics} place="follow" />}
    </>
  )
}
