import { ADD_PERSON } from '../constant'
//初始化人状态
const initState = [
    { id: '001', name: 'Tom', age: 18 }
]
export default function personReduer(perState = initState, action) {
    const { type, data } = action
    switch (type) {
        case ADD_PERSON:
            return [data, ...perState]
        default:
            return perState
    }
}
