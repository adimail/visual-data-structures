import { motion } from "framer-motion";
import { AlgorithmNavigation } from "./AlgorithmNavigation";
import { useState } from "react";
import { pop, push, pushFront, popFront, reverse, size } from "./algorithms";
import LinkedListComponent from "./LinkedList";

const initialHead: SLHead = {
  id: "1",
  value: 1,
  next: null,
};

type SLNode = {
  id: string;
  value: number;
  next: SLNode | null;
};
type SLHead = SLNode | null;

const LinkedList = () => {
  const [head, setHead] = useState<SLHead>(initialHead);

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: [0.68, -0.55, 0.27, 1.55] }}
    >
      <h5>Linked List</h5>
      <hr />
      <div className="d-flex col-12">
        <div className="col-10">
          {/* <p>
            A linked list is a linear data structure where elements are stored
            in nodes, and each node points to the next node in the sequence.
            Unlike arrays, linked lists dynamically allocate memory for
            elements, allowing for efficient insertions and deletions. However,
            random access is less efficient compared to arrays. Types of linked
            lists include singly linked lists and doubly linked lists.
          </p> */}
          <nav className="gap-2 d-flex flex-row">
            <button
              className="btn btn-secondary"
              onClick={() => push(head, setHead, size(head) + 1)}
            >
              Push
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => pop(head, setHead)}
            >
              Pop
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => pushFront(head, setHead, size(head) - 1)}
            >
              Push Start
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => popFront(head, setHead)}
            >
              Pop Start
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setHead(reverse(head))}
            >
              Reverse
            </button>
            <button className="btn btn-secondary" onClick={() => setHead(null)}>
              Clear
            </button>
          </nav>
          <LinkedListComponent head={head} />
        </div>
        <div
          className="mw-30 col-2"
          style={{ maxWidth: "400px", minWidth: "150px" }}
        >
          <AlgorithmNavigation />
        </div>
      </div>
    </motion.div>
  );
};

export default LinkedList;
