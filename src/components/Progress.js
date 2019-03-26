import React from "react";
import NProgress from "nprogress";
import { connect } from "react-redux";

@connect(({ loading }) => ({ loading }))
export default class Progress extends React.Component {
  constructor(props) {
    super(props);
    this.loading = false;
  }
  render() {
    const { loading } = this.props;
    if (loading.global && !this.loading) {
      NProgress.start();
      this.loading = true;
    } else {
      NProgress.done();
      this.loading = false;
    }
    return null;
  }
}
