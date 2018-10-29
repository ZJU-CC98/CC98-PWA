import InfinitiList from '@/components/InfinitiList';
import { GET } from '@/utils/fetch'
import { IBoard, ITag, ITopic } from '@cc98/api'
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { Theme, withStyles } from '@material-ui/core/styles';
import { ClassNameMap, StyleRulesCallback } from '@material-ui/core/styles/withStyles';
import { css } from 'emotion'
import React from 'react'
import BoardHead from './BoardHead'
import TopicItem from './TopicItem'
interface Tag {
  name: string
  id: number
}
interface Props {
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
});
const BoardStyle = css`
  && {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
`

const PaginationStyle = css`
  width: 100%;
  display: flex;
  justify-content: center;
`
export default withStyles(styles)(
  class extends React.Component<Props & { classes: ClassNameMap }, State> {
    state: State = {
      board: null,
      topics: [],
      isLoading: false,
      isEnd: false,
      from: 0,
      tag1: null,
      tag2: null,
      tags: [],
    }

    componentDidMount() {
      this.getBoard()
      this.getTags()
      this.getTopTopics()
      this.getTopics()
      // 初始化标签
      const { tags } = this.state
      if (tags.length !== 0) {
        const tag1 = tags[0].tags[0];
        let tag2 = null;
        if (tags.length === 2) {
          tag2 = tags[1].tags[0];
        }
        this.setState({ tag1, tag2 })
      }
    }

    getTags = async () => {
      const { id } = this.props
      const tagsData = await GET<ITag[]>(`board/${id}/tag`)
      tagsData
        .fail()
        .succeed(
          tags => {
            this.setState({ tags, })
          }
        )
    }

    getTopTopics = async () => {
      const { id } = this.props
      const topTopicsData = await GET<ITopic[]>(`topic/toptopics?boardid=${id}`)
      topTopicsData.map(async topTopics => {
        this.setState({
          topics: this.state.topics.concat(topTopics),
        })
      })
    }

    getBoard = async () => {
      const { id } = this.props
      const boardData = await GET<IBoard>(`board/${id}`)
      boardData.map(board => {
        const size = (board.topicCount - (board.topicCount % 20)) / 20 + 1
        this.setState({ board })
      })
    }

    getTopics = async () => {
      this.setState({
        isLoading: true,
      })
      const { id } = this.props;
      const { from } = this.state;
      const topicsData = await GET<ITopic[]>(`board/${id}/topic?from=${from}&size=20`)
      topicsData.map(topics => {
        this.setState({
          topics: this.state.topics.concat(topics),
          from: from + topics.length,
          isLoading: false,
          isEnd: topics.length !== 20,
        })
      })

    }

    handleChange = (index: keyof State) => (event: React.ChangeEvent<HTMLSelectElement>) => {
      // tslint:disable-next-line:radix
      const id = parseInt(event.target.value);
      const name = '';
      if (index === 'tag1') {
        this.setState({ tag1: { id, name } });
      } else {
        this.setState({ tag2: { id, name } });
      }
    };

    render() {
      const { topics, board, isLoading, isEnd } = this.state
      const { classes } = this.props

      return (
        <div className={BoardStyle}>
          <BoardHead data={board} />
          <div>
            {this.state.tag1 ? <FormControl className={classes.formControl}>
              <InputLabel htmlFor="age-native-simple">Age</InputLabel>
              <Select
                native
                value={this.state.tag1.id}
                onChange={this.handleChange('tag1')}
                inputProps={{
                  name: 'age',
                  id: 'age-native-simple',
                }}
              >
                <option value={10}>Ten</option>
                <option value={20}>Twenty</option>
                <option value={30}>Thirty</option>
              </Select>
            </FormControl> : null}
            {this.state.tag2 ? <FormControl className={classes.formControl}>
              <InputLabel htmlFor="age-native-simple">Age</InputLabel>
              <Select
                native
                value={this.state.tag2.id}
                onChange={this.handleChange('tag2')}
                inputProps={{
                  name: 'age',
                  id: 'age-native-simple',
                }}
              >
                <option value="" />
                <option value={10}>Ten</option>
                <option value={20}>Twenty</option>
                <option value={30}>Thirty</option>
              </Select>
            </FormControl> : null}
          </div>
          <InfinitiList isLoading={isLoading} isEnd={isEnd} callback={this.getTopics}>
            {topics.map(topic => (
              <TopicItem key={topic.id} data={topic} />
            ))}
          </InfinitiList>
        </div>
      )
    }
  }
)
