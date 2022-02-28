/* 
    该文件是用于创建一个为Count组件服务的reducer，reducer的本质就是一个函数
    reducer函数会接到两个参数，之前的状态perState，动作对象action
*/
import {INCREMENT,DECREMENT} from './constant'
const initState = 0//初始化状态值
export default function countReducer(preState=initState, action) {
    console.log(preState, action);
    if (preState === undefined) preState = 0
    const { type, data } = action
    switch (type) {
        case INCREMENT:
            return preState + data
        case DECREMENT:
            return preState - data
        default:
            return preState
    }
}