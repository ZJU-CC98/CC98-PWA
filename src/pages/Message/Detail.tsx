import React from 'react'
import styled from 'styled-components'

import useInfList from '@/hooks/useInfList'
import InfiniteList from '@/components/InfiniteList'

import FixFab from '@/components/FixFab'
import EditIcon from '@material-ui/icons/Edit'

import { List } from '@material-ui/core'

import DetailItem from './components/DetailItem'

import { getMessageContent } from '@/services/message'

const WrapperDiv = styled.div`
  /* display: flex;
  flex-direction: column;
  align-items: center; */
  width: 100%;
`

const EndDiv = styled.div`
  height: 60px;
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
    <WrapperDiv>
      <List>
        <InfiniteList reverse isEnd={isEnd} isLoading={isLoading} callback={callback}>
          {list.map(item => (
            <DetailItem key={item.id} message={item} />
          ))}
        </InfiniteList>
      </List>

      <EndDiv />

      <FixFab>
        <EditIcon />
      </FixFab>
    </WrapperDiv>
  )
}
