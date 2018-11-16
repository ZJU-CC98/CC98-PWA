import React from 'react'

import { Tooltip, Button } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { navigate } from '@reach/router'
import { css } from 'emotion'
interface Props {
  topicId: number
}

const fixStyle = css`
  position: fixed !important;
  bottom: 100px !important;
  right: 15px !important;
`
const PostHead: React.FunctionComponent<Props> = ({ topicId }) => (
  <Tooltip title="post">
    <Button
      variant="fab"
      className={fixStyle}
      color="primary"
      aria-label="Add"
      onClick={() => {
        navigate(`/compose/${topicId}/reply`)
      }}
    >
      <AddIcon />
    </Button>
  </Tooltip>
)
export default PostHead
