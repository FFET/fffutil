/**
 * deep clone
 *
 * @author Jay
 * @since 0.0.1
 * @param {object} obj
 * @returns {object} Returns new object.
 * @example
 *
 * deepClone(object)
 */
export function deepClone(obj) {
  if (obj === null) return null;
  let clone = Object.assign({}, obj);
  Object.keys(clone).forEach(
    (key) => (clone[key] = typeof obj[key] === "object" ? deepClone(obj[key]) : obj[key])
  );
  return Array.isArray(obj) && obj.length
    ? (clone.length = obj.length) && Array.from(clone)
    : Array.isArray(obj)
    ? Array.from(obj)
    : clone;
}
