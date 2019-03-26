import React from "react";
import Notifications from "react-notify-toast";
import Progress from "../components/Progress";
import "./index.less";

export default class LayoutIndex extends React.PureComponent {
  render() {
    return (
      <div>
        <Progress />
        <Notifications />
        {this.props.children}
      </div>
    );
  }
}
