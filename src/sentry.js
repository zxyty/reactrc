/* @flow */
import Raven from "raven-js";
import config from "./config";

if (config.enableSentry) {
  Raven.config(config.sentryKey).install();

  Raven.setRelease(config.appVersion);
}
