import React from 'react'
import styled from 'styled-components'

import { IconButton, Typography, Paper } from '@material-ui/core'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace'
import { IBoard } from '@cc98/api'

import { navigate, goback } from '@/utils/history'

const Wrapper = styled(Paper).attrs({
  square: true,
  elevation: 1,
})`
  && {
    display: flex;
    align-items: center;
    position: sticky;
    top: 0;
    min-height: 56px;
    width: 100%;
    padding: 0 16px;
    padding-right: 0;
    /* z-index of TopBar is 1100 and DrawerMenu is 1200 */
    z-index: 1105;

    @media (min-width: 600px) {
      height: 64px;
    }
  }
`

const GobackIcon = styled(IconButton)`
  && {
    margin-left: -12px;
    margin-right: 5px;
  }
`

const Title = styled(Typography).attrs({
  variant: 'subtitle2',
})`
  && {
    margin: 4px 0;
    flex-grow: 2;
    flex-shrink: 1;
  }
`

interface Props {
  BoardInfo: IBoard
}

const RecordHead: React.FC<Props> = ({ BoardInfo }) => (
  <Wrapper>
    <GobackIcon onClick={goback}>
      <KeyboardBackspaceIcon />
    </GobackIcon>
    <Title onClick={() => navigate(`/board/${BoardInfo.id}`)}>{BoardInfo.name}</Title>
  </Wrapper>
)

export default RecordHead
