import React, { Component } from 'react'
import './index.css'

export default class Item extends Component {
	//状态在哪里，操作状态的方法就在哪里

	state = { mouse: false }//标识鼠标移入移出

	//鼠标移入移出的回调
	handleMouse = (flag) => {
		return () => {
			this.setState({ mouse: flag })
		}
	}
	//勾选，取消勾选的todo回调
	handleCheck = (id) => {
		return (event) => {
			this.props.updateTodo(id, event.target.checked)
		}
	}
	//删除一个todo回调
	handelDelete = (id) => {
		if (window.confirm('确定删除吗?')) {
			this.props.deleteTodo(id)
		}
	}

	render() {
		const { id, name, done } = this.props
		const { mouse } = this.state
		return (
			<li style={{ backgroundColor: mouse ? '#ddd' : 'white' }} onMouseEnter={this.handleMouse(true)} onMouseLeave={this.handleMouse(false)}>
				<label>
					<input type="checkbox" checked={done} onChange={this.handleCheck(id)} />
					<span>{name}</span>
				</label>
				<button onClick={() => { this.handelDelete(id) }} className="btn btn-danger" style={{ display: mouse ? 'block' : 'none' }}>删除</button>
			</li>
		)
	}
}
