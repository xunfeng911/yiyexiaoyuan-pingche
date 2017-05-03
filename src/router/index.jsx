import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from '../components/home/home';
import User from '../components/user/user';
import Index from '../components/index';

const RouteConfig = () => (
  <Router>
    <Switch>
    //  <Route path='/' exact component={Index}></Route>
      <Route path='/' exact component={Home}/>
      <Route path='/user' exact component={User}/>
    </Switch>
  </Router>
)

export default RouteConfig
