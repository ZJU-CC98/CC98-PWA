import React from 'react'
import styled from 'styled-components'

import { Typography } from '@material-ui/core'
import ExpandPanel from './ExpandPanel'

import { IUser } from '@cc98/api'

import UBB from '@/UBB'

const TypographyS = styled(Typography)`
  && {
    width: 100%;
    margin: 0 12px;
  }
`

interface Props {
  info: IUser
}

const UserSignature: React.FunctionComponent<Props> = ({ info }) => (
  <ExpandPanel defaultExpanded={false} title="签名档">
    <TypographyS component="div">{UBB(info.signatureCode)}</TypographyS>
  </ExpandPanel>
)

export default UserSignature
