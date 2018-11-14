import React, { Component, PropTypes } from "react";
import connectWithActions from "../redux/connectWithActions";
import "./index.less";

class HomePage extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  static defaultProps = {
    content: "测试2"
  };

  componentDidMount() {
    this.renderaa();
  }

  renderaa() {
    console.log(2);
  }

  render() {
    return <div className="testdiv">{this.props.content +" 2 222"}</div>;
  }
}

export default connectWithActions((state, props) => ({}))(HomePage);
