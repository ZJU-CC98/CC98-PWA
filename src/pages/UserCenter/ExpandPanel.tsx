import React from 'react'
import muiStyled from '@/muiStyled'

import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Typography,
} from '@material-ui/core'

import { ExpansionPanelProps } from '@material-ui/core/ExpansionPanel'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const ExpansionPanelDetailsS = muiStyled(ExpansionPanelDetails)({
  width: '100%',
  padding: '0 4px 24px 4px',
})

type Props = Pick<ExpansionPanelProps, 'expanded' | 'defaultExpanded' | 'onChange'> & {
  /**
   * 标题
   */
  title?: string
}

const ExpandPanel: React.FC<Props> = props => (
  <ExpansionPanel
    expanded={props.expanded}
    defaultExpanded={props.defaultExpanded}
    onChange={props.onChange}
  >
    {props.title && (
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="subtitle1">{props.title}</Typography>
      </ExpansionPanelSummary>
    )}
    <ExpansionPanelDetailsS>{props.children || <></>}</ExpansionPanelDetailsS>
  </ExpansionPanel>
)

export default ExpandPanel
