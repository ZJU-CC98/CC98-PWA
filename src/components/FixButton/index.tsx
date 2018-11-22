import React from 'react'

import { Button } from '@material-ui/core'
import { css } from 'emotion'

interface Props {
  onClick: () => void
}

const fix = css`
  && {
    position: fixed;
    bottom: 15px;
    right: 15px;
  }
`

const FixButton: React.FunctionComponent<Props> = ({ onClick, children }) => (
  <Button variant="fab" mini className={fix} color="primary" onClick={onClick}>
    {children}
  </Button>
)

export default FixButton
