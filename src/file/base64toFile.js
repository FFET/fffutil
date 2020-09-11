/**
 * base64 to file
 *
 * @author Jay
 * @since 0.0.1
 * @returns {file} Returns the file.
 * @example
 *
 */
export const base64toFile = (dataurl, filename) => {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};
