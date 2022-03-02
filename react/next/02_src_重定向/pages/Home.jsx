import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'

export default function Home() {
    const [sum, setSum] = React.useState(1)
    return (
        <div>
            <h3>我是Home组件</h3>
            {sum === 2 ? <Navigate to='/about' replace={true} /> : <h4>当前sum值是:{sum}</h4>}
            <button onClick={() => { setSum(2) }}>点我变2</button>
        </div>
    )
}
