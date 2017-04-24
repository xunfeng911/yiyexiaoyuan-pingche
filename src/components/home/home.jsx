import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { DatePicker } from 'antd';
import moment from 'moment';
import './home.scss';

import Header from '../common/header/header';
import CarCard from './car_card/car_card';

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      date: null
    }
  }

  range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  }

  disabledDate = (current) => {
     return current && current.valueOf() < Date.now();
  }

  disabledDateTime = () => {
    return {
      disabledHours: () => this.range(0, 24).splice(4, 20),
      disabledMinutes: () => this.range(30, 60),
      disabledSeconds: () => [55, 56]
    };
  }
  render() {
    const isFalse = false;
    const btnClass = classNames({
      'btn': true,
      'home-btn': true
    })
    const DatePickerStyle = {
      display: 'inline-block',
      border: '1px solid #bbb',
      borderRight: 0,
      borderLeft: 0,
      width: '88%',
      textAlign: 'center'
    }
    const DatePopupStyle = {

    }
    return (
      <div className="home">
        <Header text="一页校园"></Header>
        <div className="index-cont">
          <Link to="/user"><button className={btnClass}>发起拼车</button></Link>
          <div className="home-date">
            <DatePicker size="large" style={DatePickerStyle}
            defaultValue={moment('2015-06-06', 'YYYY-MM-DD')}
            format="YYYY-MM-DD" disabledDate={this.disabledDate}
            allowClear={isFalse} popupStyle={DatePopupStyle} />
          </div>
          <div className="home-card">
            <CarCard></CarCard>
          </div>
        </div>
      </div>
    )
  }

}

export default Home
