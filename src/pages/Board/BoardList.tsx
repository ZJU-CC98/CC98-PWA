import React from 'react'
import { css } from 'emotion'

import { TextField } from '@material-ui/core'

import BaseBoard from './BaseBoardItem'
import BoardItem from './BoardItem'

import { IBaseBoard, IBoard } from '@cc98/api'

const searchInput = css`
  display: flex;
  align-items: center;
  height: 70px;
`

interface Props {
  boards: IBoard[]
  boardList: IBaseBoard[]
}

interface State {
  // boardList: IBaseBoard[]
  isLoading: boolean
  searchTerm: string
}

export default class extends React.Component<Props, State> {
  state: State = {
    // boardList: [],
    isLoading: true,
    searchTerm: '',
  }

  searchUpdated = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      searchTerm: event.target.value,
    })
  }

  render() {
    const { searchTerm } = this.state
    const { boardList, boards } = this.props

    const filteredBoards = boards.filter(board => board.name.indexOf(searchTerm) !== -1)

    return (
      <>
        {/* TODO: 放右下角 */}
        <div className={searchInput}>
          <TextField
            label="搜索版面名称"
            value={this.state.searchTerm}
            onChange={this.searchUpdated}
            fullWidth
          />
        </div>

        {searchTerm ? filteredBoards.map(board => <BoardItem key={board.id} data={board} />) : null}

        {searchTerm ? null : boardList.map(data => <BaseBoard key={data.id} data={data} />)}
      </>
    )
  }
}
