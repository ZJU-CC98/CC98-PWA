import { useState, useEffect } from 'react'

import { IUser } from '@cc98/api'
import { getUserInfoById } from '@/services/user'

import avatar from '@/assets/9.png'

const defaultUser: IUser = {
  name: '',
  gender: 1,
  birthday: '',
  photourl: '',
  introduction: '',
  signatureCode: '',
  id: -1,
  isFollowing: false,
  emailAddress: '',
  qq: '',
  postCount: 0,
  prestige: 0,
  displayTitle: '',
  privilege: '',
  registerTime: '',
  lastLogOnTime: '',
  customTitle: '',
  lockState: 0,
  popularity: 0,
  userTitleIds: [],
  displayTitleId: 0,
  fanCount: 0,
  wealth: 0,
  portraitUrl: avatar,
  customBoards: [],
  followCount: 0,
  theme: 0,
  levelTitle: '',
  boardMasterTitles: [],
  deleteCount: 0,
}

export default function useUserId(id: number): IUser {
  const [user, setUser] = useState(defaultUser)
  useEffect(
    () => {
      getUserInfoById(id).then(res => {
        res.fail().succeed(it => setUser(it))
      })
    },
    [id]
  )

  return user
}
