/**
 * url to base64
 *
 * @author Jay
 * @since 0.0.1
 * @returns {string} Returns the base64.
 * @example
 *
 * urlToBase64("http://jay.shanghaim.net/11.jpg");
 */
export function urlToBase64(url) {
  const img = new Image();
  img.src = url;
  img.crossOrigin = "*";
  img.onload = function () {
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);
    const base64 = canvas.toDataURL("image/png");
    return base64;
  };
}
