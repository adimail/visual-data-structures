const size = (head: SLHead) => {
  let headCopy = head;
  let count = 0;
  while (headCopy) {
    count++;
    headCopy = headCopy.next;
  }
  return count;
};

const push = (head: SLHead, setHead: SLSetHead, userInput: number) => {
  let headCopy = head;
  const newNode = {
    id: crypto.randomUUID(),
    value: userInput,
    next: null,
  };
  if (!headCopy) {
    setHead(newNode);
    return;
  }
  while (headCopy.next) headCopy = headCopy.next;
  headCopy.next = newNode;
  setHead({ ...(head as SLNode) });
};

const pop = (head: SLHead, setHead: SLSetHead) => {
  let headCopy = head;
  if (!headCopy) return;
  if (!headCopy.next) {
    setHead(null);
    return;
  }
  let prev: SLHead = null;
  while (headCopy.next) {
    prev = headCopy;
    headCopy = headCopy.next;
  }
  if (prev) prev.next = null;
  setHead({ ...(head as SLNode) });
};

const pushFront = (head: SLHead, setHead: SLSetHead, value: number) => {
  const newNode = {
    id: crypto.randomUUID(),
    value,
    next: head,
  };
  setHead(newNode);
};

const popFront = (head: SLHead, setHead: SLSetHead) => {
  if (!head) return;
  setHead(head.next);
};

const reverse = (head: SLHead) => {
  let headCopy = head;
  let [prev, next]: [SLHead, SLHead] = [null, null];
  while (headCopy) {
    next = headCopy.next;
    headCopy.next = prev;
    prev = headCopy;
    headCopy = next;
  }
  return prev;
};

const listToArray = (head: SLHead) => {
  let headCopy = head;
  const arr = [];
  while (headCopy) {
    arr.push({
      id: headCopy.id,
      value: headCopy.value,
      next: headCopy.next ? headCopy.next.value : null,
    });
    headCopy = headCopy.next;
  }
  return arr;
};

const removeElement = (head: SLHead, setHead: SLSetHead, value: number) => {
  let current = head;
  let prev = null;

  while (current !== null) {
    if (current.value === value) {
      if (prev === null) {
        setHead(current.next);
      } else {
        prev.next = current.next;
      }
      return;
    }
    prev = current;
    current = current.next;
  }
  console.error(`Element with value ${value} not found in the linked list.`);
};


const insertAfter = (head: SLHead, setHead: SLSetHead, targetValue: number, valueToInsert: number) => {
  let current = head;

  while (current !== null) {
    if (current.value === targetValue) {
      const newNode: SLNode = {
        id: crypto.randomUUID(),
        value: valueToInsert,
        next: current.next,
      };
      current.next = newNode;
      setHead(newNode);
      return;
    }
    current = current.next;
  }
  console.error(`Target element with value ${targetValue} not found in the linked list.`);
};

const getByIndexValue = (head: SLHead, index: number): number | null => {
  let current = head;
  let currentIndex = 0;

  while (current !== null) {
    if (currentIndex === index) {
      return current.value;
    }

    currentIndex++;
    current = current.next;
  }

  return null; // Return null if index is out of bounds
};



export { size, push, pop, pushFront, popFront, reverse, listToArray, removeElement, insertAfter, getByIndexValue };
