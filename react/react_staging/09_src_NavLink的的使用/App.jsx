import React, { Component } from 'react'
import { NavLink, Route } from 'react-router-dom'
import Header from './component/Header'//一般组件
import About from './pagas/About'//路由组件
import Home from './pagas/Home'//路由组件

export default class App extends Component {
	render() {
		return (
			<div>
				<div className="row">
					<div className="col-xs-offset-2 col-xs-8">
						<Header />
					</div>
				</div>
				<div className="row">
					<div className="col-xs-2 col-xs-offset-2">
						<div className="list-group">
							{/* 原生html靠<a>跳转到不同的页面 */}
							{/* <a className="list-group-item active" href="./about.html">About</a>
								<a className="list-group-item" href="./home.html">Home</a> */}

							{/* 在React中靠路由链接实现切换组件 ---编写路由链接*/}
							<NavLink activeClassName='atguigu' className='list-group-item' to="/about">About</NavLink>
							<NavLink activeClassName='atguigu' className='list-group-item' to="/home">Home</NavLink>
						</div>
					</div>
					<div className="col-xs-6">
						<div className="panel">
							<div className="panel-body">
								{/* 注册路由 */}
								<Route path='/about' component={About} />
								<Route path='/home' component={Home} />
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
