export function bubbles(e) {
  var ev = e || window.event;
  if (ev && ev.stopPropagation) {
    //非ie浏览器
    ev.stopPropagation();
  } else {
    //IE浏览器(IE11以下)
    ev.cancelBubble = true;
  }
}

export function catchs(e) {
    
}
