import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import Route from './router/index.jsx'
import {Provider} from 'react-redux';
import store from './redux/store/store';

import 'normalize.css';
import 'animate.css';
import './public/css/common.scss';


const app = document.getElementById('app');


store.subscribe(() => { //监听state变化
  // window.console.log(store.getState())
});
//
// Render the main component into the dom
//
//
// ReactDOM.render(<Route />, app);
ReactDOM.render(
  <Provider store={store}>
    <Route />
  </Provider>
  , app)
