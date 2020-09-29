/**
 *
 * history lsit
 * @author cds
 * @since 0.0.1
 * @param {object} obj
 * @example
 * this.history = new HistoryList()
 * this.history.push(newList)
 */

/**
 * deepClone
 */
function deepClone(obj) {
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

class List {
  constructor(data) {
    this._data = deepClone(data);
    this._next = null;
    this._prev = null;
  }
  get prev() {
    return this._prev;
  }
  set prev(value) {
    this._prev = value;
  }
  get data() {
    return deepClone(this._data);
  }
  set data(value) {
    this._data = value;
  }
  get next() {
    return this._next;
  }
  set next(value) {
    this._next = value;
  }
}

// export default class HistoryList {
class HistoryList {
  //操作历史
  constructor(params) {
    this.head = null;
    this.current = null;
    this.size = 0;
    this.maxSize = params.maxSize;
  }
  isEmptyObj() {
    return this.size === 0;
  }
  getSize() {
    //获取历史层级
    let size = 0;
    let c = this.current;
    while (c) {
      size++;
      c = c.prev;
    }
    return size;
  }
  push(data) {
    let list = new List(data);
    if (!this.head) {
      this.head = list;
      this.current = list;
    } else {
      this.current.next = list;
      list.prev = this.current;
      this.current = list;
    }
    this.size = this.getSize();
    if (this.size > this.getSize()) {
      this.head = this.head.next;
    }
  }

  canBack() {
    //是否可以撤销
    return this.head && this.current !== this.head;
  }
  canForward() {
    //是否可以重做
    return this.current && this.current.next !== null;
  }
  back() {
    //撤销操作
    if (this.canBack()) {
      this.current = this.current.prev;
    } else {
      console.warn("can not go back");
    }
  }
  forward() {
    //重做操作
    if (this.canForward()) {
      this.current = this.current.next;
    } else {
      console.warn("can not go forward");
    }
  }
  getCurrent() {
    //获取当前对象
    return this.current.data;
  }
}
const historyList = new HistoryList({ maxSize: 100 });
