import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from '../components/home/home';
import User from '../components/user/user';
import UsrInfo from '../components/user/usr_info';
import SetQQ from '../components/user/set_qq';
import SetName from '../components/user/set_name';
import Login from '../components/login/login';
import Register from '../components/register/register';
import Reset from '../components/register/reset';
import NewPass from '../components/register/newpassword';

const RouteConfig = () => (
  <Router>
    <Switch>
      <Route path='/' exact component={Home} />
      <Route path='/user' exact component={User} />
      <Route path='/login' exact component={Login} />
      <Route path='/register' exact component={Register} />
      <Route path='/reset' exact component={Reset} />
      <Route path='/newpass' exact component={NewPass} />
      <Route path='/usrInfo' exact component={UsrInfo} />
      <Route path='/setqq' exact component={SetQQ} />
      <Route path='/setname' exact component={SetName} />
    </Switch>
  </Router>
)

export default RouteConfig;
