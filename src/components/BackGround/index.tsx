import React from 'react'
import styled from 'styled-components'
import muiStyled from '@/muiStyled'

import { Paper } from '@material-ui/core'

const Background = muiStyled(Paper).attrs({
  square: true,
  elevation: 0,
})({
  position: 'fixed',
  width: '100%',
  height: '100%',
  zIndex: -1,
})

// 该占位符高度和 TopBar 保持一致
const Placeholder = styled.div`
  height: 56px;
`

const BackGround: React.FC = ({ children }) => (
  <>
    <Background />
    <Placeholder />
    {children}
  </>
)

export default BackGround
