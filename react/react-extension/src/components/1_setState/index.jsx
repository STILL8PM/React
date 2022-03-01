import React, { Component } from 'react'

export default class Demo extends Component {
    state = { count: 0 }

    add = () => {
        //对象式的setState
        /* //获取原来的count值
        const  {count} = this.state
        //更新状态
        this.setState({count:count+1},()=> {
            console.log(this.state.count);
        })
        console.log(this.state);
        //精简--->
        this.setState({count:this.state.count+1})
         */

        //函数式的setState
        /* this.setState((state, props) => {
            console.log(state, props);
            return { count: state.count + 1 }
        },()=> {
            console.log(this.state.count);
        }) */

        this.setState(state => ({ count: state.count + 1 }))
        //精简--->
    }
    render() {
        return (
            <div>
                <h1>当前求和为:{this.state.count}</h1>
                <button onClick={this.add}>点我+1</button>
            </div>
        )
    }
}
