import React from 'react'
import { css } from 'emotion'

import useInfList, { Service } from '@/hooks/useInfList'

import { List } from '@material-ui/core'

import InfiniteList from '@/components/InfiniteList'
import TopicListItem from '@/components/TopicItem'

import { ITopic } from '@cc98/api'

const wrapper = css`
  width: 100%;
`

interface Props {
  service: Service<ITopic[]>
  // TODO: remove
  place?: 'inboard' | 'newtopic' | 'usercenter' | 'follow' | 'search'
}

const TopicList: React.FunctionComponent<Props> = ({ service, place }) => {
  const [topics, state, callback] = useInfList(service)
  const { isLoading, isEnd } = state

  return (
    <InfiniteList isLoading={isLoading} isEnd={isEnd} callback={callback}>
      <List className={wrapper}>
        {topics.map(info => (
          <TopicListItem key={info.id} data={info} place={place} />
        ))}
      </List>
    </InfiniteList>
  )
}

export default TopicList
