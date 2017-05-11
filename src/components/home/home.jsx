import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { message } from 'antd';

import template from '../index';
import Header from '../common/header/header';
import CarCard from './car_card/car_card';
import HomeDatePicker from '../common/date_picker/date_picker';

import './home.scss';
import * as axios from '../../public/js/axios.js';
import { getNewDate } from '../../public/js/common.js';

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // bbb: 'http://www.w3school.com.cn/i/eg_tulip.jpg',
      // newImg: 'b',
      date: null,
      cards: [{
        iid: 1, startDate: '2017-04-14',
        startTimeMinHour: '18', startTimeMinMin: '40',
        startTimeMaxHour: '20', startTimeMaxMin: '30',
        startPos: '马总家', arrivePos: '马夫人家',
        curtMember: 2, maxMember: 5,
        message: 'aaaaaaa', pubTime: '2017-02-23'
      }]
    }
  }
  static childContextTypes = {
    // 验证context属性
    text: PropTypes.string
  }
  getChildContext () {
    // 能传递给所有子组件，不需要层级props获取
    return {text: 'aaa'}
  }
  componentWillMount () {
    const todayDate = getNewDate();
    this._getHome(todayDate);
  }
  // componentDidMount () {
  //   let imgSet = (image) => {
  //     let canvas = document.createElement('canvas');
  //     canvas.width = image.width;
  //     canvas.height = image.height;
  //     window.console.log(canvas)
  //     canvas.getContext("2d").drawImage(image, 0, 0);
  //     let url = canvas.toDataURL('image/png');
  //     window.console.log(url)
  //     return url
  //   }
  //   let img = new Image();
  //   img.setAttribute('crossOrigin', 'anonymous')
  //   img.src = 'https://huzidaha.github.io/static/assets/img/wechat-user.jpeg';
  //   window.console.log(img)
  //   imgSet(img)
  //   let bbb = imgSet(img)
  //   this.setState({
  //     newImg: bbb
  //   })
  // }
  // componentWillUnmount () {
  //   // 组件销毁时
  // }
  dateChange = (moment, value) => {
    this.setState({date: value})
    this._getHome(value)
    setTimeout( () => {
      message.success(this.state.date)
    }, 10);
  }
  goUser = () => {
    this.props.history.push('/user');
  }
  _getHome(date) {
    const req = {
      url: `index/${date}`,
      data: {}
    }
    axios._get(req)
    .then(res => {
      window.console.log(res)
      if (!res.data.code) {
        this.setState({cards: res.data.data})
      }
    })
  }
  render() {
    // const isFalse = false;
    const btnClass = classNames({
      'btn': true,
      'home-btn': true
    })
    return (
      <div>
        <Header history={this.props.history} back={true} user={false} title={'一页校园'}></Header>
        <div className="index-cont">
          <div className="home">
            <Link to="/anc"><button className={btnClass}>发起拼车</button></Link>
            <div className="home-date">
              <HomeDatePicker dateChange={this.dateChange}/>
            </div>
            <div className="home-card">
              {this.state.cards.map((card, index) => {
                return ( <CarCard cardData={card} goUser={this.goUser} history={this.props.history} key={index}></CarCard>)
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default template(Home)
