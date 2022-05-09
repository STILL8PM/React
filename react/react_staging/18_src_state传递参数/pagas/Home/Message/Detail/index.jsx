import React, { Component } from 'react'


const DetailData = [
    { id: '01', title: '消息1', content: '你好,中国' },
    { id: '02', title: '消息2', content: '你好,尚硅谷' },
    { id: '03', title: '消息3', content: '你好,React' },
]
export default class Detail extends Component {
    render() {
        const { id, title } = this.props.location.state ||{}
        const findResult = DetailData.find((detailObj) => {
            return detailObj.id === id
        })
        return (
            <ul>
                <li>ID:{id}</li>
                <li>TITLE:{title}</li>
                <li>CONTENT:{findResult.content}</li>
            </ul>
        )
    }
}
