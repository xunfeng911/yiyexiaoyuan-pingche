import React, { Component } from 'react';
import { message } from 'antd';

import template from '../index';
import Header from '../common/header/header';

import * as axios from '../../public/js/axios.js';
import './user.scss';

class SetQQ extends Component {
  constructor(props) {
    super(props)
    this.state = {
      usrQQ: this.props.getUserInfo.usrQQ
    }
  }

  qqChange = e => { this.setState({ usrQQ: e.target.value }) };
  
  sendQQ = () => {
    const usrQQ = this.state.usrQQ;
    const testQQ = /[1-9]([0-9]{5,12})/;
    if (testQQ.test(usrQQ)) {
      const req = {
        url: '',
        data: {
          usrQQ: usrQQ
        },
        token: this.props.getUsrLogin.token
      }
      axios._post(req)
      .then(res => {
        window.console.log(res)
      })
    } else {
      message.error('QQ号为6-13位数字');
    }
  }

  render() {
    return (
      <div>
        <Header history={this.props.history} back={false} user={true} title={'设置QQ'}></Header>
        <div className="index-cont">
          <div className="set">
            <input type="text" value={this.state.usrQQ} onChange={this.qqChange} className="set-input" placeholder="请填入真实QQ号提高拼车效率" required />
            <button className="set-btn btn" onClick={this.sendQQ}>修改</button>
          </div>
        </div>
      </div>
    )
  }
}

export default template(SetQQ);