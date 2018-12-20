import React, { useState } from 'react'

import ExpandPanel from './ExpandPanel'

import { InfTopicList } from '@/components/TopicList'

import { IUser } from '@cc98/api'
import { getUsersRecentTopics, getMyRecentTopics } from '@/services/topic'

interface Props {
  info: IUser
  isUserCenter: boolean
}

const RecentTopics: React.FunctionComponent<Props> = ({ info, isUserCenter }) => {
  const [expand, setExpand] = useState(false)
  const onChange = () => {
    setExpand(!expand)
  }

  return (
    <ExpandPanel expanded={expand} title="发表主题" onChange={onChange}>
      {expand && (
        <InfTopicList
          service={
            isUserCenter ? getMyRecentTopics : (from: number) => getUsersRecentTopics(info.id, from)
          }
          place="usercenter"
        />
      )}
    </ExpandPanel>
  )
}

export default RecentTopics
