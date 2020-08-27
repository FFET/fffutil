/**
 * get value from url by key
 *
 * @since 0.0.1
 * @param {string} name key
 * @returns {string} Returns the value.
 * @example
 *
 * url "https://xxx.com?name=jay"
 * getQueryString('name')
 * // =>  jay
 */
export function getQueryString(name) {
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  let str = window.location.search || window.location.hash;
  let r = str.substr(str.indexOf("?") + 1).match(reg);
  if (r != null) return decodeURIComponent(r[2]);
  return "";
}
