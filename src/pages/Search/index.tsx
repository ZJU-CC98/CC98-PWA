import React from 'react'
import { css } from 'react-emotion'

import { TopicInfoStore } from '@/model/topic';

import { Button, List, Paper } from '@material-ui/core'

import SearchInput from 'react-search-input'

import InfiniteList from '@/components/InfiniteList'
import TopicItem from '@/components/TopicItem'

import { GET } from '@/utils/fetch'
import { ITopic } from '@cc98/api'
import { Subscribe } from '@cc98/state';

interface State {
  searchTerm: string
  view: boolean
}

const root = css`
  display: flex;
  flex-direction: column;
  width: 100%;
`
export default class extends React.Component<{}, State> {
  state: State = {
    searchTerm: '',
    view: false,
  }

  searchUpdated = (term: string) => {
    this.setState({ searchTerm: term })
  }

  render() {

    return (
      <Subscribe to={[TopicInfoStore]}>
        {(topicInstance: TopicInfoStore) => {
          const { getTopics, reset } = topicInstance
          const { isLoading, isEnd, topics, searchMes } = topicInstance.state
          if (!searchMes) {
            topicInstance.init(null, 'search')
          }

          return (<div className={root}>
            <SearchInput className="search-input" onChange={this.searchUpdated} />
            <Button
              color="primary"
              variant="outlined"
              onClick={() => {
                reset()
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
          </div>)
        }}
      </Subscribe>
    )
  }
}
