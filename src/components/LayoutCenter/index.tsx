import React from 'react'
import { css } from 'emotion'

const root = css`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

const LayoutCenter: React.SFC = ({ children }) => <div className={root}>{children}</div>

export default LayoutCenter
