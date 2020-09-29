/**
 * 加法函数，用来得到精确的加法结果
 * 说明：Javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显
 * @param {Object} num1
 * @param {Object} num2
 */
export function floatCalcAddition(num1, num2) {
  var r1, r2, m;
  //获取小数位数
  try {
    r1 = num1.toString().split(".")[1].length;
  } catch (error) {
    r1 = 0;
  }

  try {
    r2 = num2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }

  m = Math.pow(10, Math.max(r1, r2));

  return (num1 * m + num2 * m) / m;
}

/**
 * 减法函数，用来得到精确的减法结果
 * @param {Object} num1
 * @param {Object} num2
 */
export function floatCalcSubtraction(num1, num2) {
  var r1, r2, m, n;
  //获取小数位数
  try {
    r1 = num1.toString().split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = num2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  //动态控制精度长度
  n = r1 >= r2 ? r1 : r2;
  return ((num1 * m - num2 * m) / m).toFixed(n);
}

/**
 * 乘法函数，用来得到精确的乘法结果
 * @param {Object} num1
 * @param {Object} num2
 */
export function floatCalcMultiplication(num1, num2) {
  var r1 = num1.toString(),
    r2 = num2.toString(),
    m = 0;
  try {
    m += r1.split(".")[1].length;
  } catch (e) {}
  try {
    m += r2.split(".")[1].length;
  } catch (e) {}
  return (Number(r1.replace(".", "")) * Number(r2.replace(".", ""))) / Math.pow(10, m);
}

/**
 * 除法函数，用来得到精确的除法结果
 * @param {Object} num1
 * @param {Object} num2
 */
export function floatCalcDivision(num1, num2) {
  var r1 = num1.toString(),
    r2 = num2.toString(),
    m,
    n;
  try {
    m = r1.split(".")[1].length;
  } catch (e) {
    m = 0;
  }
  try {
    n = r2.split(".")[1].length;
  } catch (e) {
    n = 0;
  }
  return floatCalcMultiplication(
    Number(r1.replace(".", "")) / Number(r2.replace(".", "")),
    Math.pow(10, n - m)
  );
}
