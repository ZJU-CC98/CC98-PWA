import React from 'react'
import styled from 'styled-components'

import useInfList from '@/hooks/useInfList'
import InfiniteList from '@/components/InfiniteList'

import FixFab from '@/components/FixFab'
import EditIcon from '@material-ui/icons/Edit'

import { List } from '@material-ui/core'

import DetailItem from './components/DetailItem'

import { getMessageContent } from '@/services/message'

const ListS = styled(List)`
  && {
    width: 100%;
    position: absolute;
    top: 56px;
    bottom: 60px;
    padding: 8px 0;
  }
`

interface Props {
  /**
   * 联系人id (from url)
   */
  id: string
}

/**
 * 私信-会话列表
 */
export default ({ id }: Props) => {
  const service = (from: number) => getMessageContent(parseInt(id, 10), from, 10)
  const [list, state, callback] = useInfList(service, {
    step: 10,
  })
  const { isLoading, isEnd } = state

  return (
    <>
      <ListS>
        <InfiniteList
          reverse
          inFixedContainer
          isEnd={isEnd}
          isLoading={isLoading}
          callback={callback}
        >
          {list.map(item => (
            <DetailItem key={item.id} message={item} />
          ))}
        </InfiniteList>
      </ListS>

      <FixFab>
        <EditIcon />
      </FixFab>
    </>
  )
}
