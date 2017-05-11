import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { message, Icon} from 'antd';

import template from '../index';
import Header from '../common/header/header';
import PosChoose from './pos_choose/pos_choose';
import HomeDatePicker from '../common/date_picker/date_picker';
import HomeTimePicker from '../common/time_picker/time_picker';

import './announce.scss';
import * as axios from '../../public/js/axios.js';
import { getNewDate } from '../../public/js/common.js';
import throttle from 'lodash.throttle';

class Announce extends Component {
  constructor(props) {
    super(props)
    this.state = {
      startPos: '马总家',  // 开始地点
      arrivePos: '马夫人家',  // 到达地点
      curtMember: 1,    // 已有人数
      maxMember: 6,     // 最大人数
      message: '',   // 备注
      startDate: '',     // 开始日期
      startTimeMaxHour: '18',
      startTimeMaxMin: '30',
      startTimeMinHour: '19',
      startTimeMinMin: '40',
      startTime: '0',
      endTime: '0',
      posType: 'start'
    }
  }

  componentWillMount() {
    this.setState({ startDate: getNewDate() })
  }

  dateChange = (moment,value) => { this.setState({ startDate: value }) }
  bzChange = e => { this.setState({ message: e.target.value })}
  timeChangeStart = (moment, value) => { this.setState({ startTime: value }) }
  timeChangeEnd = (moment, value) => { this.setState({ endTime: value }) }
  maxChange = e => { this.setState({ maxMember: e.target.value }) }
  curtChange = e => { this.setState({ curtChange: e.target.value }) }
  
  posChange = () => {
    const { startPos, arrivePos } = this.state;
    this.setState({ startPos: arrivePos, arrivePos: startPos });
  }
  posChooseShow = (type) => {
    this.setState({ posType: type });
    window.console.log(type)
  }
  valAnc = () => {
    this._sendAnc()
  }
  _sendAnc = () => {
    const req = {
      url: 'index/create/stroke',
      data: this.state,
      token: this.props.getUserInfo.token
    }
    axios._post(req)
    .then(res => {
      window.console.log(res)
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
            <button className="anc-btn btn" onClick={throttle(this.valAnc, 5000)}>发布拼车</button>
          </div>
        </div>
      </div>
    )
  }
}

export default template(Announce);