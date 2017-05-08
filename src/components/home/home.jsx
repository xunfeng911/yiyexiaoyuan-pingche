import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import template from '../index';
import './home.scss';

import Header from '../common/header/header';
import CarCard from './car_card/car_card';
import HomeDatePicker from '../common/date_picker/date_picker';
import {message} from 'antd';
class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // bbb: 'http://www.w3school.com.cn/i/eg_tulip.jpg',
      // newImg: 'b',
      date: null,
      cards: [{carid: 1, carDate: '2017-04-24',carTime: '00:00-23:59',carBegin: '马总家',carEnd: '马夫人家',
      upLimit: 5,upNow: 2,remark: 'aaaaaaa',publishDate: '2017-02-23',isEnd: true},
      {carid:2, carDate: '2017-04-27',carTime: '00:00-23:59',carBegin: '游总家',carEnd: '游夫人家',
      upLimit: 5,upNow: 2,remark: 'aaaaaaa',publishDate: '2017-02-23',isEnd: false}
      ]
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
    // dom挂载前，ajax／定时器启动
    // let action = {
    //   back: true,
    //   title: '一页校园',
    //   user: false
    // }
    // this.props.setBack(action);
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
  dateChange = (moment,value) => {
    const cards = [{carid: 1, carDate: '2017-04-24',carTime: '00:00-23:59',carBegin: '马总家',carEnd: '马夫人家',
      upLimit: 5,upNow: 2,remark: 'bbbb',publishDate: '2017-02-23',isEnd: true},
      {carid:2, carDate: '2017-04-27',carTime: '00:00-23:59',carBegin: '游总家',carEnd: '游夫人家',
      upLimit: 5,upNow: 2,remark: 'aaaabbbadfaaa',publishDate: '2017-02-23',isEnd: false}
      ]
    this.setState({date: value, cards: cards})
    setTimeout( () => {
      message.success(this.state.date)
    }, 10);
  }
  goUser = (index) => {
    this.state.cards[index].isEnd = true
    this.setState()
    message.success('报名成功！');
      setTimeout( () => {
        this.props.history.push('/user');
      }, 1000);
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
            <Link to="/user"><button className={btnClass}>发起拼车</button></Link>
            <div className="home-date">
              <HomeDatePicker dateChange={this.dateChange}/>
            </div>
            <div className="home-card">
              {this.state.cards.map((card, index) => {
                return ( <CarCard cardData={card} goUser={this.goUser.bind(this, index)} history={this.props.history} key={index}></CarCard>)
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default template(Home)
