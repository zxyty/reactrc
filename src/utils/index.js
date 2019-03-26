import qs from "qs";

export function qsParams(data, tag) {
  const params = qs.stringify(data);
  return params ? `${tag ? "&" : "?"}${params}` : "";
}
