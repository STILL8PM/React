import React from 'react'
import ReactDOM from 'react-dom'
//类式组件
/* export default class Demo extends React.Component {
    state = { count: 0 }

    myRef = React.createRef()
    show = () => {
        alert(this.myRef.current.value)
    }

    componentDidMount() {
        this.timer = setInterval(() => {
            this.setState(state => ({ count: state.count + 1 }))
        }, 1000)
    }

    add = () => {
        this.setState((state) => ({ count: state.count + 1 }))
    }

    unmount = () => {
        ReactDOM.unmountComponentAtNode(document.getElementById('root'))
    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }

    render() {
        return (
            <div>
                <input type="text" ref={this.myRef} />
                <h2>当前求和为{this.state.count}</h2>
                <button onClick={this.add}>点我+1</button>&nbsp;
                <button onClick={this.unmount}>卸载组件</button>&nbsp;
                <button onClick={this.show}>点击提示数据</button>
            </div>
        )
    }
} */

//函数式组件
function Demo() {
    // console.log('Demo')//Demo调用1+n次
    const [count, setCount] = React.useState(0)//count为求和初始值，setCount为操作count值的方法
    const [name, setName] = React.useState('Tom')//name为名字初始值，setName为操作name值的方法

    const myRef = React.useRef()
    function show() {
        alert(myRef.current.value)
    }

    React.useEffect(() => {
        let timer = setInterval(() => {
            setCount(count => count + 1)
        }, 1000)
        //返回值相当于componentWillUnmount()
        return () => {
            clearInterval(timer)
        }
    }, [])

    // 如果没有[]即全部监测;相当于componentDidmount()和componentUpdatemount()
    // 有[]全家不监测,相当于componentDidmount();
    // [count]监测count值变化而调用 


    function add() {
        //setCount(count + 1)//第一种写法
        setCount(count => count + 1)//里面为函数，且触发简写
    }

    function changeName() {
        setName(name => "Jack")
    }

    function unmount() {
        ReactDOM.unmountComponentAtNode(document.getElementById('root'))
    }

    return (
        <div>
            <input type="text" ref={myRef} />
            <h2>当前求和为:{count}</h2>
            <h2>我的名字是:{name}</h2>
            <button onClick={add}>点我+1</button>&nbsp;
            <button onClick={changeName}>点我改名</button>&nbsp;
            <button onClick={unmount}>卸载组件</button>&nbsp;
            <button onClick={show}>点我提示数据</button>
        </div>
    )
}
export default Demo