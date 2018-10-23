import { css } from 'emotion'
import React from 'react'

import { CircularProgress } from '@material-ui/core'

const loading = css`
  display: flex;
  justify-content: center;
  padding: 15px 0;
`

const LoadingCircle: React.SFC = () => (
  <div className={loading}>
    <CircularProgress />
  </div>
)

export default LoadingCircle
