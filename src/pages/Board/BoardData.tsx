import InfinitiList from '@/components/InfinitiList';
import getTagName from '@/services/getTagName'
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
    }

    getTags = async () => {
      const { id } = this.props
      const tagsData = await GET<ITag[]>(`board/${id}/tag`)
      tagsData
        .fail()
        .succeed(
          tags => {
            // 初始化标签
            if (tags.length !== 0) {
              const tag1 = { id: -1, name: '全部' }
              let tag2 = null;
              if (tags.length === 2) {
                tag2 = { id: -1, name: '全部' }
              }
              this.setState({ tags, tag1, tag2 })
            }
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
      console.log("in")
      this.setState({
        isLoading: true,
      })
      const { id } = this.props;
      const { from, tag1, tag2 } = this.state;
      // 无标签
      if ((!tag1 || tag1.id < 0) && (!tag2 || tag2.id < 0)) {
        const topicsData = await GET<ITopic[]>(`board/${id}/topic?from=${from}&size=20`)
        topicsData.map(topics => {
          this.setState({
            topics: this.state.topics.concat(topics),
            from: from + topics.length,
            isLoading: false,
            isEnd: topics.length !== 20,
          })
        })
      } else if ((tag1 && tag1.id >= 0) && (tag2 && tag2.id > 0)) {
        // 2tags
        const topicsData =
          await GET(
            `topic/search/board/${id}/tag?tag1=${tag1.id}&tag2=${tag2.id}&from=${from}&size=20`)
        topicsData.map(topics => {
          this.setState({
            topics: this.state.topics.concat(topics.topics),
            from: from + topics.length,
            isLoading: false,
            isEnd: topics.length !== 20,
          })
        })
      } else {
        // 1 tag
        let layer = 1;
        let tId = 0;
        if (tag1 && tag1.id > 0) {
          tId = tag1.id
        }
        if (tag2 && tag2.id >= 0) {
          layer = 2;
          tId = tag2.id;
        }
        const topicsData =
          await GET(
            `topic/search/board/${id}/tag?tag${layer}=${tId}&from=${from}&size=20`)
        topicsData.map(topics => {
          this.setState({
            topics: this.state.topics.concat(topics.topics),
            from: from + topics.length,
            isLoading: false,
            isEnd: topics.length !== 20,
          })
        })
      }
    }

    handleChange = (index: keyof State) => (event: React.ChangeEvent<HTMLSelectElement>) => {
      const { tags } = this.props;
      // tslint:disable-next-line:radix
      const id = parseInt(event.target.value);
      const name = getTagName(tags, id);
      if (index === 'tag1') {
        this.setState({ tag1: { id, name }, from: 0, topics: [] }, () => { this.getTopics() });
      } else {
        this.setState({ tag2: { id, name }, from: 0, topics: [] }, () => { this.getTopics() });
      }
    };

    render() {
      const { topics, board, isLoading, isEnd, tags, tag1, tag2 } = this.state
      const { classes } = this.props
      console.log(topics);
      return (
        <div className={BoardStyle}>
          <BoardHead data={board} />
          <div>
            {tag1 ? <FormControl className={classes.formControl}>
              <InputLabel htmlFor="age-native-simple">标签1</InputLabel>
              <Select
                native
                value={tag1.id}
                onChange={this.handleChange('tag1')}
                inputProps={{
                  name: 'age',
                  id: 'age-native-simple',
                }}
              >
                <option key={0} value={-1}>全部</option>
                {tags[0].tags.map(tag => <option key={tag.id} value={tag.id}>{tag.name}</option>)}
              </Select>
            </FormControl> : null}
            {tag2 ? <FormControl className={classes.formControl}>
              <InputLabel htmlFor="age-native-simple">标签2</InputLabel>
              <Select
                native
                value={tag2.id}
                onChange={this.handleChange('tag2')}
                inputProps={{
                  name: 'age',
                  id: 'age-native-simple',
                }}
              >
                <option key={0} value={-1}>全部</option>
                {tags[1].tags.map(tag => <option key={tag.id} value={tag.id}>{tag.name}</option>)}
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
