import React from 'react'
import styled from 'styled-components'

import { EditorContainer } from '@/containers/editor'

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
  editor: EditorContainer
}

export default ({ editor }: Props) => {
  const handlerChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    editor.replace(event.target.value)
  }

  return (
    <InputArea
      value={editor.state.mainContent}
      placeholder="CC98 干杯~ (￣ε(#￣) Σ"
      onChange={handlerChange}
    />
  )
}
