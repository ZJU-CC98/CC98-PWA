import React from 'react'
import styled from 'styled-components'

import { InputBase } from '@material-ui/core'

const InputArea = styled(InputBase).attrs({
  fullWidth: true,
})`
  && {
    margin-top: 8px;
    padding: 4px 8px;
    border: 1.5px solid #ccc;
  }
`

export default () => {
  const a = 1

  return (
    <InputArea
      // value={}
      placeholder="标题"
    />
  )
}
