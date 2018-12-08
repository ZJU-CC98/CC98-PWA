import React, { useState } from 'react'
// import styled from 'styled-components'

import useInfList from '@/hooks/useInfList'
import InfiniteList from '@/components/InfiniteList'

import FixFab from '@/components/FixFab'
import EditIcon from '@material-ui/icons/Edit'

import { List } from '@material-ui/core'

import DetailItem from './components/DetailItem'

import { getMessageContent } from '@/services/message'

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
  const [hadScroll, setHadScroll] = useState(false)

  const service = (from: number) => getMessageContent(parseInt(id, 10), from)
  const [list, state, callback] = useInfList(service, {
    reverse: true,
    step: 10,
    success: () => {
      if (hadScroll) {
        return
      }
      setHadScroll(true)

      // FIXME: Is there another way to do this ?
      setTimeout(
        () =>
          window.scrollTo({
            top: 2333,
            behavior: 'smooth',
          }),
        750
      )
    },
  })
  const { isLoading, isEnd } = state

  return (
    <>
      <List>
        <InfiniteList isEnd={isEnd} isLoading={isLoading} callback={callback} loadingPosition="top">
          {list.map(item => (
            <DetailItem key={item.id} message={item} />
          ))}
        </InfiniteList>
      </List>
      <FixFab>
        <EditIcon />
      </FixFab>
    </>
  )
}
