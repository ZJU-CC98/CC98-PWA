import React, { useState } from 'react'

import FixFab from '@/components/FixFab'

import RotateRightIcon from '@material-ui/icons/RotateRight'
import SwapVertIcon from '@material-ui/icons/SwapVert'
import EditIcon from '@material-ui/icons/Edit'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'

import { navigate } from '@/utils/history'
import { ITopic } from '@cc98/api'

interface Props {
  /**
   * 帖子信息
   */
  topicInfo: ITopic
  /**
   * 是否逆序
   */
  isReverse?: boolean
  /**
   * 刷新帖子的回调
   */
  refreshFunc: () => void
}

export default ({ topicInfo, isReverse, refreshFunc }: Props) => {
  // 控制按钮是否展开
  const [expand, setExpand] = useState(false)

  return (
    <>
      {expand && (
        <>
          <FixFab order={4}>
            <RotateRightIcon onClick={refreshFunc} />
          </FixFab>
          <FixFab order={3}>
            <SwapVertIcon
              onClick={() =>
                isReverse
                  ? navigate(`/topic/${topicInfo.id}`)
                  : navigate(`/topic/${topicInfo.id}/reverse`)
              }
            />
          </FixFab>
          <FixFab order={2}>
            <EditIcon onClick={() => navigate(`/editor/replyTopic/${topicInfo.id}`)} />
          </FixFab>
        </>
      )}
      <FixFab>
        {expand ? (
          <RemoveIcon onTouchStart={() => setExpand(false)} />
        ) : (
          <AddIcon onTouchStart={() => setExpand(true)} />
        )}
      </FixFab>
    </>
  )
}
