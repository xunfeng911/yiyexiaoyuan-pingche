import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from '../components/home/home';
import User from '../components/user/user';
import Login from '../components/login/login';
import Header from '../components/common/header/header';
const RouteConfig = () => (
    <div>
      <Header></Header>
      <Router>
        <Switch>
          <Route path='/' exact component={Home}/>
          <Route path='/user' exact component={User}/>
          <Route path='/login' exact component={Login}></Route>
        </Switch>
      </Router>
    </div>
)

export default RouteConfig;
