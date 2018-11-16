import React, { useState, useEffect } from 'react'

import PostItem from './PostItem'
import InfiniteList from '@/components/InfiniteList'

import { List } from '@material-ui/core'
import { getTracePost, getHotPost, getPost, getAnonymousTracePost } from '@/services/topic'
import { getUsersInfo } from '@/services/user'
import { IPost, IAward, ITopic, IUser } from '@cc98/api'
import { TempAward } from './index'
import { navigate } from '@reach/router'

interface Props {
  topicInfo: ITopic
  isTrace: boolean
  identifyId: string | null
  tempAward: TempAward | null
  handleClickOpen: (info: IPost) => void
  handleDialogClose: () => void
  setQuote: (content: string) => void
}
interface State {
  from: number
  isLoading: boolean
  isEnd: boolean
}
interface UserMap {
  [id: string]: IUser
}

export default (props: Props) => {
  const {
    topicInfo,
    isTrace,
    identifyId,
    tempAward,
    handleClickOpen,
    handleDialogClose,
    setQuote,
  } = props
  const { id } = topicInfo
  const [state, setState] = useState<State>({
    isLoading: false,
    isEnd: false,
    from: 0,
  })
  const [posts, setPosts] = useState<IPost[]>([])
  const { isLoading, isEnd, from } = state

  // did mount
  useEffect(() => {
    ;(() => fetchPosts())()
  }, [])

  useEffect(
    () => {
      if (tempAward) {
        setPosts(prevPosts => {
          prevPosts.forEach(post => {
            if (post.id === tempAward.id) {
              post.awards.push({
                id: 0,
                content: tempAward.content,
                reason: tempAward.reason,
                operatorName: tempAward.operatorName || '',
                time: new Date(),
                type: 1,
              })
            }
          })

          return prevPosts
        })
      }
    },
    [tempAward]
  )

  const fetchPosts = async () => {
    const isFirstGlance = from === 0
    setState({ ...state, isLoading: true })
    const postTry =
      isTrace && identifyId
        ? topicInfo.isAnonymous
          ? await getAnonymousTracePost(id, parseInt(identifyId, 10), from)
          : await getTracePost(id, parseInt(identifyId, 10), from)
        : await getPost(id, from)

    postTry
      .fail(() => navigate('/error/403'))
      .succeed(async (postList: IPost[]) => {
        await fetchUsers(postList)
        postList.map(post => (post.isHot = false))
        let newPostList = postList
        // 第一页 且 不是追踪模式
        if (isFirstGlance && !isTrace) {
          newPostList = []
          const hotPostTry = await getHotPost(id)
          hotPostTry.fail().succeed(async hotPostList => {
            hotPostList.map(post => (post.isHot = true))
            newPostList.push(postList[0])
            newPostList = newPostList.concat(hotPostList)
            newPostList = newPostList.concat(postList.slice(1, postList.length))
          })
        }
        let allAwards: IAward[] = []
        newPostList.forEach(postItem => {
          allAwards = allAwards.concat(postItem.awards)
        })

        setPosts(prevPosts => prevPosts.concat(newPostList))
        setState({
          from: from + postList.length,
          isEnd: postList.length !== 10,
          isLoading: false,
        })
      })
  }

  // 获取用户信息 建立映射
  const [userMap, setUserMap] = useState<UserMap>({})

  const fetchUsers = async (postList: IPost[]) => {
    const query = postList
      .map(p => p.userId)
      .filter(u => u)
      .map(u => `id=${u}`)
      .join('&')

    if (!query) return

    const res = await getUsersInfo(query)

    res.fail().succeed(users => {
      const newUsers: UserMap = {}
      users.forEach(user => {
        newUsers[user.id] = user
      })

      setUserMap(prevUserMap => ({ ...prevUserMap, ...newUsers }))
    })
  }

  // 更新单个楼层（点赞、踩后的数据）
  const updatePosts = <T extends Partial<IPost>>(postId: number, postUpdate: T) => {
    setPosts(prevPosts => {
      const newPosts = prevPosts.map(e => {
        if (e.id === postId) {
          // tslint:disable-next-line:prefer-object-spread
          return Object.assign({}, e, postUpdate)
        }

        return e
      })

      return newPosts
    })
  }

  return (
    <InfiniteList isLoading={isLoading} isEnd={isEnd} callback={() => fetchPosts()}>
      <List>
        {posts.map((info: IPost) => (
          <PostItem
            key={info.isHot ? `hot-${info.id}` : info.id}
            postInfo={info}
            userInfo={userMap[info.userId]}
            isTrace={isTrace}
            openDialog={handleClickOpen}
            closeDialog={handleDialogClose}
            setQuote={setQuote}
            setPosts={updatePosts}
          />
        ))}
      </List>
    </InfiniteList>
  )
}
