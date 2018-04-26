import { BoardMasterTitle } from './BoardMaterTitle'

/**
* 用户信息
*/
export interface UserInfo {
    /**
    * 用户名
    */
    name: string
    /**
    * 用户性别
    */
    gender: 0 | 1
    /**
    * 用户生日
    */
    birthday: string
    /**
    * 用户个人简介图片
    */
    photourl: string
    /**
    * 用户个人简介
    */
    introduction: string
    /**
    * 用户个性签名
    */
    signatureCode: string
    /**
    * id
    */
    id: number
    /**
    * 当前用户是否关注了该用户
    */
    isFollowing: boolean
    /**
    * 邮箱地址
    */
    emailAddress: string
    /**
    * qq
    */
    qq: string
    /**
    * 发帖数
    */
    postCount: number
    /**
    * 威望
    */
    prestige: number
    /**
    * 显示的用户组
    */
    displayTitle: string
    /**
    * 全站权限等级
    */
    privilege: string
    /**
    * 注册时间
    */
    registerTime: string
    /**
    * 最后登录时间
    */
    lastLogOnTime: string
    /**
    * 自定义头衔
    */
    customTitle: string
    /**
     * 用户锁定状态，0正常  1锁定  2屏蔽  3全站TP
     */
    lockState: 0 | 1 | 2 | 3
    /**
     * 风评
     */
    popularity: number
    /**
     * 用户拥有的头衔ID们
     */
    userTitleIds: number[]
    /**
     * 当前显示的头衔ID
     */
    displayTitleId: number
    /**
     * 粉丝数
     */
    fanCount: number
    /**
     * 财富值
     */
    wealth: number
    /**
     * 用户头像地址
     */
    portraitUrl: string
    /**
     * 用户关注的版面id数组
     */
    customBoards: number[]
    /**
     * 用户关注数
     */
    followCount: number
    /**
     * 用户选择的主题
     */
    theme: number
    /**
     * 等级（已经废弃
     */
    levelTitle: string
    /**
     * 用户版主头衔信息
     */
    boardMasterTitles: BoardMasterTitle[]
    /**
     * 被删除的数量
     */
    deleteCount: number
}

