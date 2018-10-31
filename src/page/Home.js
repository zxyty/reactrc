import React, { Component, PropTypes } from "react";
import connectWithActions from "../redux/connectWithActions";
import './index.less'

class HomePage extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  };
  componentDidMount() {
    
  }

  render() {
    return (
        <div className="testdiv">
            jjjj
        </div>
    );
  }
}

export default connectWithActions((state, props) => ({
}))(HomePage)
