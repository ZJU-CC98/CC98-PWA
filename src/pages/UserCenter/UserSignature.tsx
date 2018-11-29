import React from 'react'
import styled from 'styled-components'

import ExpandPanel from './ExpandPanel'

import { IUser } from '@cc98/api'

import UBB from '@cc98/ubb-react'

const WrapperDiv = styled.div`
  margin: 0 12px;
`

interface Props {
  info: IUser
}

const UserSignature: React.FunctionComponent<Props> = ({ info }) => (
  <ExpandPanel defaultExpanded={false} title="签名档">
    <WrapperDiv>{UBB(info.signatureCode)}</WrapperDiv>
  </ExpandPanel>
)

export default UserSignature
