import React from 'react'
import { css } from 'emotion'

import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Typography,
} from '@material-ui/core'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import { InfTopicList } from '@/components/TopicList'

import { IUser } from '@cc98/api'
import { getUsersRecentTopics } from '@/services/topic'

const wrapper = css`
  width: 100%;
`

const detail = css`
  && {
    padding: 0 8px 24px 8px;
  }
`

interface Props {
  info: IUser
}

const RecentTopics: React.FunctionComponent<Props> = ({ info }) => (
  <ExpansionPanel className={wrapper} defaultExpanded={false}>
    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
      <Typography variant="subtitle1">发表主题</Typography>
    </ExpansionPanelSummary>
    <ExpansionPanelDetails className={detail}>
      <InfTopicList
        service={(from: number) => getUsersRecentTopics(info.id, from)}
        place="usercenter"
      />
    </ExpansionPanelDetails>
  </ExpansionPanel>
)

export default RecentTopics
