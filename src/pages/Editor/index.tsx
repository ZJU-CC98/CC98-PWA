import React from 'react'
import styled from 'styled-components'

import useContainer from '@/hooks/useContainer'
import editorInstance from '@/containers/editor'

import MainContent from './MainContent'
import Attachments from './Attachments'
import ToolBox from './ToolBox'

const WrapperDiv = styled.div`
  margin: 8px;
`

const FixBottomDiv = styled.div`
  position: fixed;
  left: 8px;
  right: 8px;
  bottom: 12px;
`

export default () => {
  const editor = useContainer(editorInstance)

  return (
    <WrapperDiv>
      <MainContent editor={editor} />
      <Attachments editor={editor} />
      <FixBottomDiv>
        <ToolBox editor={editor} />
      </FixBottomDiv>
    </WrapperDiv>
  )
}
