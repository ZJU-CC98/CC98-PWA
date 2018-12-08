import React from 'react'
import styled from 'styled-components'

import { Typography } from '@material-ui/core'
import ExpandPanel from './ExpandPanel'

import { IUser } from '@cc98/api'

import UBB from '@cc98/ubb-react'

const TypographyS = styled(Typography)`
  margin: 0 12px;
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
