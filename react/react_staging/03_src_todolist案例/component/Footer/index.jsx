import React, { Component } from 'react'
import './index.css'

export default class Footer extends Component {

    //全选checkbox的回调
    handleCheckAll = (event) => {
        this.props.checkAllTodo(event.target.checked)
    }
    //清除已完成任务的回调
    handleClearAllDone=()=>{
        this.props.clearAllTodo()
    }
    render() {
        const { todos } = this.props
        //计算已完成
        const doneCount = todos.reduce((pre, todos) => { return pre + (todos.done ? 1 : 0) }, 0)
        //总数
        const tobal = todos.length
        return (
            <div className="todo-footer">
                <label>
                    <input onChange={
                        this.handleCheckAll} type="checkbox"
                        checked={
                            doneCount === tobal && tobal !== 0 ? true : false
                        } />全选
                </label>
                <span>
                    <span>已完成{doneCount}个</span> / 全部{tobal}个
                </span>
                <button onClick={this.handleClearAllDone} className="btn btn-danger">清除已完成任务</button>
            </div>
        )
    }
}
