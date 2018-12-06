import React from 'react'
import styled from 'styled-components'

import { IEditorHandler } from './useEditorHandler'

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
  handler: IEditorHandler
}

export default ({ handler }: Props) => (
  <WrapperDiv>
    {handler.attachments.map((attach, index) => (
      <AttachDiv key={index}>
        <Badge
          color="secondary"
          badgeContent={<ClearIcon fontSize="small" />}
          onClick={() => handler.detach(index)}
        >
          {UBB(attach)}
        </Badge>
      </AttachDiv>
    ))}
  </WrapperDiv>
)
