/**
 * get char length from string
 *
 * @author Jay
 * @since 0.0.1
 * @param {string} string
 * @returns {number} Returns the char length.
 * @example
 *
 * getStrLength("中国")
 * // =>  4
 */
export function getStrLength(str) {
  var i,
    sum = 0;
  for (i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) >= 0 && str.charCodeAt(i) <= 255) sum++;
    else sum += 2;
  }
  return sum;
}
