import React from 'react'
import styled from 'styled-components'

import { CircularProgress } from '@material-ui/core'

const WrapperDiv = styled.div`
  display: flex;
  justify-content: center;
  padding: 15px 0;
`

const LoadingCircle: React.FC = () => (
  <WrapperDiv>
    <CircularProgress />
  </WrapperDiv>
)

export default LoadingCircle
