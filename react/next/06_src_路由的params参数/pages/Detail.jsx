import React from 'react'
import { useParams, useMatch } from 'react-router-dom'


export default function Detail() {
    const { id, title, content } = useParams()
    // const { id, title, content } = useMatch('/home/message/detail/:id/:title/:content').params

    return (
        <ul>
            <li>消息编号:{id}</li>
            <li>消息标题:{title}</li>
            <li>消息内容:{content}</li>
        </ul>
    )
}
