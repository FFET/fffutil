/**
 * @author Jay
 * @date 2020-08-26
 * @description index
 */

import foo2, { foo3 } from "./foo2";
import { deepClone } from "./deepClone";
import { getQueryString } from "./getQueryString";
import { generateUuid } from "./generateUuid";
import { base64toFile } from "./base64toFile";

/**
 * foo test
 *
 * @since 0.0.1
 * @param {string} str
 * @returns {string} Returns the string
 */
function foo(str) {
  return "foo " + str;
}

// export
export { foo, generateUuid, getQueryString, deepClone, base64toFile, foo2, foo3 };
