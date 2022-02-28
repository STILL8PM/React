import React, { Component } from 'react'
import PubSub from 'pubsub-js'
// import axios from 'axios'
export default class Search extends Component {

	search = async () => {
		const { keyWordElement: { value: keyWord } } = this
		//发送前请求前通知List更新状态
		PubSub.publish('atguigu', { isFirst: false, isLoading: true })
		//发送网络请求---使用axios
		/* axios.get(`/api1/search/users2?q=${keyWord}`).then(
			response => {
				//请求成功后通知List更新状态
				PubSub.publish('atguigu',{ isLoading: false, users: response.data.items })
			},
			error => {
				//请求失败后通知List更新状态
				PubSub.publish('atguigu',{ isLoading: false, err: error.message })
			}
		) */

		//发送网络请求---使用fetch (未优化)
		/* fetch(`/api1/search/users2?q=${keyWord}`).then(
			response => {
				console.log('联系服务器成功了');
				return response.json()
			},
			error => {
				console.log('联系服务器失败了', error);
				return new Promise(() => { })
			}
		).then(
			response => { console.log('获取数据成功了', response.items); },
			error => { console.log('联系服务器失败了', error); }
		) */

		//发送网络请求---使用fetch (优化)
		try {
			const response = await (await fetch(`/api1/search/users?q=${keyWord}`)).json()
			// const data =await response.json();
			PubSub.publish('atguigu', { isLoading: false, users: response.items })
			console.log(response.items);
		} catch (error) {
			console.log('请求出错', error);
			PubSub.publish('atguigu', { isLoading: false, err: error.message })
		}


	}

	render() {
		return (
			<section className="jumbotron">
				<h3 className="jumbotron-heading">搜索Github用户</h3>
				<div>
					<input ref={c => this.keyWordElement = c} type="text" placeholder="输入关键词点击搜索" />&nbsp;
					<button onClick={this.search}>搜索</button>
				</div>
			</section>
		)
	}
}
