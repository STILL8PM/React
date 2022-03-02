import React, { Component } from 'react'
import './index.css'
import C from '../1_setState/index'

export default class Parent extends Component {
    render() {
        return (
            <div className='parent'>
                <h3>我是Parent组件</h3>
                <A render={(name) => <C name={name}/>} />
            </div>
        )
    }
}

class A extends Component {
    state = { name: 'Tom' }
    render() {
        console.log(this.props)
        const { name } = this.state
        return (
            <div className='a'>
                <h3>A组件</h3>
                {this.props.render(name)}
            </div>
        )
    }
}
class B extends Component {
    render() {
        console.log('B---render');
        return (
            <div className='b'>
                <h3>B组件,{this.props.name}</h3>
            </div>
        )
    }
}
