import React from 'react'
import muiStyled from '@/muiStyled'

import { EditorModel } from './EditorModel'

import { InputBase } from '@material-ui/core'

const InputArea = muiStyled(InputBase).attrs({
  fullWidth: true,
  multiline: true,
  autoFocus: true,
  rows: 6,
  rowsMax: 10,
})({
  marginTop: 8,
  padding: '12px 8px',
  border: '1.5px solid #ccc',
})

interface Props {
  editor: EditorModel
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
