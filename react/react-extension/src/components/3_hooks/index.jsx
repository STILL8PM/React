import React from 'react'

/* export default class Demo extends React.Component {
    state = { count: 0 }
    add = () => {
        this.setState((state) => ({ count: state.count + 1 }))
    }
    render() {
        return (
            <div>
                <h2>当前求和为{this.state.count}</h2>
                <button onClick={this.add}>点我+1</button>
            </div>
        )
    }
}
 */
function Demo() {
    console.log('Demo')//Demo调用1+n次

    const [count, setCount] = React.useState(0)//count为求和初始值，setCount为操作count值的方法
    function add() {
        //setCount(count + 1)//第一种写法
        setCount(count => count + 1)//里面为函数，且触发简写
    }

    const [name, setName] = React.useState('Tom')//name为名字初始值，setName为操作name值的方法
    function changeName(){
        setName(name=>"Jack")
    }



    return (
        <div>
            <h2>当前求和为:{count}</h2>
            <h2>我的名字是:{name}</h2>
            <button onClick={add}>点我+1</button>
            <button onClick={changeName}>点我改名</button>
        </div>
    )
}
export default Demo 