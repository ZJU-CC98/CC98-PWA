import React from 'react'
import styled from 'styled-components'

import useContainer from '@/hooks/useContainer'
import { EditorContainer } from './EditorContainer'

import MainContent from './MainContent'
import Attachments from './Attachments'
import ToolBox from './ToolBox'

const FixBottomDiv = styled.div`
  position: fixed;
  left: 8px;
  right: 8px;
  bottom: 12px;
`

export { EditorContainer }

interface Props {
  editor: EditorContainer
  onSendCallback: () => void
}

const Editor: React.FC<Props> = ({ editor, onSendCallback }) => {
  useContainer(editor)

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
