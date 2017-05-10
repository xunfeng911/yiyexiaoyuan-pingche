import React, { Component } from 'react';
import { message } from 'antd';

import template from '../index';
import Header from '../common/header/header';

import * as axios from '../../public/js/axios.js';
import './user.scss';

class SetName extends Component {
  constructor(props) {
    super(props)
    this.state = {
      usrName: this.props.getUserInfo.usrName
    }
  }

  nameChange = e => { this.setState({ usrName: e.target.value }) };
  
  sendName = () => {
    const usrName = this.state.usrName;
    const testName = /[A-Za-z0-9_\-\u4e00-\u9fa5]+/;
    if (testName.test(usrName)) {
      const req = {
        url: '',
        data: {
          usrName: usrName
        },
        token: this.props.getUsrLogin.token
      }
      axios._post(req)
      .then(res => {
        window.console.log(res)
      })
    } else {
      message.error('用户名不合法！');
    }
  }

  render() {
    return (
      <div>
        <Header history={this.props.history} back={false} user={true} title={'修改用户名'}></Header>
        <div className="index-cont">
          <div className="set">
            <input type="text" value={this.state.usrName} onChange={this.nameChange} className="set-input" placeholder="请填入新昵称" maxlength="12" required />
            <div className="set-tip">
              <p>以英文字母或汉字组成，不可大于12个字符</p>
              <p className="red">用户名仅可修改一次</p>
            </div>
            <button className="set-btn btn" onClick={this.sendName}>修改</button>
          </div>
        </div>
      </div>
    )
  }
}

export default template(SetName);