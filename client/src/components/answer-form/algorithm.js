function createNode (data = null, status = null, next = null, prev = null) {
  return {
    data,
    status,
    next,
    prev
  };
}

export default class Queue {
  constructor () {
    this.first = null;
    this.last = null;
  }

  enqueue (data) {
    const node = createNode(data);

    if (this.last) {
      node.next = this.last;
      this.last.prev = node;
    }

    this.last = node;

    if (this.first === null) {
      this.first = node;
    }
  }

  dequeue () {
    if (this.first === null) {
      return;
    }

    const node = this.first;
    this.first = node.prev;

    if (node === this.last) {
      this.last = null;
    }

    return node.data;
  }

  requeue () {
    if(this.first === null) {
      return;
    }

    const node = this.first;
    this.first = node.prev;

    if(node === this.last) {
      this.last === null;
    }

    this.last.prev = node;
    this.last = node;
    this.last.prev = null;

    return node.data;
}

function runqueue (queue) {
  if (!queue.first) {
    return;
  }
  return queue.data;
}

const queueA = new Queue();
const queueB = new Queue();
// console.log(queueA);
export default { queueA, queueB, requeue, runqueue };
