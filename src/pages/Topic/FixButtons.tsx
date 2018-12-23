import React, { useState } from 'react'

import FixFab from '@/components/FixFab'

import RotateRightIcon from '@material-ui/icons/RotateRight'
import SwapVertIcon from '@material-ui/icons/SwapVert'
import EditIcon from '@material-ui/icons/Edit'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'

import { navigate } from '@/utils/history'
import { ITopic } from '@cc98/api'
import { putFavorite, deleteFavorite } from '@/services/post'
import { getTopicFavorite } from '../../services/topic'
import useFetcher from '@/hooks/useFetcher'
import { favoriteHandler } from '../../services/utils/errorHandler'
import snackbar from '@/utils/snackbar'

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
  const [isFavorite, setIsFavorite] = useFetcher(() => getTopicFavorite(topicInfo.id))

  const toggleFavorite = async () => {
    if (isFavorite) {
      const res = await deleteFavorite(topicInfo.id)
      res.fail(favoriteHandler).succeed(() => {
        snackbar.success('取消关注')
        setIsFavorite(false)
      })
    } else {
      const res = await putFavorite(topicInfo.id)
      res.fail(favoriteHandler).succeed(() => {
        snackbar.success('关注成功')
        setIsFavorite(true)
      })
    }
  }

  return (
    <>
      {expand && (
        <>
          <FixFab bottom={215}>
            {isFavorite ? (
              <FavoriteIcon
                onClick={() => {
                  toggleFavorite()
                  setExpand(false)
                }}
              />
            ) : (
              <FavoriteBorderIcon
                onClick={() => {
                  toggleFavorite()
                  setExpand(false)
                }}
              />
            )}
          </FixFab>
          <FixFab bottom={165}>
            <RotateRightIcon onClick={refreshFunc} />
          </FixFab>
          <FixFab bottom={115}>
            <SwapVertIcon
              onClick={() =>
                isReverse
                  ? navigate(`/topic/${topicInfo.id}`)
                  : navigate(`/topic/${topicInfo.id}/reverse`)
              }
            />
          </FixFab>
          <FixFab bottom={65}>
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
