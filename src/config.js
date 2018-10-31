/* @flow */
const isRelease = __ENV__ == 'development' ? false : true;

type Config = {
  isDev: boolean,
  appVersion: string,

  enableReduxLogging: boolean,
  enableReduxSlowReducerWarnings: boolean,
  enableSentry: boolean,

  slowReducersThreshold: number,
  sentryKey: string,
  enableErrorConsoleLogging: boolean,

  enableStoreCachce: boolean,
  storeKeys: string[],
  cacheKeys: string[]
};

const config: Config = {
  isDev: isRelease ? false : true, //false, //isDevelopment,
  appVersion: "0.0.1",

  enableReduxLogging: !isRelease,
  enableReduxSlowReducerWarnings: !isRelease,
  enableSentry: isRelease,

  slowReducersThreshold: 5,
  sentryKey: "http://c314bd42c10f4944a9397af41b2997ec@sentry.zxyty.com/6", // HOSTS.SENTRYKEY,
  enableErrorConsoleLogging: isRelease,

  enableStoreCachce: isRelease,
  storeKeys: ["settings"],
  cacheKeys: []
};

export default config;
