import React, { Component } from 'react';
import { message, Icon} from 'antd';

import template from '../index';
import Header from '../common/header/header';
import PosChoose from './pos_choose/pos_choose';
import HomeDatePicker from '../common/date_picker/date_picker';
import HomeTimePicker from '../common/time_picker/time_picker';

import './announce.scss';
import * as axios from '../../public/js/axios.js';
import { getNewDate } from '../../public/js/common.js';
import { P0S_STATUS } from '../../public/js/pos_status.js';
import debounce from 'lodash.debounce';

class Announce extends Component {
  constructor(props) {
    super(props)
    this.state = {
      startPos: '选择开始地点',  // 开始地点
      arrivePos: '选择结束地点',  // 到达地点
      curtMember: 1,    // 已有人数
      maxMember: 6,     // 最大人数
      message: '',   // 备注
      startDate: '',     // 开始日期
      startTimeMaxHour: '',
      startTimeMaxMin: '',
      startTimeMinHour: '',
      startTimeMinMin: '',
      startTime: '',
      endTime: '',
      posType: 'start',
      posIsShow: false
    }
  }

  componentWillMount() {
    this.setState({ startDate: getNewDate() })
  }

  dateChange = (moment,value) => { this.setState({ startDate: value }) }
  bzChange = e => { this.setState({ message: e.target.value })}
  timeChangeStart = (moment, value) => {
    let timer = value.split(':');
    setTimeout( () => {
      this.setState({ startTime: value, startTimeMinHour: timer[0], startTimeMinMin: timer[1] })
      window.console.log(this.state.startTime);
    }, 10);
  }
  timeChangeEnd = (moment, value) => {
    let timer = value.split(':');
    setTimeout( () => {
      this.setState({ endTime: value, startTimeMaxHour: timer[0], startTimeMaxMin: timer[1] })
    }, 100);
  }
  maxChange = e => { this.setState({ maxMember: e.target.value }) }
  curtChange = e => { this.setState({ curtChange: e.target.value }) }
  
  // 交换地点
  posChange = () => {
    const { startPos, arrivePos } = this.state;
    this.setState({ startPos: arrivePos, arrivePos: startPos });
  }
  // 显示选项
  posChooseShow = (type) => {
    this.setState({ posType: type, posIsShow: true});
  }
  // 选择确定
  PosChoose = (pos) => {
    const status = this.state.posType;
    switch (status) {
      case 'startPos':
        this.setState({ startPos: pos, posIsShow: false })
        message.success('设置开始地点成功！');
        break;
      case 'arrivePos':
        this.setState({ arrivePos: pos, posIsShow: false });
        message.success('设置到达地点成功！');
        break;
      default:
        message.error('error');
        break;
    }
  }
  // 提交发布
  valAnc = () => {
    const { startPos, arrivePos, curtMember, maxMember, startDate, startTime, endTime } = this.state;
    let startMs = `${startDate}  ${startTime}`;
    let endMs = `${startDate}  ${endTime}`;
    let nowDate = new Date().getTime();
    startMs = new Date(startMs).getTime();
    endMs = new Date(endMs).getTime();
    window.console.log(nowDate, startMs, endMs, startDate);
    if (startPos === '选择开始地点' || startPos === '') {
      message.warning('请选择开始地点');
      return false;
    }
    if (arrivePos === '选择结束地点' || arrivePos === '') {
      message.warning('请选择结束地点');
      return false;
    }
    if (curtMember === 0 || curtMember === '') {
      message.warning('请设置已有人数');
      return false;
    }
    if (maxMember === 0 || maxMember === '') {
      message.warning('请设置最大人数');
      return false;
    }
    if (curtMember >= maxMember) {
      message.warning('已有人数需小于最大人数');
      return false;
    }
    if (startTime === '' || endTime === '') {
      window.console.log(startTime, endTime)
      message.warning('请设置起始或终止时间');
      return false;
    }
    if (startMs > endMs) {
      message.warning('最早时间不能晚于最晚时间哟~');
      return false;
    }
    if (nowDate > startMs - 60 * 60 * 1000) {
      window.console.log(startMs - 60 * 60 * 1000)
      message.warning('拼车开始时间不能晚于当前时间的一小时前');
      return false;
    }
    this._sendAnc();
  }
  _sendAnc = () => {
    const req = {
      url: 'index/create/stroke',
      data: this.state,
      token: this.props.getUserInfo.token
    }
    axios._post(req)
    .then(res => {
      if (!res.data.code) {
        message.success('发布拼车成功~');
        setTimeout( () => {
          this.props.history.push('/user');
        }, 1000);
      }
    })
  }

  render() {
    const DatePickerStyle = {
      display: 'inline-block',
      border: '0px solid #bbb',
      borderRight: 0,
      borderLeft: 0,
      width: '88%',
      textAlign: 'center'
    }
    const pos_status = P0S_STATUS;
    return (
      <div>
        <Header history={this.props.history} back={false} user={true} title={'一页校园'}></Header>
        <div className="index-cont">
          <div className="anc">
            <div className="anc-list">
              <div className="anc-list-input">
                <button onClick={this.posChooseShow.bind(this, 'startPos')}>{this.state.startPos}</button>
                <p onClick={this.posChange}><Icon type="retweet" /></p>
                <button onClick={this.posChooseShow.bind(this, 'arrivePos')}>{this.state.arrivePos}</button>
              </div>
              <div className="anc-list-date">
               <HomeDatePicker DatePickerStyle={DatePickerStyle} dateChange={this.dateChange}/>
              </div>
              <div className="anc-list-time">
                <HomeTimePicker timeChange={this.timeChangeStart} placeholder="最早发车" />
              </div>
              <div className="anc-list-time">
                <HomeTimePicker timeChange={this.timeChangeEnd} placeholder="最晚发车" />
              </div>
            </div>
            <div className="anc-list">
              <div className="anc-list-num">
                <span>人数上限:</span>
                <input type="number" max="10" value={this.state.maxMember} onChange={this.maxChange} className="anc-list-num-input" required />
                <span>已有人数:</span>
                <input type="number" max="10" value={this.state.curtMember} onChange={this.curtChange} className="anc-list-num-input" required/>
              </div>
              <div className="anc-list-bz">
                <input type="text" onChange={this.bzChange} value={this.state.message} placeholder="备注或要求，18字以内，请勿泄露个人隐私"  />
              </div>
            </div>
            <button className="anc-btn btn" onClick={debounce(this.valAnc, 200)}>发布拼车</button>
          </div>
        </div>
        <PosChoose status={pos_status} posIsShow = {this.state.posIsShow}
          PosChoose={this.PosChoose} />
      </div>
    )
  }
}

export default template(Announce);