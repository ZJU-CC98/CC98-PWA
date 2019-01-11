import React from 'react'
import styled from 'styled-components'

import { Paper } from '@material-ui/core'

const Background = styled(Paper).attrs({
  square: true,
  elevation: 0,
})`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: -1;
`

// 该占位符高度和 TopBar 保持一致
const Placeholder = styled.div`
  height: 56px;

  @media (min-width: 600px) {
    height: 64px;
  }
`

const BackGround: React.FC = ({ children }) => (
  <>
    <Background />
    <Placeholder />
    {children}
  </>
)

export default BackGround
