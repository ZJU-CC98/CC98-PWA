/**
 * 直接从 react-router-v4 中暴露 history 对象
 */


import createBrowserHistory from 'history/createBrowserHistory'

const history = createBrowserHistory()

export default history
