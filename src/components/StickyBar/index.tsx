import React from 'react'
import styled from 'styled-components'

import { AppBar } from '@material-ui/core'

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 56px;
  padding: 0 16px;
`

const StickyBar: React.FC = ({ children }) => (
  <AppBar elevation={0} position="sticky">
    <Div>{children}</Div>
  </AppBar>
)

export default StickyBar
