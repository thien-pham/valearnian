function createNode (data = null, status = null, next = null, prev = null) {
  return {
    data,
    status,
    next,
    prev
  };
}

class Queue {
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
}

function requeue (queue, data) {
  const node = createNode(data);
  if (queue.last) {
    node.next = queue.last;
    queue.last.prev = node;
  }
  queue.last = node;
  if (queue.first === null) {
    queue.first = node;
    node.data.prev = null;
  }
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
