import React, { useState } from 'react'
import styled from 'styled-components'

import ExpandPanel from './ExpandPanel'

import { IUser } from '@cc98/api'

import UBB from '@/UBB'

const UBBDiv = styled.div`
  width: 100%;
  margin: 0 12px;
`

interface Props {
  info: IUser
}

const UserSignature: React.FC<Props> = ({ info }) => {
  const [expand, setExpand] = useState(false)
  const onChange = () => {
    setExpand(!expand)
  }

  return (
    <ExpandPanel expanded={expand} title="签名档" onChange={onChange}>
      {expand && (
        <UBBDiv>
          <UBB ubbText={info.signatureCode} />
        </UBBDiv>
      )}
    </ExpandPanel>
  )
}
export default UserSignature
