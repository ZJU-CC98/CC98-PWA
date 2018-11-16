import React, { useState } from 'react'
import { css } from 'react-emotion'

import { TextField, Button, List, Paper } from '@material-ui/core'

import { searchTopics } from '@/services/topic'
import { ITopic } from '@cc98/api'
import InfiniteList from '@/components/InfiniteList'
import TopicItem from '@/components/TopicItem'

interface State {
  from: number
  isLoading: boolean
  isEnd: boolean
}

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

export default () => {
  const [view, setView] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [state, setState] = useState<State>({
    isLoading: false,
    isEnd: false,
    from: 0,
  })
  const [topics, setTopics] = useState<ITopic[]>([])

  const { isLoading, isEnd, from } = state

  const search = async () => {
    const res = await searchTopics(searchTerm, from)
    res.fail().succeed(data => {
      setTopics(prevTopics => prevTopics.concat(data))
      setState({
        isLoading: false,
        isEnd: data.length !== 20,
        from: state.from += data.length,
      })
    })
  }

  return (
    <div className={root}>
      <div className={searchInput}>
        <TextField
          label="搜索"
          value={searchTerm}
          autoFocus={true}
          onChange={e => setSearchTerm(e.target.value)}
          fullWidth
        />
      </div>
      <Button
        color="primary"
        variant="outlined"
        onClick={() => {
          setState({ ...state, from: 0 })
          setTopics([])
          search()
          setView(true)
        }}
      >
        搜索
      </Button>
      {view && (
        <Paper>
          <InfiniteList
            isLoading={isLoading}
            isEnd={isEnd}
            callback={() => {
              search()
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
}
