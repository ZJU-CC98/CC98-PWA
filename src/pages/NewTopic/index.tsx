import React, { useState } from 'react'

import FixFab from '@/components/FixFab'
import { InfTopicList } from '@/components/TopicList'

import RotateRightIcon from '@material-ui/icons/RotateRight'

import { getNewTopics } from '@/services/topic'

export default () => {
  const [topicListKey, setTopicListKey] = useState(0)

  return (
    <>
      <InfTopicList key={topicListKey} service={getNewTopics} place="newtopic" />
      <FixFab>
        <RotateRightIcon onClick={() => setTopicListKey(topicListKey + 1)} />
      </FixFab>
    </>
  )
}
