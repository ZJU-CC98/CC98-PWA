import React from 'react'
import styled from 'styled-components'

import { Fab } from '@material-ui/core'

const FabS = styled(Fab).attrs({
  size: 'small',
  color: 'primary',
})<{ bottom: number }>`
  && {
    position: fixed;
    bottom: ${props => `${props.bottom}px`};
    right: 15px;
    z-index: 20;
  }
`

interface Props {
  onClick?: () => void
  /** 次序，从 1 计数 */
  order?: number
}

const FixFab: React.FC<Props> = ({ onClick, order = 1, children }) => (
  // FIXME: waiting @types/styled-components to upgrade
  // @ts-ignore https://www.styled-components.com/docs/advanced#refs
  <FabS onClick={onClick} bottom={(order - 1) * 50 + 15}>
    {children}
  </FabS>
)

export default FixFab
