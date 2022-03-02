import React from 'react'
import { NavLink, useRoutes,useInRouterContext } from 'react-router-dom'
import routes from './routes'
import Herder from './components/Herder'
export default function App() {

    //根据路由表生成对应的路由规则
    const element = useRoutes(routes)
    console.log("@",useInRouterContext())//<BrowserRouter>包裹就为true，反之false
    return (
        <div>
            <div>
                <div className="row">
                <Herder/>
                </div>
                <div className="row">
                    <div className="col-xs-2 col-xs-offset-2">
                        <div className="list-group">
                            {/* 路由链接 */}
                            <NavLink className='list-group-item' to="/about">About</NavLink>
                            <NavLink className='list-group-item' to="/home">Home</NavLink>
                        </div>
                    </div>
                    <div className="col-xs-6">
                        <div className="panel">
                            <div className="panel-body">
                                {/* 注册路由 */}
                                {element}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
