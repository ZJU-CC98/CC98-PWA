import React from 'react'
import styled from 'styled-components'

import { CircularProgress } from '@material-ui/core'

const WrapperDiv = styled.div`
  display: flex;
  justify-content: center;
  padding: 15px 0;
`
interface Props {
  size?: number
}

const LoadingCircle: React.FunctionComponent<Props> = ({ size }) => (
  <WrapperDiv>
    <CircularProgress size={size || 40} />
  </WrapperDiv>
)

export default LoadingCircle
