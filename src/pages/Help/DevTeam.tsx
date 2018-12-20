import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import LoadingCircle from '@/components/LoadingCircle'

import { navigate } from '@/utils/history'

import { Avatar, CardHeader, Divider, Typography } from '@material-ui/core'

import { getUsersInfoByIds } from '@/services/user'
import { IUser } from '@cc98/api'

const Title = styled(Typography).attrs({
  align: 'center',
  variant: 'h6',
})`
  && {
    margin-top: 16px;
    margin-bottom: 16px;
  }
`

const CardHeaderS = styled(CardHeader)`
  && {
    width: 48%;
  }
`
interface Props {
  userInfo: IUser
}
const DevCard: React.FC<Props> = ({ userInfo }) => (
  <CardHeaderS
    avatar={<Avatar src={userInfo.portraitUrl} />}
    title={userInfo.name}
    subheader={userInfo.introduction}
    onClick={() => navigate(`/user/${userInfo.id}`)}
  />
)

const CardFlexDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
`

export default () => {
  const ids = [530817, 556551, 569380, 405730, 559244, 558467]
  const descriptions = [
    '项目背锅人',
    '苦力',
    '高级 Webpack 配置工程师',
    '后端开发',
    '低级前端开发',
    '前端开发',
  ]

  const [usersInfo, setUsersInfo] = useState<IUser[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    const res = getUsersInfoByIds(ids)
    res.then(r =>
      r.fail().succeed(data => {
        if (data.length === ids.length) {
          const orderedData: IUser[] = []
          for (const i in ids) {
            orderedData[i] = data.filter(u => u.id === ids[i])[0]
            orderedData[i].introduction = descriptions[i]
          }
          setUsersInfo(orderedData)
          setIsLoading(false)
        }
      })
    )
  }, [])

  return (
    <>
      <Title>开发组</Title>
      <Divider />
      {isLoading && <LoadingCircle />}

      <CardFlexDiv>
        {usersInfo.map(userInfo => (
          <DevCard key={userInfo.id} userInfo={userInfo} />
        ))}
      </CardFlexDiv>
    </>
  )
}
