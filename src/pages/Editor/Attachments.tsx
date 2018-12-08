import React from 'react'
import styled from 'styled-components'

import { EditorContainer } from '@/containers/editor'

import { Badge } from '@material-ui/core'
import ClearIcon from '@material-ui/icons/Clear'

import UBB from '@cc98/ubb-react'

const WrapperDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 16px;
`

const AttachDiv = styled.div`
  margin: 10px;
  max-width: 80px;
  max-height: 80px;
`

interface Props {
  editor: EditorContainer
}

export default ({ editor }: Props) => (
  <WrapperDiv>
    {editor.state.attachments.map((attach, index) => (
      <AttachDiv key={index}>
        <Badge
          color="secondary"
          badgeContent={<ClearIcon fontSize="small" />}
          onClick={() => editor.detachAttachment(index)}
        >
          {UBB(attach)}
        </Badge>
      </AttachDiv>
    ))}
  </WrapperDiv>
)
