import React from 'react'
import styled from 'styled-components'

// @material-ui/core@3.6.0 Fab 没有从 index.d.ts 导出
import Fab from '@material-ui/core/Fab'

const FabS = styled(Fab).attrs({
  size: 'small',
  color: 'primary',
})`
  && {
    position: fixed;
    bottom: 15px;
    right: 15px;
    z-index: 20;
  }
`

const FixFab: React.FunctionComponent = ({ children }) => <FabS>{children}</FabS>

export default FixFab
