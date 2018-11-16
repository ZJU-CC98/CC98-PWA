import React from 'react'

import { css } from 'emotion'

import toast from './Toast'
import { Chip } from '@material-ui/core'

export interface TagType {
  id: string
  name: string
}
interface Props {
  tags: TagType[] | null
  clickTag: TagType[]
  onChange: (clickTag: TagType[]) => void
  maxTag: number
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
const didChose = (clickTag: TagType[], tag: TagType) => {
  let ret = false
  clickTag.forEach(e => {
    if (e.id === tag.id) ret = true
  })

  return ret
}

const handleClick = (clickTag: TagType[], tag: TagType) => {
  const { maxTag } = this.props
  if (didChose(clickTag, tag)) {
    // 取消选中表气啊
    const stateTag = clickTag.filter(e => e.id !== tag.id)
    this.setState({ clickTag: stateTag })
  } else {
    // 选中标签
    if (clickTag.length > maxTag - 1) {
      toast.info({ content: `最多只能选择${maxTag}个标签` })
    } else {
      const stateTag = clickTag.concat([tag])
      this.setState({ clickTag: stateTag })
    }
  }
}

const ScrollTag: React.FunctionComponent<Props> = props => {
  const clickTag = props.clickTag
  if (!props.tags) {
    return null
  }

  return (
    <>
      <div className={taglistbox} style={{ flex: 1, flexDirection: 'column' }}>
        <div className={scrollbox}>
          <div className={insidebox}>
            {props.tags.map(tag => (
              <Chip
                style={{ marginRight: '20px' }}
                label={tag.name}
                onClick={() => {
                  // 判断是否选中
                  if (didChose(clickTag, tag)) {
                    const stateTag = clickTag.filter(e => e.id !== tag.id)
                    props.onChange(stateTag)
                  } else {
                    // 判断是否超过可选的标签数目
                    if (clickTag.length > props.maxTag - 1) {
                      toast.info({ content: `最多只能选择${props.maxTag}个标签` })
                    } else {
                      const stateTag = clickTag.concat([tag])
                      props.onChange(stateTag)
                    }
                  }
                }}
                color={didChose(clickTag, tag) ? 'primary' : 'default'}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default ScrollTag
