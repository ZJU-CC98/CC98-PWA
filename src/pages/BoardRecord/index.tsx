import React from 'react'
import styled from 'styled-components'

import useFetcher from '@/hooks/useFetcher'




import BoardHead from '../Board/BoardHead'

import { getBoardInfo } from '../../services/board'
import { navigateHandler } from '../../services/utils/errorHandler'

const WrapperDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`

interface Props {
  /**
   * 版面 ID
   */
  id: string
}

export default ({ id }: Props) => {
  const [board] = useFetcher(() => getBoardInfo(id), {
    fail: navigateHandler,
  })

  return (
    <WrapperDiv>
      {board && (
        <>
          <BoardHead data={board} />
        </>
      )}
    </WrapperDiv>
  )
}
