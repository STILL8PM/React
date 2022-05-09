import React, { Component } from 'react'
import qs from "query-string"

const DetailData = [
    { id: '01', title: '消息1', content: '你好,中国' },
    { id: '02', title: '消息2', content: '你好,尚硅谷' },
    { id: '03', title: '消息3', content: '你好,React' },
]
export default class Detail extends Component {
    render() {
        console.log(this.props);
        // const { id, title } = this.props.match.params//接收params参数

        //接收search参数
        const { search } = this.props.location
        const { id, title } = qs.parse(search)


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
