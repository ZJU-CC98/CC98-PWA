import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import HotTopic from './pages/HotTopic'
import Topic from './pages/Topic'

import Page404 from './pages/Error/404'
import Page401 from './pages/Error/401'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={HotTopic} />
      <Route path="/topic/:topicID" component={Topic} />


      <Route path="/404" exact component={Page404} />
      <Route path="/401" exact component={Page401} />
    </Switch>
  </BrowserRouter>
)

export default App

