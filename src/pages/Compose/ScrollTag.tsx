import React from 'react'

import { css } from 'emotion'

import toast from '@/utils/Toast'
import {
  Chip,
} from '@material-ui/core'

interface TagType {
  id: number,
  name: string,
}
interface State {
  clickTag: TagType[],
}

interface Props {
  tags: TagType[] | null,
  maxTag: number,
  tagChange: (tag: TagType[]) => void
}
const taglistbox = css`
  background-color: #fff;
  margin-bottom: 2px;
  padding: 3px;
`

const scrollbox = css`
  overflow: auto;
  widows: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px;
  height: 70px;
  justify-content: space-between;
`

const insidebox = css`
  width: 100%;
  white-space: nowrap;
  height: 40px;
  line-height: 30px;
  background: #fff;
  overflow-y: hidden;
  overflow-x: scroll;
  display: inline-block;
`

class ScrollTag extends React.Component<Props, State> {
  state: State = {
    clickTag: [],
  }

  didChose = (tag: TagType) => {
    let ret = false
    this.state.clickTag.forEach(e => {
      if (e.id === tag.id) ret = true
    });

    return ret
  }

  handleClick = (tag: TagType) => {
    const { clickTag } = this.state
    const { maxTag, tagChange } = this.props
    if (this.didChose(tag)) { // 取消选中表气啊
      const stateTag = clickTag.filter(e => e.id !== tag.id)
      tagChange(stateTag)
      this.setState({ clickTag: stateTag })
    } else { // 选中标签
      if (clickTag.length > maxTag - 1) {
        toast.info({ content: `最多只能选择${maxTag}个标签` })
      } else {
        const stateTag = clickTag.concat([tag])
        tagChange(stateTag)
        this.setState({ clickTag: stateTag })
      }
    }
  }

  render() {
    const { tags } = this.props
    if (!tags) {
      return null
    }

    return(
      <>
        <div className={taglistbox} style={{ flex: 1, flexDirection: 'column' }}>
          <div className={scrollbox}>
            <div className={insidebox}>
              { tags.map(tag => (
                <Chip
                  style={{ marginRight: '20px' }}
                  label={tag.name}
                  onClick={() => {
                    this.handleClick(tag)
                  }}
                  color={
                    this.didChose(tag) ? 'primary' : 'default'
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default ScrollTag
