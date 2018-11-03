import InfiniteList from '@/components/InfiniteList'
import boardInstance from '@/model/board'
import topicInstance from '@/model/topic'
import { IBoard, ITag, ITopic } from '@cc98/api'
import { Subscribe } from '@cc98/state'
import { List } from '@material-ui/core'
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select'
import { Theme, withStyles } from '@material-ui/core/styles'
import { ClassNameMap, StyleRulesCallback } from '@material-ui/core/styles/withStyles'
import { css } from 'emotion'
import React from 'react'
import TopicItem from '../TopicItem'
import BoardHead from './BoardHead'
interface Tag {
  name: string
  id: number
}
interface Props {
  tags: Tag[]
  id: string
}
interface State {
  board: IBoard | null
  topics: ITopic[]
  isLoading: boolean
  isEnd: boolean
  from: number
  tag1: Tag | null
  tag2: Tag | null
  tags: ITag[]
}
const styles: StyleRulesCallback = (theme: Theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  selectRoot: {
    minWidth: '0px',
  },
});
const BoardStyle = css`
  && {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
`

export default withStyles(styles)(
  class extends React.PureComponent<Props & { classes: ClassNameMap }, {}> {

    componentDidMount() {
      topicInstance.init(this.props.id, 'inboard')
      topicInstance.put(state => state.itags = this.props.tags)
    }
    componentWillUnmount() {
      topicInstance.reset()
    }

    render() {
      return (
        <Subscribe to={[topicInstance, boardInstance]}>
          {() => {
            const { topics, isLoading, isEnd, board, tag1, tag2, tags } = topicInstance.state
            const { classes } = this.props

            return (
              <Paper className={BoardStyle}>
                <BoardHead data={board} />
                <div>
                  {tag1 ? <FormControl
                    className={classes.formControl}
                    classes={{ root: classes.selectRoot }}
                  >
                    <Select
                      value={tag1.id}
                      onChange={topicInstance.handleChange('tag1')}
                      inputProps={{
                        name: 'age',
                        id: 'age-native-simple',
                      }}
                    >
                      <MenuItem key={0} value={-1}>全部</MenuItem>
                      {tags[0].tags.map(tag =>
                        <MenuItem key={tag.id} value={tag.id}>{tag.name}</MenuItem>)}
                    </Select>
                  </FormControl> : null}
                  {tag2 ? <FormControl
                    className={classes.formControl}
                    classes={{ root: classes.selectRoot }}
                  >
                    <Select
                      autoWidth
                      value={tag2.id}
                      onChange={topicInstance.handleChange('tag2')}
                      inputProps={{
                        name: 'age',
                        id: 'age-native-simple',
                      }}
                    >
                      <MenuItem key={0} value={-1}>全部</MenuItem>
                      {tags[1].tags.map(tag =>
                        <MenuItem key={tag.id} value={tag.id}>{tag.name}</MenuItem>)}
                    </Select>
                  </FormControl> : null}
                </div>

                <List style={{ width: '100%' }}>
                  <InfiniteList
                    isLoading={isLoading}
                    isEnd={isEnd}
                    callback={() => { topicInstance.getTopics(this.props.id, 'inboard') }}
                  >
                    {topics.map(topic => (
                      <TopicItem key={topic.id} data={topic} place={'inboard'} />
                    ))}
                  </InfiniteList>
                </List>
              </Paper>
            )
          }
          }
        </Subscribe>
      )
    }
  }
)
