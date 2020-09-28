/**
 * browser generate uuid
 *
 * @author Jay
 * @since 0.0.1
 * @returns {string} Returns the uuid.
 * @example
 *
 * generateUuid()
 * // =>  "17b27137-e255-4666-bfc7-8a225e0451ab"
 */
export function generateUuid() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
  );
}
