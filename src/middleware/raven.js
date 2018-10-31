/* @flow */
import RavenMiddleware from "redux-raven-middleware";
import config from "../config";

let raven = null;
if (config.enableSentry) {
  raven = RavenMiddleware(config.sentryKey);
}
export default raven;
