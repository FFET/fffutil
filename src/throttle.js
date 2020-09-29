export function throttle(fn, delay) {
  var ctx, args;
  var previous = Date.now();
  var later = function () {
    fn.apply(ctx, args);
  };
  return function () {
    ctx = this;
    args = arguments;
    var now = Date.now();
    //本次触发事件与上一次的时间比较
    var diff = now - previous - delay;

    //如果间隔时间超过设定时间,即再次设置事件触发的定时器
    if (diff > 0) {
      //更新最近事件触发的时间
      previous = now;
      setTimeout(later, delay);
    }
  };
}
