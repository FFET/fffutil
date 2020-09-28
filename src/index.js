/**
 * @author Jay
 * @date 2020-08-26
 * @description index
 */

import foo2, { foo3 } from "./foo2";
import { deepClone } from "./deepClone";
import { getQueryString } from "./getQueryString";
import { generateUuid } from "./generateUuid";
import { base64toFile } from "./file/base64toFile";
import { urlToBase64 } from "./file/urlToBase64";
import { download } from "./download";
import { getStrLength } from "./string";
import { waterMark } from "./waterMark";

/**
 * foo test
 *x
 * @since 0.0.1
 * @param {string} str
 * @returns {string} Returns the string
 */
function foo(str) {
  return "foo " + str;
}

// export
export {
  foo,
  generateUuid,
  getQueryString,
  deepClone,
  base64toFile,
  urlToBase64,
  download,
  getStrLength,
  waterMark,
  foo2,
  foo3,
};
