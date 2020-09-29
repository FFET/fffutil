/**
 * date
 *
 * @author cds
 * @since 0.0.1
 * @param "String"
 * @returns "String" Returns String
 * @example
 * getDateBySplit(Date,string)
 */
function getDateBySplit(dates, split) {
  var _date = new Date(dates);
  var _yy = _date.getFullYear() + "";
  var _mm =
    _date.getMonth() + 1 < 10 ? "0" + (_date.getMonth() + 1 + "") : _date.getMonth() + 1 + "";
  var _dd = _date.getDate() < 10 ? "0" + _date.getDate() : _date.getDate() + "";
  if (!split) {
    return _yy + _mm + _dd;
  }
  return _yy + split + _mm + split + _dd;
}

/**
 * date format
 *
 * @author cds
 * @since 0.0.1
 * @param "String"
 * @returns "String" Returns String
 * getDateFormat.apply(obj,"yyyy-MM-dd hh:mm:ss qq S W")
 */
function getDateFormat(fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds(), //毫秒
    W: getWeek(),
  };
  function getWeek() {
    var weekDay = new Date().getDay();
    if (weekDay === 0) {
      return "星期日";
    } else if (weekDay === 1) {
      return "星期一";
    } else if (weekDay === 2) {
      return "星期二";
    } else if (weekDay === 3) {
      return "星期三";
    } else if (weekDay === 4) {
      return "星期四";
    } else if (weekDay === 5) {
      return "星期五";
    } else if (weekDay === 6) {
      return "星期六";
    }
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }
  return fmt;
}
