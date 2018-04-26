import React from 'react'

import { withStyles, WithStyles, StyleRulesCallback } from '@material-ui/core/styles'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

import Typography from '@material-ui/core/Typography'

const styles: StyleRulesCallback = theme => ({
  card: {
    width: '100%',
  },
  topicBoard: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  topicAuthor: {
    marginLeft: 15,
    fontSize: 14,
  },
  topicMeta: {
    margin: 0,
    marginBottom: 5,
  },
  topicTitle: {
    margin: 0,
    fontSize: 14,
  },
});

interface Props {
  topicData: any,
  clickHandle: (topicID) => void
}

class TopicCard extends React.PureComponent<Props & WithStyles, {}> {

  render() {
    const { classes, topicData, clickHandle } = this.props;

    return (
      <Card className={classes.card}
        onClick={ _ => clickHandle(topicData.id) }
      >
        <CardContent>
          <p className={classes.topicMeta}>
            <span className={classes.topicBoard}>
              {`${topicData.boardName}`}
            </span>
            <span className={classes.topicAuthor}>
              {topicData.authorName}
            </span>
          </p>
          <p className={classes.topicTitle}>
            {topicData.title}
          </p>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)<Props>(TopicCard)
