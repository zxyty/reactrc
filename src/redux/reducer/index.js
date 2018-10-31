/* @flow */
import { combineReducers } from "redux";
import { enableBatching } from "redux-batched-actions";
import { routerReducer as routing } from "react-router-redux";
import { logSlowReducers } from "../../utils/redux";

import config from "../../config";
import { settings } from "./settingsReducer";

const reducers = {
  routing,
  settings
};

export default enableBatching(
  combineReducers(
    config.enableReduxSlowReducerWarnings ? logSlowReducers(reducers) : reducers
  )
);
