import React, {Component} from 'react';
// import classNames from 'classnames';
import './car_card.scss';

class CarCard extends Component {
  constructor(props) {
    super(props)
  }
  static defaultProps = {
    cardData: {
      carDate: '2017-04-24',
      carTime: '00:00-23:59',
      carBegin: '马总家',
      carEnd: '马夫人家',
      upLimit: 5,
      upNow: 2,
      remark: 'aaaaaaa',
      publishDate: '2017-02-23'
    }
  }


  render() {
    return (
      <div className="car-card">
        <div className="car-card-li">
          <div className="car-card-li-date">
            <span>时间：</span>
            <span className="car-card-li-date-date strong-span">{this.props.cardData.carDate}</span>
            <span className="car-card-li-date-time strong-span">{this.props.cardData.carTime}</span>
          </div>
          <div className="car-card-li-place">
            <span>出发：</span>
            <span className="car-card-li-place-begin strong-span">{this.props.cardData.carBegin}</span>
            <span>到达：</span>
            <span className="car-card-li-place-end strong-span">{this.props.cardData.carEnd}</span>
          </div>
          <div className="car-card-li-num">
            <span className="car-card-li-num-join"></span>
            <span className="car-card-li-num-leave"></span>
            <span className="car-card-li-num-data strong-span">上限{this.props.cardData.upLimit}人,已有{this.props.cardData.upNow}人</span>
          </div>
          <div className="car-card-li-remark">
            <span>备注：</span>
            <span className="car-card-li-remark-info">{this.props.cardData.remark}</span>
          </div>
          <div className="car-card-li-issue">
            <span>发布于{this.props.cardData.publishDate}</span>
          </div>
          <div className="car-card-li-button">
            <button>已完成</button>
          </div>
        </div>
      </div>
    )
  }
}

export default CarCard;