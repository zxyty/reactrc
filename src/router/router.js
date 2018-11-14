import React, { Component, PropTypes } from "react";
import {
  Router,
  Route,
  Switch,
  withRouter
} from "react-router-dom";
import { createBrowserHistory, createHashHistory } from "history";
import config from "../config";

// 默认导入首页
import Home from "../page/Home";

// 路由验证
// 可以在这一层做一步验证url权限
// 加上这个注解之后 及时该组件未被挂载在react-router上也可以使用react-router里的对象history等
@withRouter
class AuthRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasChecked: false
    };
  }
  componentWillMount() {
    // conponentDidMount 组件加载完成时触发
    // 如果没加这个注解你会发现答应出来的是undefind
    // console.log(this.props.history);
    if (
      this.props.history.location.pathname == "/" ||
      this.props.history.location.pathname == "/home/list"
    ) {
      this.state.hasChecked = true;
    } else {
      this.state.hasChecked = false;
    }
  }
  render() {
    if (this.state.hasChecked) {
      return (
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/home" component={Home}>
            <Route path="/list" component={Home} />
          </Route>
        </Switch>
      );
    } else {
      return <div>没有权限</div>;
    }
    // 处理404
  }
}

// 生产环境中浏览器历史这里统一使用hashHistory 不使用browserHistory
export default store => {
  let history = config.isDev ? createBrowserHistory() : createHashHistory();
  return (
    <Router history={history}>
      {/* //这个组件就用来判断用户是否有相对的权限，跳转到什么页面，但是并没有挂载在路由上 按道理来说这个组件使用不了router的history对象 但是react-router-dom 给我们提供了一个注解@withRouter  */}
      <AuthRoute store={store} />
    </Router>
  );
};
