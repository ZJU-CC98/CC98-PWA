import React from 'react'

import { withStyles, WithStyles, StyleRulesCallback } from '@material-ui/core/styles'
import classnames from 'classnames'

import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Collapse from '@material-ui/core/Collapse'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'

import red from '@material-ui/core/colors/red'

import ArrowDropUp from '@material-ui/icons/ArrowDropUp'
import ArrowDropDown from '@material-ui/icons/ArrowDropDown'
import ShareIcon from '@material-ui/icons/Share'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import MoreVertIcon from '@material-ui/icons/MoreVert'

import { PostInfo } from '../TypeDefinitions/PostInfo'
import { UserInfo } from '../TypeDefinitions/UserInfo'

const styles: StyleRulesCallback = theme => ({
  card: {
    width: '100%',
  },
  avatar: {
    backgroundColor: red[500]
  },
  avatarImg: {
    width: 40,
  },
  floor: {
    marginRight: 4,
    fontSize: 14,
  },
  actions: {
    display: 'flex',
  },
  likeCount: {
    marginLeft: -10,
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
})

interface Props {
  postData: PostInfo,
  userData: UserInfo | null,
}

interface State {
  expanded: boolean
}

class PostCard extends React.PureComponent<Props & WithStyles, State> {
  state: State = {
    expanded: false,
  }

  expandClickHandle = () => {
    this.setState({
      expanded: !this.state.expanded
    })
  }

  render() {
    const { classes, postData, userData } = this.props

    return (
      <Card className={classes.card}>

        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>
              {
                userData && userData.portraitUrl
                  ? <img className={classes.avatarImg}
                    src={userData.portraitUrl}
                  />
                  : 'H'
              }
            </Avatar>
          }
          action={
            <IconButton className={classes.floor}>
              <span>{postData.floor + ' L'}</span>
            </IconButton>
          }
          title={postData.userName}
          subheader={new Date(postData.time).toLocaleString()}
        />

        <CardContent>
          <Typography component="p">
            {postData.content}
          </Typography>
        </CardContent>

        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton><ArrowDropUp /></IconButton>
          <Typography className={classes.likeCount}>  {postData.likeCount} </Typography>

          <IconButton><ArrowDropDown /></IconButton>
          <Typography className={classes.likeCount}>  {postData.dislikeCount} </Typography>
          <IconButton><ShareIcon /></IconButton>

          {userData && userData.signatureCode && <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded,
            })}
            onClick={this.expandClickHandle}
          >
            <ExpandMoreIcon />
          </IconButton>}
        </CardActions>

        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography component="p">
              {userData && userData.signatureCode}
            </Typography>
          </CardContent>
        </Collapse>

      </Card>
    )
  }
}


export default withStyles(styles)<Props>(PostCard)
