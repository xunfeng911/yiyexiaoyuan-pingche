import React, { Component } from 'react';
// import classNames from 'classnames';
import './user.scss';

import Header from '../common/header/header';
import template from '../index';
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
       <Header history={this.props.history} back={false} user={true} title={'个人主页'}></Header>
     )
  }
}

export default template(User);