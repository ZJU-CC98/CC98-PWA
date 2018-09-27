import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import HotTopic from './pages/HotTopic'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={HotTopic} />
    </Switch>
  </BrowserRouter>
)

export default App

