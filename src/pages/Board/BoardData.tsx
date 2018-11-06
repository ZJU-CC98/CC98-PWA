import React from 'react'

import { css } from 'emotion'
import { Subscribe } from '@cc98/state'

import boardInstance from '@/model/board'
import topicInstance from '@/model/topic'

import InfiniteList from '@/components/InfiniteList'
import TopicItem from '@/components/TopicItem'

import { FormControl, MenuItem, Paper, Select, List } from '@material-ui/core'

import { Theme, withStyles } from '@material-ui/core/styles'
import { StyleRulesCallback, ClassNameMap } from '@material-ui/core/styles/withStyles'

import BoardHead from './BoardHead'

interface Tag {
  name: string
  id: number
}
interface Props {
  tags: Tag[]
  id: string
  classes: ClassNameMap
}
// interface State {
//   board: IBoard | null
//   topics: ITopic[]
//   isLoading: boolean
//   isEnd: boolean
//   from: number
//   tag1: Tag | null
//   tag2: Tag | null
//   tags: ITag[]
// }

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
    minWidth: 0,
  },
})

const boardStyle = css`
  && {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
`

export default withStyles(styles)(
  class extends React.PureComponent<Props, {}> {
    componentDidMount() {
      topicInstance.init(this.props.id, 'inboard')
      topicInstance.put(state => (state.itags = this.props.tags))
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
              <Paper className={boardStyle}>
                <BoardHead data={board} />
                <div>
                  {tag1 ? (
                    <FormControl
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
                        <MenuItem key={0} value={-1}>
                          全部
                        </MenuItem>
                        {tags[0].tags.map(tag => (
                          <MenuItem key={tag.id} value={tag.id}>
                            {tag.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  ) : null}
                  {tag2 ? (
                    <FormControl
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
                        <MenuItem key={0} value={-1}>
                          全部
                        </MenuItem>
                        {tags[1].tags.map(tag => (
                          <MenuItem key={tag.id} value={tag.id}>
                            {tag.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  ) : null}
                </div>

                <List style={{ width: '100%' }}>
                  <InfiniteList
                    isLoading={isLoading}
                    isEnd={isEnd}
                    callback={() => {
                      topicInstance.getTopics(this.props.id, 'inboard')
                    }}
                  >
                    {topics.map(topic => (
                      <TopicItem key={topic.id} data={topic} place={'inboard'} />
                    ))}
                  </InfiniteList>
                </List>
              </Paper>
            )
          }}
        </Subscribe>
      )
    }
  }
)
