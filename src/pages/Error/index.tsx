import React from 'react'
import { Router } from '@reach/router'
import { Route } from '@/router/Router'

import Page400 from './400'
import Page401 from './401'
import Page403 from './403'
import Page404 from './404'
import Page500 from './500'

export default () => (
  <Router>
    <Route path="400" component={Page400} />
    <Route path="401" component={Page401} />
    <Route path="403" component={Page403} />
    <Route path="404" component={Page404} />
    <Route path="500" component={Page500} />
    <Route default component={Page404} />
  </Router>
)
