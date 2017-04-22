import React, { Component } from 'react'
// import * as s from './home.scss'
import Header from '../common/header/header'

class Home extends Component {
  static defaultProps = {
    list: [],
    handleHeader: () => {}
  }
  constructor(props) {
    super(props)
    this.state = {
      list: this.props.list.map(entry => ({
        text: entry.text
      }))
    }
  }


  render() {
    return (
      <Header text="一页校园"></Header>
    )
  }
  
}

export default Home