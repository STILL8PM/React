/* 
    该文件用于汇总所有的reducer为一个总的reducer
*/
//引入combineReducers，专门用于汇总多个reducer
import { combineReducers } from 'redux'

//引入为Count组件服务reducer
import count from './count'
//引入为Person组件服务reducer
import persons from './person'

//汇总所有reducer变为一个整的reducer
export default combineReducers({ count, persons })
