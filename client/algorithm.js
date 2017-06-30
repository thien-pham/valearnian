function createNode(data=null, next=null, prev=null) {
  return {
    data,
    next,
    prev
  }
}

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
  }

  enqueue(data) {
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

  dequeue() {
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
// valar, morghulis, sonaro, tubi, daor
let questions = new Queue();

questions.enqueue('valar');
questions.enqueue('morghulis');
questions.enqueue('sonaro');
questions.enqueue('tubi');
questions.enqueue('daor');



questions.dequeue();
console.log(questions);
