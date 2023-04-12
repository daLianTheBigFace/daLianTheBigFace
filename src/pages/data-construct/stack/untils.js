// 栈构造函数
const lists = new WeakMap();
export class Stack {
  constructor() {
    this.count = 0;
    lists.set(this, {});
    this.list = lists.get(this);
  }
  push(value) {
    if (value) {
      this.list[this.count] = value;
      this.count++;
    }
  } // 入栈
  pop() {
    if (this.isEmpty()) {
      return undefined;
    }
    this.count -= 1;
    const res = this.list[this.count];
    delete this.list[this.count];
    return res;
  } // 出栈
  isEmpty() {
    return this.count === 0;
  }
  peek() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.list[this.count - 1];
  }
  clear() {
    this.count = 0;
    this.list = {};
  }
}
