import React from 'react'
import styled from 'styled-components'

import useEditorHandler from './useEditorHandler'

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
  const handler = useEditorHandler()

  return (
    <WrapperDiv>
      <MainContent handler={handler} />
      <Attachments handler={handler} />
      <FixBottomDiv>
        <ToolBox handler={handler} />
      </FixBottomDiv>
    </WrapperDiv>
  )
}
