import React, { Component } from 'react';
import classNames from 'classnames';
// import CSSModules from 'react-css-modules';
import {Icon} from 'antd';
import './header.scss';

class Header extends Component {
  constructor(props) {
    super(props)

    this.state = {
    }
  }

  static defaultProps = {
    text: '一页校园',
    isBack: false,
    isUser: false
  }

  render() {
    const headerClass = classNames({
      'header': true
      // 'header-blue': this.state.isHeaderBlue
    })
    const backClass =classNames({
      'header-back': true,
      'header-back-hidden': this.props.isBack
    })
    const UserClass =classNames({
      'header-user': true,
      'header-user-hidden': this.props.isUser
    })
    return (
      <div className={headerClass}>
        <span className={backClass}>
          <Icon type="left" />
        </span>
        <span className="header-title">{this.props.text}</span>
        <span className={UserClass}>
          <Icon type="user"></Icon>
        </span>
      </div>
    )
  }
}

export default Header;