import React, { useState, useEffect } from 'react'

import { css } from 'emotion'

import { FormControl, MenuItem, Paper, Select } from '@material-ui/core'

import { Theme, withStyles } from '@material-ui/core/styles'
import { StyleRulesCallback, ClassNameMap } from '@material-ui/core/styles/withStyles'

import BoardHead from './BoardHead'
import TopicList from './TopicList'

import { IBoard, ITag } from '@cc98/api'

import { getBoard } from '@/services/board'
import { getBoardTags, getTagNameById } from '@/services/tag'

interface Tag {
  name: string
  id: number
}
interface Props {
  id: string
  classes: ClassNameMap
}
interface Tags {
  tag1: Tag
  tag2: Tag
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
    minWidth: 0,
  },
})

const boardStyle = css`
  && {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
`

export default withStyles(styles)((props: Props) => {
  const { classes, id } = props

  const [board, setBoard] = useState<IBoard | null>(null)
  const [tags, setTags] = useState<ITag[]>([])
  const [tag1, setTag1] = useState<Tag>({ id: -1, name: '全部' })
  const [tag2, setTag2] = useState<Tag>({ id: -1, name: '全部' })

  useEffect(() => {
    ; (async () => {
      const boardsInfo = await getBoard(id)
      const tagsInfo = await getBoardTags(id)

      boardsInfo.fail().succeed(setBoard)
      tagsInfo.fail().succeed(setTags)
    })()
  }, [])

  const handleChange = (index: keyof Tags) => async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const tagId = parseInt(event.target.value, 10)
    const name = await getTagNameById(tagId)
    if (index === 'tag1') {
      setTag1({ name, id: tagId })
    } else {
      setTag2({ name, id: tagId })
    }
  }

  return (
    <Paper className={boardStyle}>
      {board && <BoardHead data={board} />}
      <>
        {tags.length > 0 ? (
          <FormControl className={classes.formControl} classes={{ root: classes.selectRoot }}>
            <Select
              value={tag1.id}
              onChange={handleChange('tag1')}
              inputProps={{
                name: 'age',
                id: 'age-native-simple',
              }}
            >
              <MenuItem key={0} value={-1}>
                全部
              </MenuItem>
              {tags[0].tags.map(tag => (
                <MenuItem key={tag.id} value={tag.id}>
                  {tag.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : null}
        {tags.length > 1 ? (
          <FormControl className={classes.formControl} classes={{ root: classes.selectRoot }}>
            <Select
              autoWidth
              value={tag2.id}
              onChange={handleChange('tag2')}
              inputProps={{
                name: 'age',
                id: 'age-native-simple',
              }}
            >
              <MenuItem key={0} value={-1}>
                全部
              </MenuItem>
              {tags[1].tags.map(tag => (
                <MenuItem key={tag.id} value={tag.id}>
                  {tag.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : null}
      </>

      <TopicList key={`${tag1.id}-${tag2.id}`} id={id} tags={[tag1, tag2]} />
    </Paper>
  )
})
