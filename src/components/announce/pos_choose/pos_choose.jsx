import React, { Component } from 'react';


import template from '../../index';
import Header from '../../common/header/header';

import './pos_choose.scss';

class PosChoose extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pos: ''
    }
  }

  static defaultProps = {
    postType: '',
    PosChoose: () => {}
  }

  render() {
    return (
      <div></div>
    )
  }
}

export default template(PosChoose);