import React, { Component } from 'react'
import Search from './component/Search'
import List from './component/List'


export default class App extends Component {

	state = { //初始化状态
		users: [],//user是初始值为数组
		isFirst: true,//是否是第一次打开页面
		isLoading: false,//是否处于加载中
		err: '',//存储请求错误
	}

	updateAppState = (stateObj) => {
		this.setState(stateObj)
	}

	render() {
		return (
			<div className="container">
				<Search updateAppState={this.updateAppState} />
				<List {...this.state} />
			</div>
		)
	}
}
