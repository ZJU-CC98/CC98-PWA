import React from 'react'
import styled from 'styled-components'

import { IEditorHandler } from './useEditorHandler'

import { InputBase } from '@material-ui/core'

const InputArea = styled(InputBase).attrs({
  fullWidth: true,
  multiline: true,
  autoFocus: true,
  rows: 4,
  rowsMax: 7,
})`
  && {
    padding: 12px;
  }
`

interface Props {
  handler: IEditorHandler
}

export default ({ handler }: Props) => {
  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    handler.replace(event.target.value)
  }

  return (
    <InputArea
      value={handler.mainContent}
      placeholder="CC98 干杯~ (￣ε(#￣) Σ"
      onChange={onChange}
    />
  )
}
