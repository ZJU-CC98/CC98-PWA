import React, { useState } from 'react'

import { css } from 'emotion'
import { Subscribe } from '@cc98/state'

import { BoardInfoStore } from '@/model/board'
import { TopicInfoStore } from '@/model/topic'

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
  id: string
  classes: ClassNameMap
}
interface State {
  topicInstance: TopicInfoStore
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

export default withStyles(styles)((props: Props) => {
  const [topicInstance] = useState(new TopicInfoStore())

  return (
    <Subscribe to={[BoardInfoStore, topicInstance]}>
      {(boardInstance: BoardInfoStore) => {
        const { topics, isLoading, isEnd, board, tag1, tag2, tags, searchMes } = topicInstance.state
        const { classes } = props
        if (!searchMes || searchMes.id !== props.id) {
          topicInstance.reset()
          topicInstance.init(props.id, 'inboard')
          topicInstance.put(state => (state.itags = boardInstance.state.tagData))
        }

        if (boardInstance.state.boardData.length === 0) {
          return null
        }

        return (
          <Paper className={boardStyle}>
            {board && <BoardHead data={board} topicInstance={topicInstance} />}
            <div>
              {tag1 ? (
                <FormControl className={classes.formControl} classes={{ root: classes.selectRoot }}>
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
                <FormControl className={classes.formControl} classes={{ root: classes.selectRoot }}>
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
                  topicInstance.getTopics(props.id, 'inboard')
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
})
