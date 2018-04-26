import React from 'react'

import { withStyles, WithStyles, StyleRulesCallback } from '@material-ui/core/styles'

import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import Typography from '@material-ui/core/Typography'


import { TopicInfo } from '../TypeDefinitions/TopicInfo'

const styles: StyleRulesCallback = theme => ({
  card: {
    width: '100%',
    backgroundColor: '#F5F5F6'
  },
  title: {
    // fontWeight: 'bold',
  }
})

interface Props {
  topicData: TopicInfo
}

interface State {

}

class PostHeader extends React.PureComponent<Props & WithStyles, State> {

  render() {
    const { classes, topicData } = this.props

    return (
      <Card className={classes.card}>

        <CardHeader
          title={
            <Typography className={classes.title}>
              { topicData.title }
            </Typography>
          }
        />

      </Card>
    )
  }
}


export default withStyles(styles)<Props>(PostHeader)
