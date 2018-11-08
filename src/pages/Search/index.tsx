import React from 'react'
import { css } from 'react-emotion'

import { Subscribe } from '@cc98/state'
import { TopicInfoStore } from '@/model/topic'

import { TextField, Button, List, Paper } from '@material-ui/core'

import InfiniteList from '@/components/InfiniteList'
import TopicItem from '@/components/TopicItem'

const root = css`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const searchInput = css`
  display: flex;
  align-items: center;
  height: 70px;
`
interface State {
  searchTerm: string
  view: boolean
  topicInstance: TopicInfoStore
}

export default class extends React.Component<{}, State> {
  state: State = {
    searchTerm: '',
    view: false,
    topicInstance: new TopicInfoStore(),
  }

  searchUpdated = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value })
  }

  render() {
    const { searchTerm, topicInstance } = this.state

    return (
      <Subscribe to={[topicInstance]}>
        {() => {
          const { getTopics, reset, init } = topicInstance
          const { isLoading, isEnd, topics, searchMes } = topicInstance.state
          if (!searchMes) {
            init(null, 'search')
          }

          return (
            <div className={root}>
              <div className={searchInput}>
                <TextField
                  label="搜索"
                  value={searchTerm}
                  onChange={this.searchUpdated}
                  fullWidth
                />
              </div>
              <Button
                color="primary"
                variant="outlined"
                onClick={() => {
                  reset()
                  init(null, 'search')
                  getTopics(null, 'search', this.state.searchTerm)
                  this.setState({ view: true })
                }}
              >
                搜索
              </Button>
              {this.state.view && (
                <Paper>
                  <InfiniteList
                    isLoading={isLoading}
                    isEnd={isEnd}
                    callback={() => {
                      getTopics(null, 'search', this.state.searchTerm)
                    }}
                  >
                    <List>
                      {topics.map(info => (
                        <TopicItem key={info.id} data={info} place={'search'} />
                      ))}
                    </List>
                  </InfiniteList>
                </Paper>
              )}
            </div>
          )
        }}
      </Subscribe>
    )
  }
}
