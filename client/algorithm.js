<<<<<<< HEAD
function createNode(data=null, next=null, prev=null) {
  return {
    data,
    next,
    prev
  }
=======
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>

<script>
function createNode(data=null, status=null, next=null, prev=null) {
  return {
    data,
    status,
    next,
    prev
  };
>>>>>>> master
}

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
  }

<<<<<<< HEAD
  enqueue(data) {
    const node = createNode(data);
=======
  enqueue(data, status) {
    const node = createNode(data, status);
    console.log(node);
>>>>>>> master

    if (this.last) {
      node.next = this.last;
      this.last.prev = node;
    }

    this.last = node;

    if (this.first === null) {
<<<<<<< HEAD
      this.first = node;
    }
  }

  dequeue() {
=======
      // console.log('This is the node enqueue node:', node);
      this.first = node;
    }
  }
  requeue(data, status) {
    const node = createNode(data, status);
    if(this.last) {
      node.next = this.last;
      this.last.prev = node;
    }
    this.last = node;
    if(this.first === null) {
      this.first = node;
      console.log('This is the node:', node.data);
      node.data.prev = null;
    }
  }
  dequeue() {
    if(!this.first.status) {
      this.enqueue(this.first);
    }

    if(this.first.status) {
      const node = this.first;
      correct.requeue(this.first);
      // console.log('This is the correctly answered:', correct);
    }

>>>>>>> master
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
<<<<<<< HEAD
// valar, morghulis, sonaro, tubi, daor
let questions = new Queue();

questions.enqueue('valar');
=======

// valar, morghulis, sonaro, tubi, daor
let questions = new Queue();
let correct = new Queue();

questions.enqueue('valar', true);
>>>>>>> master
questions.enqueue('morghulis');
questions.enqueue('sonaro');
questions.enqueue('tubi');
questions.enqueue('daor');

<<<<<<< HEAD


questions.dequeue();
console.log(questions);
=======
questions.dequeue();
questions.dequeue();
questions.dequeue();
questions.dequeue();

// console.log('This is the current question queue:', questions);
console.log('This is the correct question queue:', correct);
</script>
</body>
</html>
>>>>>>> master
