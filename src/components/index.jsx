import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from '../components/home/home';
import User from '../components/user/user';
class Roots extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/' exact component={Home}/>
                    <Route path='/user' exact component={User}></Route>
                </Switch>
            </Router>
        );
    }
}

export default Roots;