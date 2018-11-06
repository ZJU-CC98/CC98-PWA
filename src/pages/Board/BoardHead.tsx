import React from 'react'

import { navigate } from '@reach/router'
import { css } from 'emotion'

import {
  Button,
  Typography,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Paper
} from '@material-ui/core'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import { StyleRules, withStyles } from '@material-ui/core/styles'
import { ClassNameMap } from '@material-ui/core/styles/withStyles'

import { IBoard } from '@cc98/api'

interface Props {
  data: IBoard | null
  classes: ClassNameMap
}
interface State {
  isFollowed: boolean
}
const styles: StyleRules = {
  root: {
    width: '100%',
    boxShadow: '0 0 0 0',
    borderTop: '#eaeaea solid thin',
    borderBottom: '#eaeaea solid thin',
  },
  expanded: {
    marginTop: '0.5rem',
    marginBottom: '0.5rem',
  },
  summaryRoot: {
    height: '0.8rem',
  },
}
const boardHeader = css`
  width: 100%;
  position: sticky;
  top: 0px;
  z-index: 1105;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`
const boardTitle = css`
  && {
    text-align: center;
    font-size: 1.8rem;
    flex-grow: 2;
    display: flex;
  }
`
const boardMessage = css`
  display: flex;
  font-size: 1rem;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100px;
`
const boardTopicNumber = css`
  font-size: 1rem;
  margin-right: 1rem;
`
const followBtnStyle = css`
  && {
    width: 1.5rem;
    height: 0.8rem;
    margin-right: 0.4rem;
  }
`
const boardMasters = css`
  display: flex;
  width: 100%;
  padding-left: 1.5rem;
  border-bottom: #eaeaea solid thin;
`
const toolButton = css`
  margin-right: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
`
export default withStyles(styles)(
  class extends React.Component<Props, State> {
    state: State = {
      isFollowed: false,
    }

    changeFollowStatus = async () => {
      const url = ''
    }

    render() {
      const { classes } = this.props
      const data = this.props.data
        ? this.props.data
        : {
          id: 0,
          todayCount: 0,
          topicCount: 0,
          postCount: 0,
          name: '',
          boardMasters: [],
          description: '',
        }
      const { isFollowed } = this.state

      return (
        <Paper className={boardHeader}>
          <div className={boardMessage}>
            <Button color="primary" className={boardTitle}>
              {data.name}
            </Button>
            <div className={boardTopicNumber}>
              {data.todayCount}/{data.topicCount}
            </div>
            <div className={toolButton}>
              <Button
                className={followBtnStyle}
                variant="contained"
                color="primary"
                onClick={() => {
                  navigate(`/compose/${data.id}`)
                }}
              >
                发帖
              </Button>
              <Button
                className={followBtnStyle}
                onClick={this.changeFollowStatus}
                variant="outlined"
              >
                {isFollowed ? '取关' : '关注'}
              </Button>
            </div>
          </div>

          <ExpansionPanel classes={{ root: classes.root, expanded: classes.expanded }}>
            <ExpansionPanelSummary
              classes={{ root: classes.summaryRoot }}
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography>
                <Button color="primary">版面公告</Button>
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>{data.description}</ExpansionPanelDetails>
          </ExpansionPanel>
          <div className={boardMasters}>
            <Button size="small" color="primary">
              版主:
            </Button>{' '}
            {data.boardMasters.map(master => (
              <Button key={master} size="small" color="primary">
                {master}
              </Button>
            ))}
          </div>
        </Paper>
      )
    }
  }
)
