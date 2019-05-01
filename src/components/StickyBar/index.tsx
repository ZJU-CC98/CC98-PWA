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

// hack for iOS
const AppBarSticky = styled(AppBar)`
  position: sticky;
  position: -webkit-sticky;
` as typeof AppBar

const StickyBar: React.FC = ({ children }) => (
  <AppBarSticky elevation={0} position="sticky">
    <Div>{children}</Div>
  </AppBarSticky>
)

export default StickyBar
