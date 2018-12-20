import React from 'react'
import styled from 'styled-components'

import { ListItem, ListItemText, ListItemIcon, Divider } from '@material-ui/core'
import AnnouncementIcon from '@material-ui/icons/Announcement'

import UBB from '@/UBB'

const DivS = styled.div`
  margin: 1rem;
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
      <ListItemText primary="推荐阅读" />
    </ListItem>
    <Divider />
    <DivS>{UBB({ ubbText: content })}</DivS>
  </>
)
