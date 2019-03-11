import React from 'react'
import styled from 'styled-components'

import { EditorModel } from './EditorModel'

import { Badge } from '@material-ui/core'
import ClearIcon from '@material-ui/icons/Clear'

import UBB from '@/UBB'

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
  editor: EditorModel
}

export default ({ editor }: Props) => (
  <WrapperDiv>
    {editor.state.attachments.map((attach, index) => (
      <AttachDiv key={index}>
        <Badge
          color="secondary"
          badgeContent={<ClearIcon style={{ fontSize: 13 }} />}
          onClick={() => editor.detachAttachment(index)}
        >
          <UBB ubbText={attach} />
        </Badge>
      </AttachDiv>
    ))}
  </WrapperDiv>
)
