import { IBoard } from '@cc98/api'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import { StyleRules, withStyles } from '@material-ui/core/styles'
import { ClassNameMap } from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { navigate } from '@reach/router'
import { css } from 'emotion'
import React from 'react'

interface Props {
  data: IBoard | null
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
const BoardHeader = css`
  width: 100%;
  position:sticky;
  top:0px;
  z-index:1105;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  background-color:#fff;
`
const BoardTitle = css`
  && {
    text-align: center;
    font-size: 1.8rem;
    flex-grow:2;
    display:flex;
  }
`
const BoardMessage = css`
  display: flex;
  font-size: 1rem;
  align-items: center;
  justify-content: space-between;
  width:100%;
`
const BoardTopicNumber = css`
  font-size:1rem;
  margin-right:1rem;
`
const FollowBtnStyle = css`
  && {
    width: 1.5rem;
    height: 0.8rem;
    margin-right: 1rem;
  }
`
const BoardMasters = css`
  display:flex;
  width:100%;
  padding-left:1.5rem;
  border-bottom:#eaeaea solid thin;
`

export default withStyles(styles)(
  class extends React.Component<Props & { classes: ClassNameMap }, State> {
    state: State = {
      isFollowed: false,
    }

    changeFollowStatus = async () => {
      const url = ''
    }

    render() {
      let { data } = this.props
      const { classes } = this.props;
      if (!data) {
        data = {
          id: 0,
          todayCount: 0,
          topicCount: 0,
          postCount: 0,
          name: '',
          boardMasters: [],
          description: '',
        }
      }
      const { isFollowed } = this.state;

      return (
        <div className={BoardHeader}>

          <div className={BoardMessage}>
            <Button color="primary" className={BoardTitle}>{data.name}</Button>
            <div className={BoardTopicNumber}>{data.todayCount}/{data.topicCount}</div>
            <Button
              className={FollowBtnStyle}
              onClick={this.changeFollowStatus}
              variant="outlined"
            >
              {isFollowed ? '取关' : '关注'}
            </Button>

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
          <div className={BoardMasters}>

            <Button size="small" color="primary">
              版主:
          </Button>{' '}
            {data.boardMasters.map(master => (
              <Button
                key={master}
                size="small"
                color="primary"
              >
                {master}
              </Button>
            ))}
          </div>

        </div>
      )
    }
  }
)
