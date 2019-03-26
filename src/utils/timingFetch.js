import { ERROR_REQUEST_TIMEOUT } from "../constants/error";
/**
 * 带了超时的fetch
 */
const timingFetch = (function() {
  return function(url, params) {
    let abort = null;

    const abortPromise = new Promise((resolve, reject) => {
      abort = () => {
        reject(new Error(ERROR_REQUEST_TIMEOUT.message));
      };
    });
    // 通过promise.race抛弃跑得慢的
    const promise = Promise.race([fetch(url, params), abortPromise]);

    promise.abort = abort;

    setTimeout(abort, 12000); // 12s

    return promise;
  };
})();
export default timingFetch;
