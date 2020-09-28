/**
 * download by url
 *
 * @author Jay
 * @since 0.0.1
 * @param {string} url
 * @returns {string} Returns the uuid.
 * @example
 *
 * downLoad(url)
 */
export function download(url) {
  const element = document.createElement("a");
  element.download = new Date().getTime();
  element.href = url;
  element.click();
}
