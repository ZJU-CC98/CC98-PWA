import React from 'react'
import styled from 'styled-components'

import useModel from '@/hooks/useModel'
import { EditorModel } from './EditorModel'

import MainContent from './MainContent'
import Attachments from './Attachments'
import ToolBox from './ToolBox'

const FixBottomDiv = styled.div`
  position: fixed;
  left: 8px;
  right: 8px;
  bottom: 12px;
`

export { EditorModel }

interface Props {
  editor: EditorModel
  onSendCallback: () => void
}

const Editor: React.FC<Props> = ({ editor, onSendCallback }) => {
  useModel(editor)

  return (
    <div>
      <MainContent editor={editor} />
      <Attachments editor={editor} />
      <FixBottomDiv>
        <ToolBox editor={editor} onSendCallback={onSendCallback} />
      </FixBottomDiv>
    </div>
  )
}

export default React.memo(Editor)
