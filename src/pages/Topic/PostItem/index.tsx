import React, { useState } from 'react'

import { css, cx } from 'emotion'

import UBB from '@cc98/ubb-react'

import {
  Button,
  Card,
  CardActions,
  CardContent,
  Collapse,
  IconButton,
  Typography,
} from '@material-ui/core'

import { StyleRules, withStyles } from '@material-ui/core/styles'
import { ClassNameMap } from '@material-ui/core/styles/withStyles'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import Header from './Header'
import Award from './Award'
import Actions from './Actions'

import resolveMarkdown from './resolveMarkdown'
import { IPost, IUser } from '@cc98/api'

const root = css`
  margin-top: 6px;
  background-color: #ccc;
  border-bottom: #eaeaea solid thick;
`

const expand = css`
  transform: rotate(0deg);
  transition-property: transform;
  /* transition-duration:  */
`

const expandOpen = css`
  transform: rotate(180deg);
`

interface Props {
  /**
   * 帖子信息
   */
  postInfo: IPost
  /**
   * 用户信息
   */
  userInfo: IUser | null
  /**
   * 是否是追踪模式
   */
  isTrace: boolean
  classes: ClassNameMap
  /**
   * 方法
   */
  openDialog: (info: IPost) => void
  closeDialog: () => void
  setQuote: (content: string) => void
  setPosts: <T extends Partial<IPost>>(postId: number, postUpdate: T) => void
}

const styles: StyleRules = {
  actionsRoot: {
    display: 'flex',
    width: '100%',
    height: '2rem',
  },
  action: {
    width: '4rem',
  },
  hr: {
    border: '#555 solid thin',
    height: '1rem',
  },
  headerAction: {
    display: 'flex',
    flexDirection: 'column',
  },
  iconRoot: {
    padding: '5px',
    marginLeft: 'auto',
  },
  menuItemRoot: {
    width: '3rem',
  },
  typographyRoot: {
    wordBreak: 'break-all',
  },
  floor: {
    width: '30px',
    height: '30px',
    fontSize: '0.8rem',
    backgroundColor: '#79b8ca',
  },
  hotFloor: {
    width: '30px',
    height: '30px',
    fontSize: '0.8rem',
    backgroundColor: 'red',
  },
  awardAvatar: {
    width: '25px',
    height: '25px',
  },
  awardAction: {
    height: '30px',
    fontSize: '0.8rem',
    opacity: 0.54,
    borderTop: '#aaaaaa solid thin',
    marginLeft: '16px',
    marginRight: '16px',
  },
  expandButton: {
    width: '80%',
    height: '30px',
  },
  tableRoot: {
    width: '100%',
  },
}

const contentRoot = css`
  && {
    img {
      max-width: 100%;
    }
  }
`

export default withStyles(styles)((props: Props) => {
  const [expanded, setExpanded] = useState(false)
  const onExpandClick = () => setExpanded(prevExpanded => !prevExpanded)
  const { postInfo, classes, isTrace, userInfo, openDialog, setQuote, setPosts } = props
  if (postInfo.isDeleted) {
    return null
  }

  const text =
    postInfo.contentType === 0 ? UBB(postInfo.content) : resolveMarkdown(postInfo.content)

  return (
    <Card
      square
      elevation={0}
      className={root}
      id={postInfo.isHot ? `hot-${postInfo.floor.toString()}` : postInfo.floor.toString()}
      data-uk-scrollspy="{cls:'uk-animation-fade', delay:900}"
    >
      <Header postInfo={postInfo} userInfo={userInfo} classes={classes} />

      <CardContent>
        <Typography
          classes={{ root: classes.typographyRoot }}
          className={contentRoot}
          component="div"
        >
          {text}
        </Typography>
      </CardContent>

      <Actions
        postInfo={postInfo}
        setPosts={setPosts}
        setQuote={setQuote}
        openDialog={openDialog}
        isTrace={isTrace}
        classes={classes}
      />

      {postInfo.awards.length > 5 && (
        <CardActions classes={{ root: classes.awardAction }}>
          <Button classes={{ root: classes.expandButton }} onClick={onExpandClick}>
            （{postInfo.awards.length}
            个评分）
          </Button>
          <IconButton
            className={cx(expand, {
              [expandOpen]: expanded,
            })}
            style={{ width: '20%' }}
            onClick={() => setExpanded(!expanded)}
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
      )}
      {postInfo.awards.length > 0 && postInfo.awards.length <= 5 && <Award postInfo={postInfo} />}
      {postInfo.awards.length > 5 && (
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Award postInfo={postInfo} />
        </Collapse>
      )}
    </Card>
  )
})
