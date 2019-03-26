import config from "./config";

const PRODUCTION = !config.isDev;

// api 接口地址
const HOST_P = "http://localhost"; // production
const HOST_D = "http://localhost"; // dev

// api 端口地址
const PORT_P = "80"; // production
const PORT_D = "80"; // dev

export const HOST = __MOCK__ ? __MOCK__.host : PRODUCTION ? HOST_P : HOST_D;
export const PORT = __MOCK__ ? __MOCK__.port : PRODUCTION ? PORT_P : PORT_D;
export const APIPREFIX = PORT === "80" ? HOST : `${HOST}:${PORT}`;
