import React from "react";
import Notifications from "react-notify-toast";
import Progress from "../components/Progress";
import "./index.less";

export default class LayoutIndex extends React.PureComponent {
  render() {
    return (
      <div>
        <Notifications />
        {this.props.children}
        <Progress />
      </div>
    );
  }
}
