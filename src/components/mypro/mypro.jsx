import React, { Component } from 'react';
import { message } from 'antd';

import template from '../index';
import Header from '../common/header/header';
import JoinCard from './join_card/join_card';
import PcModal from '../common/modal/modal';
import PopNot from '../common/pop_not/pop_not';

import * as axios from '../../public/js/axios.js';
import { getMyDate } from '../../public/js/common.js';

class MyPro extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cards: [],
      popData: {},
      modal_text: '确定要取消行程吗？',
      modalShow: false,
      index: 0,
      PopIsShow: true
    }
  }

  componentWillMount() {
    this._init()
  }
  // card event
  joinSee = (index) => {
    window.console.log('joinSee');
    const i = this.state.cards[index].iid;
    // window.console.log(i);
    const req = {
      url: `member/${i}`,
      data: {},
      token: this.props.getUserInfo.token
    }
    axios._get(req).then(res => {
      window.console.log(res)
      if (!res.data.code) {
        this.setState({ popData: res.data.data, PopIsShow: true });
      }
    })
  }
  joinCancel = (index) => {
    window.console.log('joinCancel');
    this.setState({ modalShow: true, index: index });
  }
  joinFeed = (index) => {
    window.console.log('joinFeed');
    const i = this.state.cards[index].iid;
    window.console.log(i);
  }
  modalConfirm = () => {
    const i = this.state.index;
    const iid = this.state.cards[i].iid;
    const req = {
      url: `member/cancel/${iid}`,
      data: {},
      token: this.props.getUserInfo.token
    }
    axios._delete(req).then(res => {
      window.console.log(res);
      if (!res.data.code) {
        let cards = this.state.cards;
        cards.splice(i, 1);
        // window.console.log(cards);
        this.setState({ modalShow: false, cards: cards });
        message.success('取消行程成功！');
      } else {
        this.setState({ modalShow: false });
        message.error(res.data.msg);
      }
    })
  }
  modalCancel = () => {
    this.setState({ modalShow: false });
  }
  // 查看联系人
  PopCancel = () => {
    this.setState({ PopIsShow: false });
  }
  // 数据渲染
  _init = () => {
    const req = {
      url: 'user/stroke',
      data: {},
      token: this.props.getUserInfo.token
    }
    axios._get(req).then(res => {
      window.console.log(res)
      if (!res.data.code) {
        let cards = res.data.data;
        cards.forEach((card, index) => {
          const isEnd = this._initIsEnd(card);
          // window.console.log(isEnd);
          cards[index].isEnd = isEnd;
        }, this);
        // window.console.log(cards);
        this.setState({ cards: cards });
      }
    })
  }
  _initIsEnd = (data) => {
    const startDate = getMyDate(data.startDate);
    let theDate = `${startDate}  ${data.startTimeMinHour}:${data.startTimeMinMin}`;
    const nowDate = new Date();
    const nowDateMs = nowDate.getTime();
    theDate = Date.parse(theDate);
    let endDate = theDate + 30 * 60 * 1000;
    if (nowDateMs < endDate) {
      return true;
    } else {
      return false;
    }
  }
  render() {
    return (
      <div>
        <Header history={this.props.history} back={false} user={true} title={'一页校园'}></Header>
        <div className="index-cont">
          <div className="mypro">
            {this.state.cards.map((card, index) => {
              return (<JoinCard cardData={card}
                joinFeed={this.joinFeed.bind(this, index)} joinSee={this.joinSee.bind(this, index)}
                joinCancel={this.joinCancel.bind(this, index)} key={index} />)
              })}
          </div>
        </div>
        <PcModal modalConfirm={this.modalConfirm} modalCancel={this.modalCancel}
          text={this.state.modal_text} isShow={this.state.modalShow} />
        <PopNot PopIsShow={this.state.PopIsShow} PopCancel={this.PopCancel}>
          <div>aa</div>
        </PopNot>
      </div>
    )
  }
}

export default template(MyPro);