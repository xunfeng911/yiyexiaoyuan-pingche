import React, { Component } from 'react';
// import classNames from 'classnames';
import './user.scss';

import Header from '../common/header/header'

class User extends Component {
  static defaultProps = {
  }
  constructor (props) {
    super(props)
    this.state = {

    }
  }
  
  render () {
     return (
       <Header isBack={false} isUser={true}></Header>
     )
  }
}

export default User;