import React from 'react'
import styled from 'styled-components'

import ErrorImage from './ErrorImage'

import { Typography } from '@material-ui/core'
import LayoutCenter from '@/components/LayoutCenter'

const FlexDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`

interface Props {
  /**
   * 错误提示
   */
  errMessage: string
  /**
   * 补充提示
   */
  secondMessage?: string
}

export default ({ errMessage, secondMessage }: Props) => (
  <LayoutCenter>
    <FlexDiv>
      <ErrorImage status="404" />
      <Typography variant="h6" color="textPrimary">
        {errMessage}
      </Typography>
      {secondMessage && (
        <Typography variant="subtitle1" color="textPrimary">
          {secondMessage}
        </Typography>
      )}
    </FlexDiv>
  </LayoutCenter>
)
