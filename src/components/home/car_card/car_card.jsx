import React, {Component, PropTypes} from 'react';
// import classNames from 'classnames';
import { Icon } from 'antd';
import './car_card.scss';

class CarCard extends Component {
  constructor(props) {
    super(props)
    this.state = this.props.cardData
  }
  static defaultProps = {
    cardData: {
      carid: 0,
      carDate: '2222-22-22',
      carTime: '00:00-23:59',
      carBegin: '出发地点',
      carEnd: '到达地点',
      upLimit: 5,
      upNow: 0,
      remark: '没有信息',
      publishDate: '0000-00-00',
      isEnd: false
    }
  }
  static contextTypes = {
    // 子组件获取context
    text: PropTypes.string
  }
   goUser = () => {
     this.setState({
       isEnd: true
     })
  }
  render() {
    const cardData = this.state
    const peoELms = []
    const upLast = cardData.upLimit - cardData.upNow
    for (let i = 0; i < cardData.upNow; i++) {
      peoELms.push(
        <span key={'join' + i} className="car-card-li-num-join"><Icon type="smile"/></span>
      )
    }
    for (let i = 0; i < upLast; i++) {
      peoELms.push(
        <span key={'end' + i} className="car-card-li-num-end"><Icon type="smile-o"/></span>
      )
    }
    return (
      <div className="car-card">
        <div className="car-card-li">
          <div className="car-card-li-date">
            <span>日期：</span>
            <span className="car-card-li-date-date strong-span">{this.state.carDate}</span>
            <span>时间：</span>
            <span className="car-card-li-date-time strong-span">{this.state.carTime}</span>
          </div>
          <div className="car-card-li-place">
            <span>出发：</span>
            <span className="car-card-li-place-begin strong-span">{this.state.carBegin}</span>
            <span>到达：</span>
            <span className="car-card-li-place-end strong-span">{this.state.carEnd}</span>
          </div>
          <div className="car-card-li-num">
            {peoELms}
            <span className="car-card-li-num-data strong-span">上限{this.state.upLimit}人,已有{this.state.upNow}人</span>
          </div>
          <div className="car-card-li-remark">
            <span>备注：</span>
            <span className="car-card-li-remark-info">{this.state.remark}</span>
          </div>
          <div className="car-card-li-issue">
            <span>发布于{this.state.publishDate}</span>
          </div>
          <div className="car-card-li-button">
            {this.state.isEnd ?
              <button className="car-card-li-button-end btn">已完成</button> :
              <button className="car-card-li-button-bm btn" onClick={this.goUser}>报名</button>}
          </div>
        </div>
      </div>
    )
  }
}

export default CarCard;
