import React from 'react'
import { NavLink, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'

export default function App() {
    return (
        <div>
            <div>
                <div className="row">
                    <div className="col-xs-offset-2 col-xs-8">
                        <div className="page-header"><h2>React Router Demo</h2></div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-2 col-xs-offset-2">
                        <div className="list-group">
                            {/* 路由链接 */}
                            <NavLink className="list-group-item" to="/home">Home</NavLink>
                            <NavLink className="list-group-item active" to="/about">About</NavLink>
                        </div>
                    </div>
                    <div className="col-xs-6">
                        <div className="panel">
                            <div className="panel-body">
                                {/* 注册路由 */}
                                <Routes>
                                    <Route path='/home' element={<Home />}></Route>
                                    <Route path='/about' element={<About />}></Route>
                                </Routes>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
