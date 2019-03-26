/* @flow */
const isRelease = __ENV__ === "development" ? false : true;

type Config = {
  isDev: boolean,
  appVersion: string,

  enableSentry: boolean,
  sentryKey: string,

  enableStoreCachce: boolean,
  storeKeys: string[],
  cacheKeys: string[],

  aMapKey: string,
};

const config: Config = {
  isDev: isRelease ? false : true, //false, //isDevelopment,
  appVersion: "0.0.1",

  enableSentry: isRelease,
  sentryKey: "", // HOSTS.SENTRYKEY,

  enableStoreCachce: isRelease,
  storeKeys: [],
  cacheKeys: [],
};

export default config;
