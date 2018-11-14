import React from 'react'
import { css } from 'emotion'

import { CircularProgress } from '@material-ui/core'

const loading = css`
  display: flex;
  justify-content: center;
  padding: 15px 0;
`

const LoadingCircle: React.FunctionComponent = () => (
  <div className={loading}>
    <CircularProgress />
  </div>
)

export default LoadingCircle
