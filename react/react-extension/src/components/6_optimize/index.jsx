import React, { PureComponent } from 'react'
import './index.css'

export default class Parent extends PureComponent {

    state = { carName: '奔驰C63', stus: ['小张', '小李', '小王'] }

    /* shouldComponentUpdate(nextProps,nextState){
        // console.log(this.props,this.state);//目前的props和state
        // console.log(nextProps,nextState);//接下来要变的目标props和state
        return !this.state.carName===nextProps.carName
    } */
    //替换Component为PureComponent可代为判断,且为浅对比，对比指向

    changeCar = () => {
        this.setState({ carName: '迈巴赫' })
    }

    addStus = () => {
        /* const {stus} =this.state
        stus.unshift('小刘')
        this.setState(stus) */
        const { stus } = this.state
        this.setState({ stus: ['小刘', ...stus] })
    }
    render() {
        console.log('parent---render');
        const { carName } = this.state
        return (
            <div className='parent'>
                <h3>我是Parent组件</h3>
                {this.state.stus}&nbsp;
                <span>我的车名字是:{carName}</span><br />
                <button onClick={this.changeCar}>点我换车</button>
                <button onClick={this.addStus}>添加一个小刘</button>
                <Child carName='奥拓' />
            </div>
        )
    }
}

class Child extends PureComponent {

    /* shouldComponentUpdate(nextProps){
        // console.log(this.props);//目前的props
        // console.log(nextProps);//接下来要变的目标props
        return !this.props.carName===nextProps.carName
    } */
    //替换Component为PureComponent可代为判断，且为浅对比，对比指向

    render() {
        console.log('child---render');
        return (
            <div className='child'>
                <h3>我是Child组件</h3>
                <span>我接到的车是:{this.props.carName}</span>
            </div>
        )
    }
}
