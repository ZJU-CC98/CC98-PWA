import React from 'react'
import { css } from 'emotion'

import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Typography
} from '@material-ui/core'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import { StyleRules, withStyles } from '@material-ui/core/styles'
import { ClassNameMap } from '@material-ui/core/styles/withStyles'

import BoardItem from './BoardItem'

import { IBaseBoard } from '@cc98/api'

const notExpandedBoards = [2, 29, 33, 35, 37, 604]

interface Props {
  data: IBaseBoard
  classes: ClassNameMap
}

const baseBoardStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 1rem;
  margin: 0 0 0 0;
`
const childBoardStyle = css`
  && {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    margin-bottom: 1rem;
    padding: 0 0 0 0;
  }
`
const baseBoardContainerStyle = css`
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
  class extends React.Component<Props, { isExpanded: boolean }> {
    state = {
      isExpanded: notExpandedBoards.indexOf(this.props.data.id) === -1,
    }

    handleChange = (_: never, status: boolean) => {
      this.setState({
        isExpanded: status,
      })
    }

    render() {
      const { data, classes } = this.props
      const { isExpanded } = this.state

      return (
        <ExpansionPanel
          classes={{ expanded: classes.expanded }}
          expanded={isExpanded}
          onChange={this.handleChange}
        >
          <ExpansionPanelSummary
            style={{ minHeight: '2.5rem' }}
            className={baseBoardContainerStyle}
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography className={baseBoardStyle}>{data.name}</Typography>
          </ExpansionPanelSummary>
          {isExpanded ? (
            <ExpansionPanelDetails className={childBoardStyle}>
              {data.boards.map(board => (
                <BoardItem key={board.id} data={board} />
              ))}
            </ExpansionPanelDetails>
          ) : null}
        </ExpansionPanel>
      )
    }
  }
)
