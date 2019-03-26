import React from "react";
import { Route, Switch, withRouter, HashRouter } from "react-router-dom";
import Loadable from "react-loadable";

function loading() {
  return <div>Loading...</div>;
}

const HomePage = Loadable({
  loader: () => import("../page/index"),
  loading,
});

const Page404 = Loadable({
  loader: () => import("../page/404"),
  loading,
});

// 路由验证
// 可以在这一层做一步验证url权限
// 加上这个注解之后 即使该组件未被挂载在react-router上也可以使用react-router里的对象history等
@withRouter
class AuthRoute extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    // conponentDidMount 组件加载完成时触发
    // 如果没加这个注解你会发现打印history出来的是undefind
  }
  render() {
    return (
      <Switch>
        <Route path="/" component={HomePage} />
        <Route component={Page404} />
      </Switch>
    );
  }
}

export default store => {
  return (
    <HashRouter>
      {/* //这个组件就用来判断用户是否有相对的权限，跳转到什么页面，但是并没有挂载在路由上 按道理来说这个组件使用不了router的history对象 但是react-router-dom 给我们提供了一个注解@withRouter  */}
      <AuthRoute store={store} />
    </HashRouter>
  );
};

export function TestRouter({ children }) {
  return <HashRouter>{children}</HashRouter>;
}
