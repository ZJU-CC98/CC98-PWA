import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import TopBar from './containers/TopBar'

import Hot from './pages/Hot'
import Topic from './pages/Topic'
import LogIn from './pages/LogIn'

const App = (props) => (
  <BrowserRouter>
    <div>
      <TopBar />
      <Switch>
        <Route path="/" exact component={Hot} />
        <Route path="/topic/:topicID" component={Topic} />
        <Route path="/login" component={LogIn} />
      </Switch>
    </div>
  </BrowserRouter>
)

export default App

