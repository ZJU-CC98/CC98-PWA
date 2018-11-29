import React from 'react'
import styled from 'styled-components'

import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Typography,
} from '@material-ui/core'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const ExpansionPanelDetailsS = styled(ExpansionPanelDetails)`
  && {
    width: 100%;
    padding: 0 4px 24px 4px;
  }
`

interface Props {
  /**
   * ExpansionPanel props
   */
  expanded?: boolean
  defaultExpanded?: boolean
  /**
   * 标题
   */
  title?: string
}

const ExpandPanel: React.FunctionComponent<Props> = props => (
  <ExpansionPanel expanded={props.expanded} defaultExpanded={props.defaultExpanded}>
    {props.title && (
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="subtitle1">{props.title}</Typography>
      </ExpansionPanelSummary>
    )}
    <ExpansionPanelDetailsS>{props.children}</ExpansionPanelDetailsS>
  </ExpansionPanel>
)

export default ExpandPanel
