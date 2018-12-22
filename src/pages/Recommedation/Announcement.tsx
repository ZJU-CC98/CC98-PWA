import React from 'react'
import styled from 'styled-components'

import { ListItem, ListItemText, ListItemIcon, Divider } from '@material-ui/core'
import AnnouncementIcon from '@material-ui/icons/Announcement'

import UBB from '@/UBB'

const WrapperDiv = styled.div`
  margin: 12px 16px;
`

interface Props {
  content: string
}

export default ({ content }: Props) => (
  <>
    <ListItem>
      <ListItemIcon>
        <AnnouncementIcon />
      </ListItemIcon>
      <ListItemText primary="全站公告" />
    </ListItem>
    <Divider />
    <WrapperDiv>
      <UBB ubbText={content} />
    </WrapperDiv>
  </>
)
