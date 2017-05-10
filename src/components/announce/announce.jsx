import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import {message} from 'antd';

import template from '../index';
import Header from '../common/header/header';
import HomeDatePicker from '../common/date_picker/date_picker';

import './announce.scss';

class Announce extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  render() {
    return (
      <div>
        <Header history={this.props.history} back={false} user={true} title={'一页校园'}></Header>
        <div className="index-cont">
          <div className="anc">
            
          </div>
        </div>
      </div>
    )
  }
}

export default template(Announce);