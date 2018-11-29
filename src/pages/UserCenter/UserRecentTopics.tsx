import React from 'react'

import ExpandPanel from './ExpandPanel'

import { InfTopicList } from '@/components/TopicList'

import { IUser } from '@cc98/api'
import { getUsersRecentTopics } from '@/services/topic'

interface Props {
  info: IUser
}

const RecentTopics: React.FunctionComponent<Props> = ({ info }) => (
  <ExpandPanel defaultExpanded={false} title="发表主题">
    <InfTopicList
      service={(from: number) => getUsersRecentTopics(info.id, from)}
      place="usercenter"
    />
  </ExpandPanel>
)

export default RecentTopics
