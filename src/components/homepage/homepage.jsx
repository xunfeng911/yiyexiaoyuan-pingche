import React, { Component } from 'react'
import * as s from './homepage.scss'
class HomePage extends Component {
  constructor(props) {
    super(props)

    // 使用构造器绑定监听事件
    // this.handleInputChange = this.handleInputChange.bind(this)
    // this.handleTextareaChange = this.handleTextareaChange.bind(this)

    // 数据
    this.state = {
      inputValue: 'default',
      textareaValue: ''
    }
  }

  handleInputChange = (e) => {
    this.setState({
      inputValue: e.target.value
    })
  }

  handleTextareaChange = (e) => {
    this.setState({
      textareaValue: e.target.value
    })
  }

  render() {
    const { inputValue, textareaValue } = this.state

    return (
      <div className={s.homepage}>
        <p>
          <span>单行输入:</span>
          <input type="text" value={inputValue} onChange={this.handleInputChange}/>
        </p>
        <p>
          <span>输入框:</span>
          <textarea value={textareaValue} onChange={this.handleTextareaChange} cols="30" rows="10"></textarea>
        </p>
      </div>
    )
  }
}


export default HomePage;
