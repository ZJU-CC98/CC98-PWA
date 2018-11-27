import React from 'react'

// MD V3.6.0 Fab 定义导出有问题
import Fab from '@material-ui/core/Fab'

import { css } from 'emotion'

interface Props {
  onClick: () => void
}

const fix = css`
  && {
    position: fixed;
    bottom: 15px;
    right: 15px;
    z-index: 20;
  }
`

const FixFab: React.FunctionComponent<Props> = ({ onClick, children }) => (
  <Fab className={fix} size="small" color="primary" onClick={onClick}>
    {children}
  </Fab>
)

export default FixFab
