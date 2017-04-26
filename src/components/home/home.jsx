import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import './home.scss';

import Header from '../common/header/header';
import CarCard from './car_card/car_card';
import HomeDatePicker from './date_picker/date_picker';
class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
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
  // componentWillMount () {
  //   // dom挂载前，ajax／定时器启动
  // }
  // componentDidMount () {
  //   // dom挂载完成
  // }
  // componentWillUnmount () {
  //   // 组件销毁时
  // }
  dateChange = (moment,value) => {
    this.setState({
      date: value
    })
  }
  render() {
    // const isFalse = false;
    const btnClass = classNames({
      'btn': true,
      'home-btn': true
    })
    return (
      <div className="home">
        <Header text="一页校园" isBack={true}></Header>
        <div className="index-cont">
          <Link to="/user"><button className={btnClass}>发起拼车</button></Link>
          <div className="home-date">
            <HomeDatePicker dateChange={this.dateChange}/>
          </div>
          <div className="home-card">
            {this.state.cards.map((card) => {
              return ( <CarCard cardData={card} key={card.carid}></CarCard>)
            })}
          </div>
        </div>
      </div>
    )
  }

}

export default Home
