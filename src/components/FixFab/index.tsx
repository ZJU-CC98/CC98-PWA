import React from 'react'
import styled from 'styled-components'

import { Fab } from '@material-ui/core'

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

interface Props {
  onClick?: () => void
}

const FixFab: React.FunctionComponent<Props> = ({ onClick, children }) => (
  <FabS onClick={onClick}>{children}</FabS>
)

export default FixFab
