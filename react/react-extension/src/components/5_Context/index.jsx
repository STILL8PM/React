import React, { Component } from 'react'
import './index.css'
//创建Context对象
const MyContext = React.createContext()
const { Provider, Consumer } = MyContext
export default class A extends Component {
    state = { username: 'Tom', age: 18 }
    render() {
        const { username, age } = this.state
        return (
            <div className='parent'>
                <h3>A组件,用户名是{username},年龄是{age}</h3>
                <Provider value={{ username, age }}>
                    <B />
                </Provider>
            </div>
        )
    }
}

class B extends Component {
    render() {
        return (
            <div className='child'>
                <h3>B组件</h3>
                <C />
            </div>
        )
    }
}
/* class C extends Component {
    //声明接收
    static contextType = MyContext
    render() {
        const { username, age } = this.context
        return (
            <div className='grand'>
                <h3>我是C组件,我的用户名是{username},年龄{age}</h3>
            </div>
        )
    }
}
 */
function C() {
    return (
        <div className='grand'>
            <h3>C函数组件,用户名是
                <Consumer>
                    {value => {return `${value.username},年龄是${value.age}`}}
                </Consumer>
            </h3>
        </div>
    )
}