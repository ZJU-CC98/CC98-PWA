import InfiniteList from '@/components/InfiniteList'
import boardInstance from '@/model/board'
import topicInstance from '@/model/topic'
import { IBoard, ITag, ITopic } from '@cc98/api'
import { Subscribe } from '@cc98/state'
import { List } from '@material-ui/core'
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'
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

// export default withStyles(styles)(
//   class extends React.Component<Props & { classes: ClassNameMap }, State> {
//     state: State = {
//       board: null,
//       topics: [],
//       isLoading: false,
//       isEnd: false,
//       from: 0,
//       tag1: null,
//       tag2: null,
//       tags: [],
//     }

//     componentDidMount() {
//       this.getBoard()
//       this.getTags()
//       this.getTopTopics()
//       this.getTopics()
//     }

//     getTags = async () => {
//       const { id } = this.props
//       const tagsData = await GET<ITag[]>(`board/${id}/tag`)
//       tagsData
//         .fail()
//         .succeed(
//           tags => {
//             // 初始化标签
//             if (tags.length !== 0) {
//               const tag1 = { id: -1, name: '全部' }
//               let tag2 = null;
//               if (tags.length === 2) {
//                 tag2 = { id: -1, name: '全部' }
//               }
//               this.setState({ tags, tag1, tag2 })
//             }
//           }
//         )
//     }

//     getTopTopics = async () => {
//       const { id } = this.props
//       const topTopicsData = await GET<ITopic[]>(`topic/toptopics?boardid=${id}`)
//       topTopicsData.map(topTopics => {
//         this.setState({
//           topics: this.state.topics.concat(topTopics),
//         })
//       })
//     }

//     getBoard = async () => {
//       const { id } = this.props
//       const boardData = await GET<IBoard>(`board/${id}`)
//       boardData.map(board => {
//         const size = (board.topicCount - (board.topicCount % 20)) / 20 + 1
//         this.setState({ board })
//       })
//     }

//     getTopics = async () => {
//       this.setState({
//         isLoading: true,
//       })
//       const { id } = this.props;
//       const { from, tag1, tag2 } = this.state;
//       // 无标签
//       if ((!tag1 || tag1.id < 0) && (!tag2 || tag2.id < 0)) {
//         const topicsData = await GET<ITopic[]>(`board/${id}/topic?from=${from}&size=20`)
//         topicsData.map(topics => {
//           this.setState({
//             topics: this.state.topics.concat(topics),
//             from: from + topics.length,
//             isLoading: false,
//             isEnd: topics.length !== 20,
//           })
//         })
//       } else if ((tag1 && tag1.id >= 0) && (tag2 && tag2.id > 0)) {
//         // 2tags
//         const topicsData =
//           await GET(
//             `topic/search/board/${id}/tag?tag1=${tag1.id}&tag2=${tag2.id}&from=${from}&size=20`)
//         topicsData.map(topics => {
//           this.setState({
//             topics: this.state.topics.concat(topics.topics),
//             from: from + topics.length,
//             isLoading: false,
//             isEnd: topics.length !== 20,
//           })
//         })
//       } else {
//         // 1 tag
//         let layer = 1;
//         let tId = 0;
//         if (tag1 && tag1.id > 0) {
//           tId = tag1.id
//         }
//         if (tag2 && tag2.id >= 0) {
//           layer = 2;
//           tId = tag2.id;
//         }
//         const topicsData =
//           await GET(
//             `topic/search/board/${id}/tag?tag${layer}=${tId}&from=${from}&size=20`)
//         topicsData.map(topics => {
//           this.setState({
//             topics: this.state.topics.concat(topics.topics),
//             from: from + topics.length,
//             isLoading: false,
//             isEnd: topics.length !== 20,
//           })
//         })
//       }
//     }

//     handleChange = (index: keyof State) => (event: React.ChangeEvent<HTMLSelectElement>) => {
//       const { tags } = this.props;
//       // tslint:disable-next-line:radix
//       const id = parseInt(event.target.value);
//       const name = getTagName(tags, id);
//       if (index === 'tag1') {
//         this.setState({ tag1: { id, name }, from: 0, topics: [] }, () => { this.getTopics() });
//       } else {
//         this.setState({ tag2: { id, name }, from: 0, topics: [] }, () => { this.getTopics() });
//       }
//     };

//     render() {
//       const { topics, board, isLoading, isEnd, tags, tag1, tag2 } = this.state
//       const { classes } = this.props

//       return (
//         <div className={BoardStyle}>
//           <BoardHead data={board} />
//           <div>
//             {tag1 ? <FormControl
//               className={classes.formControl}
//               classes={{ root: classes.selectRoot }}
//             >
//               <Select
//                 value={tag1.id}
//                 onChange={this.handleChange('tag1')}
//                 inputProps={{
//                   name: 'age',
//                   id: 'age-native-simple',
//                 }}
//               >
//                 <MenuItem key={0} value={-1}>全部</MenuItem>
//                 {tags[0].tags.map(tag =>
//                   <MenuItem key={tag.id} value={tag.id}>{tag.name}</MenuItem>)}
//               </Select>
//             </FormControl> : null}
//             {tag2 ? <FormControl
//               className={classes.formControl}
//               classes={{ root: classes.selectRoot }}
//             >
//               <Select
//                 autoWidth
//                 value={tag2.id}
//                 onChange={this.handleChange('tag2')}
//                 inputProps={{
//                   name: 'age',
//                   id: 'age-native-simple',
//                 }}
//               >
//                 <MenuItem key={0} value={-1}>全部</MenuItem>
//                 {tags[1].tags.map(tag =>
//                   <MenuItem key={tag.id} value={tag.id}>{tag.name}</MenuItem>)}
//               </Select>
//             </FormControl> : null}
//           </div>
//           <List style={{ width: '100%' }}>
//             <InfiniteList isLoading={isLoading} isEnd={isEnd} callback={this.getTopics}>
//               {topics.map(topic => (
//                 <TopicItem key={topic.id} data={topic} place={'inboard'} />
//               ))}
//             </InfiniteList>
//           </List>
//         </div>
//       )
//     }
//   }
// )

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
              <div className={BoardStyle}>
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
              </div>
            )
          }
          }
        </Subscribe>
      )
    }
  }
)
