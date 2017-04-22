import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import Route from './router/index.jsx'
// import App from './components/Main';

import 'normalize.css';
import 'animate.css';

const app = document.getElementById('app');


// 监听state变化
// store.subscribe(() => {
// });
//
// Render the main component into the dom
//
//
ReactDOM.render(<Route />, app);
