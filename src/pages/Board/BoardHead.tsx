import { IBoard } from '@cc98/api'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { navigate } from '@reach/router'
import { css } from 'emotion'
import React from 'react'
interface Props {
  data: IBoard | null
}
const CardStyle = css`
  width: 100%;
`
const TitleStyle = css`
  && {
    width: 40%;
    text-align: center;
    font-size: 1.8rem;
  }
`
const OptionStyle = css`
  display: flex;
  flex-grow: 2;
  font-size: 1rem;
  align-items: center;
  justify-content: space-between;
`
const HeadStyle = css`
  && {
    display: flex;
  }
`
const FollowBtnStyle = css`
  && {
    width: 1.5rem;
    height: 0.8rem;
    margin-right: 1rem;
  }
`
export default class extends React.PureComponent<Props> {
  render() {
    let data = this.props.data
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
    return (
      <Card className={CardStyle}>
        <CardActionArea>
          <CardContent>
            <Typography className={HeadStyle} gutterBottom variant="h5" component="h2">
              <Button className={TitleStyle} color="primary">
                {data.name}
              </Button>
              <div className={OptionStyle}>
                <div>
                  {' '}
                  {data.todayCount}/{data.topicCount}
                </div>
                <Button className={FollowBtnStyle} variant="outlined">
                  关注
                </Button>
              </div>
            </Typography>
            <Typography component="p">
              <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>
                    <Button color="primary">版面公告</Button>
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>{data.description}</ExpansionPanelDetails>
              </ExpansionPanel>
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            版主:
          </Button>{' '}
          {data.boardMasters.map(master => (
            <Button onClick={() => navigate(`/user/name/${master}`)} size="small" color="primary">
              {master}
            </Button>
          ))}
        </CardActions>
      </Card>
    )
  }
}
