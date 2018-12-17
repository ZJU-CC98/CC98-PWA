import React from 'react'
import styled from 'styled-components'

import { Fab } from '@material-ui/core'

const FabS = styled(Fab).attrs({
  size: 'small',
  color: 'primary',
})<{ bottom: number }>`
  && {
    position: fixed;
    bottom: ${props => (props.bottom ? props.bottom + 'px' : '15px')};
    right: 15px;
    z-index: 20;
  }
`

interface Props {
  onClick?: () => void
  bottom?: number
}

const FixFab: React.FunctionComponent<Props> = ({ onClick, bottom, children }) => (
  // FIXME: waiting @types/styled-components to upgrade
  // @ts-ignore https://www.styled-components.com/docs/advanced#refs
  <FabS onClick={onClick} bottom={bottom}>
    {children}
  </FabS>
)

export default FixFab
