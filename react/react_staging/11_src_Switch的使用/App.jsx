import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Header from './component/Header'//一般组件
import MyNavLink from './component/MyNavLink'//一般组件
import About from './pagas/About'//路由组件
import Home from './pagas/Home'//路由组件
import Test from './pagas/Test'//路由组件

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
							<MyNavLink to='/about' title='About' a={1} children='About' />
							<MyNavLink to='/home' title='Home' children='Home' />
						</div>
					</div>
					<div className="col-xs-6">
						<div className="panel">
							<div className="panel-body">
								{/* 注册路由 */}
								<Switch>
									{/* Switch包裹则只匹配一次，不显示Test */}
									<Route path='/about' component={About} />
									<Route path='/home' component={Home} />
									<Route path='/home' component={Test} />
								</Switch>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
