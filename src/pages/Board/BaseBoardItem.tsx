import { notExpandedBoards } from '@/config'
import { IBaseBoard, IBoard } from '@cc98/api'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import { StyleRules, withStyles } from '@material-ui/core/styles'
import { ClassNameMap } from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { css } from 'emotion'
import React from 'react'
import BoardItem from './BoardItem'

interface Props {
  data: IBaseBoard
}
const root = css`
  border-bottom: #eaeaea solid thin;
`
const BaseBoardStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 1rem;
  margin: 0 0 0 0;
`
const ChildBoardStyle = css`
  && {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    margin-bottom: 1rem;
    padding: 0 0 0 0;
  }
`
const BaseBoardContainerStyle = css`
  && {
    max-height: 30px;
    min-height: 30px;
    margin: 0 0 0 0;
  }
`
const styles: StyleRules = {
  root: {
    width: '100%',
  },
  expanded: {
    marginTop: '0.5rem',
    marginBottom: '0.5rem',
  },
}

export default withStyles(styles)(
  class extends React.Component<Props & { classes: ClassNameMap }> {
    render() {
      const { data, classes } = this.props
      let defaultExpanded = true
      if (notExpandedBoards.indexOf(data.id) > -1) {
        defaultExpanded = false
      }

      return (
        <ExpansionPanel classes={{ expanded: classes.expanded }} defaultExpanded={defaultExpanded}>
          <ExpansionPanelSummary
            style={{ minHeight: '2.5rem' }}
            className={BaseBoardContainerStyle}
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography className={BaseBoardStyle}>{data.name}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={ChildBoardStyle}>
            {data.boards.map(board => (
              <BoardItem key={board.id} data={board} />
            ))}
          </ExpansionPanelDetails>
        </ExpansionPanel>
      )
    }
  }
)
