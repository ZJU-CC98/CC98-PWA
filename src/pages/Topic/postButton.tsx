import React from 'react'

import { Tooltip, Button } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { navigate } from '@/utils/history'
import { css } from 'emotion'
interface Props {
  topicId: number
}

const fixStyle = css`
  && {
    position: fixed;
    bottom: 15px;
    right: 15px;
  }
`

const PostHead: React.FunctionComponent<Props> = ({ topicId }) => (
  <Tooltip title="post">
    <Button
      variant="fab"
      mini
      className={fixStyle}
      color="primary"
      onClick={() => {
        navigate(`/compose/${topicId}/reply`)
      }}
    >
      <AddIcon />
    </Button>
  </Tooltip>
)
export default PostHead
