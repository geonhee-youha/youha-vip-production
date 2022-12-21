import _ from "lodash";
import createCache from "@emotion/cache";
export function createEmotionCache() {
  return createCache({ key: "css" });
}
export function getIsEmail(value: string | null) {
  if (typeof value !== "string") return false;
  var regExp =
    /^([\w\.\_\-])*[a-zA-Z0-9]+([\w\.\_\-])*([a-zA-Z0-9])+([\w\.\_\-])+@(([a-zA-Z0-9])+([\w\.\_\-])+\.)+[a-zA-Z0-9]{2,8}$/;
  return regExp.test(value);
}

export const comma = (number: number) => {
  var num, len, point, str;
  num = `${number}`;
  point = num.length % 3;
  len = num.length;
  str = num.substring(0, point);
  while (point < len) {
    if (str != "") str += ",";
    str += num.substring(point, point + 3);
    point += 3;
  }
  return str;
};