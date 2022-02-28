//引入Count的ui组件
import CountUI from '../../components/Count'
//引入action
import { createIncrementAction, createDecrementAction, createIncrementAsyncAction } from '../../redux/count_action'

//引入connect用于连接UI组件与redux
import { connect } from 'react-redux'

//映射状态
/* const mapStateToProps = state => ({ count: state })
 */
//映射操作状态的方法
/* const mapDispatchToProps = dispatch => ({
    jia: (number) => dispatch(createIncrementAction(number)),
    jian: (number) => dispatch(createDecrementAction(number)),
    jiaAsync: (number, time) => dispatch(createIncrementAsyncAction(number, time)),
})
 */
//创建并暴露一个Count的容器组件
export default connect(
    state => ({ count: state }),

    //mapDispatchToProps的一般写法
    /*dispatch => ({
        jia: (number) => dispatch(createIncrementAction(number)),
        jian: (number) => dispatch(createDecrementAction(number)),
        jiaAsync: (number, time) => dispatch(createIncrementAsyncAction(number, time)),
    }) */

    //mapDispatchToProps的简写,react-redux库自动分发dispatch
    {
        jia:createIncrementAction,
        jian:createDecrementAction,
        jiaAsync:createIncrementAsyncAction,
    }
)(CountUI)