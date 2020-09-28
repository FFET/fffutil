/**
 * mobile platfrom
 *
 * @author Jay
 * @since 0.0.1
 * @returns {string} Returns the mobile platform.
 * @example
 *
 * mobilePlatfrom()
 * // =>  ios
 */
function mobilePlatfrom() {
  const u = navigator.userAgent;
  const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  const isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android
  if (isiOS) {
    return "ios";
  } else if (isAndroid) {
    return "android";
  }
}
