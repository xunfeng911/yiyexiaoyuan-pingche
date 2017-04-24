import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Home from '../components/home/home.jsx';
import User from '../components/user/user.jsx';


const RouteConfig = () => (
  <Router>
    <Switch>
      <Route path='/' exact component={Home}/>
      <Route path='/user' exact component={User}></Route>
    </Switch>
  </Router>
)

export default RouteConfig
