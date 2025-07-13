export default class Queue<T> {
  private _queue: T[] = [];

  constructor(items: T[] = []) {
    this._queue = items;
  }

  enqueue(item: T) {
    this._queue.push(item);
  }

  dequeue(): T | undefined {
    return this._queue.shift();
  }

  peek(): T | undefined {
    return this._queue[0];
  }

  get length() {
    return this._queue.length;
  }

  isEmpty() {
    return this._queue.length === 0;
  }

  clear() {
    this._queue = [];
  }

  toString() {
    return this._queue.toString();
  }
}
