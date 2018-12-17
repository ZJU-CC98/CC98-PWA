import React from 'react'

import styled from 'styled-components'

import { Chip } from '@material-ui/core'
import { ITag } from '@cc98/api'

interface Props {
  tags: ITag[]
  tagChange: (tag: ITag) => void
  nowTag?: number
}

const Taglistbox = styled.div`
  background-color: #fff;
  margin-bottom: 2px;
  padding: 3px;
`

const Scrollbox = styled.div`
  overflow: auto;
  widows: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px;
  height: 70px;
  justify-content: space-between;
`

const Insidebox = styled.div`
  width: 100%;
  white-space: nowrap;
  height: 40px;
  line-height: 30px;
  background: #fff;
  overflow-y: hidden;
  overflow-x: scroll;
  display: inline-block;
`
export default ({ tags, tagChange, nowTag }: Props) => {
  const chooseTag = nowTag ? nowTag : tags[0]
  // FIXME: 这里的tag滑动可能导致goback

  return (
    <>
      <Taglistbox style={{ flex: 1, flexDirection: 'column' }}>
        <Scrollbox>
          <Insidebox>
            {tags.map(tag => (
              <Chip
                style={{ marginRight: '20px' }}
                label={tag.name}
                onClick={() => {
                  tagChange(tag)
                }}
                color={nowTag === tag.id ? 'primary' : 'default'}
              />
            ))}
          </Insidebox>
        </Scrollbox>
      </Taglistbox>
    </>
  )
}
// class ScrollTag extends React.Component<Props, State> {
//   state: State = {
//     clickTag: [],
//   }

//   didChose = (tag: TagType) => {
//     let ret = false
//     this.state.clickTag.forEach(e => {
//       if (e.id === tag.id) ret = true
//     })

//     return ret
//   }

//   handleClick = (tag: TagType) => {
//     const { clickTag } = this.state
//     const { maxTag, tagChange } = this.props
//     if (this.didChose(tag)) {
//       // 取消选中表气啊
//       const stateTag = clickTag.filter(e => e.id !== tag.id)
//       tagChange(stateTag)
//       this.setState({ clickTag: stateTag })
//     } else {
//       // 选中标签
//       if (clickTag.length > maxTag - 1) {
//       } else {
//         const stateTag = clickTag.concat([tag])
//         tagChange(stateTag)
//         this.setState({ clickTag: stateTag })
//       }
//     }
//   }

//   render() {
//     const { tags } = this.props
//     if (!tags) {
//       return null
//     }
//   }
// }
