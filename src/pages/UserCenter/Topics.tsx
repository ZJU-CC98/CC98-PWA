import React from 'react'
import { css } from 'emotion'

import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Typography,
} from '@material-ui/core'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import TopicList from '@/components/TopicList'

import { IUser } from '@cc98/api'
import { getUsersRecentTopics } from '@/services/topic'

const wrapper = css`
  width: 100%;
`

interface Props {
  info: IUser
}

const RecentTopics: React.FunctionComponent<Props> = ({ info }) => (
  <ExpansionPanel className={wrapper} defaultExpanded={true}>
    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
      <Typography variant="subtitle1">发表主题</Typography>
    </ExpansionPanelSummary>
    <ExpansionPanelDetails>
      <TopicList
        service={(from: number) => getUsersRecentTopics(info.id, from)}
        place="usercenter"
      />
    </ExpansionPanelDetails>
  </ExpansionPanel>
)

export default RecentTopics
