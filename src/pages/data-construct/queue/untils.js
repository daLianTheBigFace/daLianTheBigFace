import { Stack } from "../stack/untils";
// 队
export class Queue {
  constructor() {
    this.count = 0;
    this.firstCount = 0;
    this.items = {};
  }
  enqueue(value) {
    if (value) {
      this.items[this.count] = value;
      this.count += 1;
    }
  }
  dequeue() {
    if (this.isEmpty()) {
      return undefined;
    }
    const res = this.items[this.firstCount];
    delete this.items[this.firstCount];
    this.firstCount += 1;
    return res;
  }
  dPeek() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.firstCount];
  }
  size() {
    return this.count - this.firstCount;
  }
  isEmpty() {
    return this.count - this.firstCount === 0;
  }
}
// 双向队
export class Dqueue extends Queue {
  constructor() {
    super();
    this.addBack = this.enqueue;
    this.removeFront = this.dequeue;
    this.peekFront = this.dPeek;
  }
  removeBack() {
    if (this.isEmpty()) {
      return undefined;
    }
    this.count -= 1;
    const res = this.items[this.count];
    delete this.items[this.count];
    return res;
  }
  peekBack() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.count - 1];
  }
}
