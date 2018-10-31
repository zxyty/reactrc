/* @flow */
import { createLogger } from "redux-logger";
import config from "../config";

let logger = null;
if (config.enableReduxLogging) {
  logger = createLogger({
    duration: true
    // predicate: (getState, action) => action.type === 'MESSAGE_FETCH_COMPLETE',
  });
}
export default logger;
