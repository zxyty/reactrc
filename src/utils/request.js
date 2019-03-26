import timingFetch from "./timingFetch";
import { handleError } from "./error";
import { APIPREFIX } from "../host";

export default function request(url = "", params = {}, method = "GET") {
  // api前缀处理
  let requestUrl = url;
  if (url.indexOf("http") < 0) {
    requestUrl = APIPREFIX + url;
  }
  // 这里进行header的处理
  // 从缓存里取用户token等信息
  const headers = {
    "content-type": "application/json",
    // 其他 如token等
  };

  let body = method !== "GET" && method !== "DELETE" ? JSON.stringify(params) : null;
  return timingFetch(requestUrl, { body, method, headers })
    .then(response => response.json())
    .then(res => {
      // 兼容mock的写法
      // 后期优化
      return new Promise((resolve, reject) => {
        return resolve(res);
      });
    })
    .catch(handleError);
}
