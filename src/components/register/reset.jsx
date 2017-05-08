import React, { Component } from 'react';
import { message } from 'antd';
import classNames from 'classnames';

import template from '../index';
import Header from '../common/header/header';

import * as axios from '../../public/js/axios.js';
import {createCode, createColor} from '../../public/js/common.js';
import './register.scss';

class Reset extends Component {
  constructor(props) {
    super(props)
    this.state = {
      usrTel: '',
      authCode: '',
      trueCode: '',
      phoneCode: '',
      codeColor: {
        color: createColor(),
        background: createColor()
      },
      btnText: '获取手机验证码',
      isLoading: false
    }
  }
  componentWillMount () {
    this.setState({trueCode: createCode()})
  }
  // 表单绑定
  telChange = (e) => {this.setState({usrTel: e.target.value})}
  phoneChange = (e) => {this.setState({phoneCode: e.target.value})}
  authChange = (e) => {this.setState({authCode: e.target.value})}

  setCode = () => {
    this.setState({
      trueCode: createCode(),
      codeColor: {
        color: createColor(),
        background: createColor()
      }
    })
  }
  sendCode = () => {
    let testTel = /0?(13|14|15|18|17)[0-9]{9}/;
    let {authCode, trueCode, usrTel} = this.state;
    authCode = authCode.toUpperCase();
    trueCode = trueCode.toUpperCase();
    if (authCode === trueCode) {
      if (testTel.test(usrTel)) {

        // 倒计时
        this.setState({isLoading: true});
        this.btnCode.disabled = true;
        let timer = null;
        this.setState({btnText: 60})
        timer = setInterval( () => {
          let btnText = this.state.btnText;
          btnText -= 1
          if (this.state.btnText > 0) {
            this.setState({btnText: btnText });
          } else {
            clearInterval(timer);
            this.btnCode.disabled = false;
            window.console.log(this.btnCode)
            this.setState({btnText: '重新获取验证码', isLoading: false});
          }
        }, 1000);

        // const req = {
        //   url: '',
        //   data: {
        //     usrTel: this.state.usrTel
        //   }
        // }
        // axios._post(req)
        // .then( res => {
        //   switch (res.data.code) {
        //     case 1:
        //       // 倒计时
        //       this.setState({isLoading: true});
        //       this.btnCode.disabled = true;
        //       let timer = null;
        //       this.setState({btnText: 60})
        //       timer = setInterval( () => {
        //         let btnText = this.state.btnText;
        //         btnText -= 1
        //         if (this.state.btnText > 0) {
        //           this.setState({btnText: btnText });
        //         } else {
        //           clearInterval(timer);
        //           this.btnCode.disabled = false;
        //           window.console.log(this.btnCode)
        //           this.setState({btnText: '重新获取验证码', isLoading: false});
        //         }
        //       }, 1000);
        //       break;
          
        //     default:
        //       break;
        //   }
        // })
      } else {
        message.error('请输入正确的手机号！');
      }
    } else {
      message.error('验证码错误！');
    }
  }
  getRegister = () => {
    let testTel = /0?(13|14|15|18|17)[0-9]{9}/;
    let {authCode, trueCode, usrTel} = this.state;
    authCode = authCode.toUpperCase();
    trueCode = trueCode.toUpperCase();
    if (authCode === trueCode) {
      if (testTel.test(usrTel)) {
        const req = {
          url: '',
          data: {
            usrTel: this.state.usrTel,
            phoneCode: this.state.phoneCode
          }
        }
        axios._post(req)
        .then( res => {
          this.props.history.push('/');
          window.console.log(res)
        })

      } else {
        message.error('请输入正确的手机号！');
      }
    } else {
      message.error('验证码错误！');
    }
  }
  render () {
    const btnClass = classNames({
      'btn': true,
      'reg-li-span': true,
      'disable': this.state.isLoading
    })
    return (
      <div>
        <Header history={this.props.history} back={false} user={true} title={'重置密码'}></Header>
        <div className="index-cont">
          <div className="reg">
            <div className="reg-li">
              <input className="reg-li-tel" type="text" value={this.state.usrTel} onChange={this.telChange} placeholder={'请输入手机号'} required/>
            </div>
            <div className="reg-li">
              <input type="text" className="reg-li-code" value={this.state.authCode} onChange={this.authChange} placeholder={'文字验证码'} required/>
              <span className="reg-li-span code" style={this.state.codeColor} onClick={this.setCode} >{this.state.trueCode}</span>
            </div>
            <div className="reg-li">
             <input type="text" className="reg-li-code" value={this.state.phoneCode} onChange={this.phoneChange} placeholder={'手机验证码'} required/>
             <button ref={(btnCode) => this.btnCode = btnCode} className={btnClass} onClick={this.sendCode}>{this.state.btnText}</button>
            </div>
            <button className="reg-btn btn" onClick={this.getRegister}>提交手机验证码</button>
          </div>
        </div>
      </div>
    )
  }
}

export default template(Reset)