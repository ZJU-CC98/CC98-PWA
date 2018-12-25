import React from 'react'
import styled from 'styled-components'

import { EditorContainer } from './EditorContainer'

import { InputBase } from '@material-ui/core'

const InputArea = styled(InputBase).attrs({
  fullWidth: true,
  multiline: true,
  autoFocus: true,
  rows: 6,
  rowsMax: 10,
})`
  && {
    margin-top: 8px;
    padding: 12px 8px;
    border: 1.5px solid #ccc;
  }
`

interface Props {
  editor: EditorContainer
}

export default ({ editor }: Props) => {
  const handlerChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    editor.replaceMainContent(event.target.value)
  }

  return (
    <InputArea
      value={editor.state.mainContent}
      placeholder="CC98 干杯~ (￣ε(#￣) Σ"
      onChange={handlerChange}
    />
  )
}
