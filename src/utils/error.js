import * as ErrorType from "@constants/error";
import { notify } from "react-notify-toast";

export function handleError(error) {
  const ErrorKeys = Object.keys(ErrorType);
  let isMatched = false;
  for (let i = 0; i < ErrorKeys.length; i++) {
    if (ErrorType[ErrorKeys[i]].message === error.message) {
      isMatched = true;
      break;
    }
  }
  if (!isMatched) {
    console.log(`未知错误: \`${error.errMsg}\``);
  }
  notify.show(error.message || error.errMsg, "warning", 2000);
  return {
    message: error.message || error.errMsg,
    success: false,
  };
}
