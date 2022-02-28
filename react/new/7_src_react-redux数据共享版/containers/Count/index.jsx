import React, { Component } from 'react'
//引入action
import {
    createIncrementAction,
    createDecrementAction,
    createIncrementAsyncAction
} from '../../redux/actions/count'

//引入connect用于连接UI组件与redux
import { connect } from 'react-redux'

//定义UI组件
class Count extends Component {
    //加法
    increment = () => {
        const { value } = this.selectNumber
        this.props.jia(value * 1)
    }
    //减法
    decremnet = () => {
        const { value } = this.selectNumber
        this.props.jian(value * 1)
    }
    //奇数再加
    incrementIfOdd = () => {
        const { value } = this.selectNumber
        if (this.props.count % 2 !== 0) {
            this.props.jia(value * 1)
        }
    }
    //异步加
    incrementAsync = () => {
        const { value } = this.selectNumber
        this.props.jiaAsync(value * 1, 500)
    }
    render() {
        return (
            <div>
                <h2>我是Count组件,下方组合总人数为{this.props.renshu}</h2>
                <h4>当前求和为:{this.props.count}</h4>
                <select ref={c => this.selectNumber = c}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>&nbsp;
                <button onClick={this.increment}>+</button>&nbsp;
                <button onClick={this.decremnet}>-</button>&nbsp;
                <button onClick={this.incrementIfOdd}>当前求和为奇数再加</button>&nbsp;
                <button onClick={this.incrementAsync}>异步加</button>
            </div>
        )
    }
}

//创建并暴露一个Count的容器组件
export default connect(
    state => ({
        count: state.he,
        renshu: state.rens.length
    }),

    //mapDispatchToProps的一般写法
    /*dispatch => ({
        jia: (number) => dispatch(createIncrementAction(number)),
        jian: (number) => dispatch(createDecrementAction(number)),
        jiaAsync: (number, time) => dispatch(createIncrementAsyncAction(number, time)),
    }) */

    //mapDispatchToProps的简写,react-redux库自动分发dispatch
    {
        jia: createIncrementAction,
        jian: createDecrementAction,
        jiaAsync: createIncrementAsyncAction,
    }
)(Count)