import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import classNames from 'classnames';
import { message } from 'antd';
import template from '../index';
import {createCode, createColor} from '../../public/js/common.js';
import './login.scss';

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      usrTel: '',
      usrPass: '',
      authCode: '',
      trueCode: '',
      codeColor: {
        color: createColor(),
        background: createColor()
      }
    }
  }
  componentWillMount () {
    let action = {
      back: false,
      title: '用户登录',
      user: true
    }
    this.props.setBack(action);
    this.setState({trueCode: createCode()})
  }
  // 表单绑定
  telChange = (e) => {this.setState({usrTel: e.target.value})}
  passChange = (e) => {this.setState({usrPass: e.target.value})}
  codeChange = (e) => {this.setState({authCode: e.target.value})}
  // 换验证码
  setCode = () => {
    this.setState({
      trueCode: createCode(),
      codeColor: {
        color: createColor(),
        background: createColor()
      }
    })
  }
  // 登陆
  getLogin = () => {
    let testTel = /0?(13|14|15|18|17)[0-9]{9}/;
    let {authCode, trueCode, usrTel, usrPass} = this.state;
    // window.console.log(testTel.test(usrTel))
    authCode = authCode.toUpperCase();
    trueCode = trueCode.toUpperCase();
    // window.console.log(`${authCode},,,,${trueCode}`)
    if (authCode === trueCode) {
      if (testTel.test(usrTel) && usrPass !== '') {
        message.success('test success');
        setTimeout( () => {
          this.props.history.push('/')
        }, 1000);
      } else {
        message.error('请完善登录信息！');
      }
    } else {
      message.error('验证码错误！');
    }
  }
  render () {
    return (
      <div className="index-cont">
        <div className="login">
          <div className="login-usr">
            <input type="text" value={this.state.usrTel} onChange={this.telChange} placeholder="请输入您的手机号" required/>
            <input type="password" value={this.state.usrPass} onChange={this.passChange} placeholder="请输入您的密码" required/>
          </div>
          <div className="login-auth">
            <input type="text" value={this.state.authCode} onChange={this.codeChange} placeholder="验证码" required/>
            <span className="login-auth-true" style={this.state.codeColor} onClick={this.setCode} >{this.state.trueCode}</span>
          </div>
          <div className="login-btn">
            <div className="login-btn-info">
              <Link to="/user">重置密码</Link>
              <Link to="/user">注册账号</Link>
            </div>
            <button className="login-btn-in btn" onClick={this.getLogin}>登录</button>
          </div>
        </div>
      </div>
    )
  }
}

export default template(Login);