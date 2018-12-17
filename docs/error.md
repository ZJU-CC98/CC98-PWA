# 记录页面的报错处理情况

## 看帖页面（/topic）
对index发出的第一个请求，即请求topicinfo进行处理

**navigate**
* 401 -用户未登录、用户权限不够、用户使用代理查看某些帖子
* 403 -
* 404 -用户输错路由
* 50* -服务器内部错误

评分操作进行处理（通过message）

**notification**
* 'cannot_rate_yourself' - '您不能给自己评分' 
* 'has_rated_tody' -'您今天已经评过分了，请明天再来'
* 'you_cannot_rate' -'您发帖还不足500，不能评分' 
* 'has_rated_this_post' -'您已经给这个贴评过分了' 
* 'post_user_not_exists' -'这个回复的账号已经不存在了'

回帖处理

TODO

编辑处理

TODO

## 版面页面（/board）

**navigate**

对index发出的第一个请求，即请求boardInfo进行处理
* 401 -用户未登录、用户权限不够、用户使用代理查看某些帖子
* 403 -
* 404 -用户输错路由
* 50* -服务器内部错误

## 版面列表 （/boardList）

**navigate**

* 50* -服务器内部错误

## 主页 （/）

**notification**

* 50* -服务器内部错误

## 热门（/hottopic）
**notification**

* 50* -服务器内部错误

## 登陆 （/login）

**notification**

* 401 -用户名密码错误
* 50* -服务器内部错误

## 关注 （/myfollow）新帖 （/newTopics）搜索（/search）
对获取关注信息的api进行处理

**navigate**

* 401 -用户未登录
* 50* -服务器内部错误
