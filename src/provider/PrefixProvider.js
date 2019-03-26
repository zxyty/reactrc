import { Children, Component } from "react";
import PropTypes from "prop-types";

export default class PrefixProvider extends Component {
  getChildContext() {
    return {
      cssPrefix: "cp",
    };
  }
  render() {
    return Children.only(this.props.children);
  }
}

PrefixProvider.childContextTypes = {
  cssPrefix: PropTypes.string,
};
