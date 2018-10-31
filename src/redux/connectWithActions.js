/* @noflow */
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as actions from "./action";

let cachedBoundActions;

const boundActions = (dispatch, ownProps) => {
  if (!cachedBoundActions) {
    cachedBoundActions = {
      dispatch,
      actions: bindActionCreators(actions, dispatch)
    };
  }

  return cachedBoundActions;
};

const connectWithActions = (
  mapStateToProps,
  mergeProps,
  options
) => component =>
  connect(
    mapStateToProps,
    boundActions,
    mergeProps,
    options
  )(component);

export default connectWithActions;
