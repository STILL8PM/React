# React 路由

## 相关理解

### SPA 的理解

    单页Web应用（single page web application,SPA)
    整个应用只有一个完整的页面
    点击页面中的链接不会刷新页面，只会做页面的局部更新
    数据都需要通过 ajax 请求获取, 并在前端异步展现

### 路由的理解

    什么是路由？
        一个路由就是一个映射关系(key:value)
        key 为路径, value 可能是 function 或 component

### 路由的分类

    后端路由：
        理解： value 是 function, 用来处理客户端提交的请求
        注册路由：App.get(path, function(req, res))
        工作过程：当 node 接收到一个请求时，根据请求路径找到匹配的路由，调用路由中的函数来处理请求, 返回响应数据

    前端路由：
        浏览器端路由，value 是 component，用于展示页面内容
        注册路由: <Route path="/test" component={Test}>
        工作过程：当浏览器的 path 变为/test 时，当前路由组件就会变为 Test 组件

### react-router-dom 的理解

    react的一个插件库
    专门用来实现一个SPA应用
    基于react的项目基本都会用到此库

## react-router-dom 相关 API

### 内置组件

        <BrowserRouter>
        <HashRouter>
        <Route>
        <Redirect>
        <Link>
        <NavLink>
        <Switch>

### 其他
