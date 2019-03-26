import request from "@utils/request";
import { qsParams } from "@utils";

const service = path => {
  return {
    list(params) {
      return request(path + qsParams(params));
    },
    one({ id, ...params }) {
      return request(`${path}/${id}${qsParams(params)}`);
    },
    create(params) {
      return request(path, params, "POST");
    },
    update({ id, ...params }) {
      return request(`${path}/${id}`, params, "PUT");
    },
    remove({ id }) {
      return request(`${path}/${id}`, null, "DELETE");
    },
  };
};
export default service;
