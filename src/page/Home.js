import React, { Component, PropTypes } from "react";
import connectWithActions from "../redux/connectWithActions";
import "./index.less";

class HomePage extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  static defaultProps = {
    content: "aaa222测222试2"
  };

  componentDidMount() {
    this.renderaa();
  }

  renderaa() {
    console.log(2);
  }

  render() {
    return <div className="testdiv">{this.props.content +" 2222 2aaa2"}</div>;
  }
}

export default connectWithActions((state, props) => ({}))(HomePage);
