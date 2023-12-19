import { motion } from "framer-motion";
import { AlgorithmNavigation } from "./AlgorithmNavigation";
import { useState, useRef, useEffect } from "react";
import { Button } from "react-bootstrap";
import {
  pop,
  push,
  pushFront,
  popFront,
  reverse,
  removeElement,
  insertAfter,
} from "./algorithms";
import LinkedListComponent from "./LinkedList";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import CodeModal from "../../components/COdeModal";
import { cppFileText, pyFileText } from "./files";

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

export const LinkedListPage = () => {
  const [showAlgorithmNavigation, setShowAlgorithmNavigation] = useState(true);
  const [userInput, setUserInput] = useState<string>("");
  const [insertValue, setInsertValue] = useState<number | undefined>(undefined);
  const [removeValue, setRemoveValue] = useState<number | undefined>(undefined);
  const [randomValue, setRandomValue] = useState<number | undefined>(undefined);
  const [size, setSize] = useState<number>(0);

  const [head, setHead] = useState<SLHead>(initialHead);
  const targetValueInputRef = useRef<HTMLInputElement>(null);
  const valueToInsertInputRef = useRef<HTMLInputElement>(null);
  const [CodeModalShow, setCodeModalShow] = useState(false);

  const handleModalClose = () => setCodeModalShow(false);
  const handleCodeModalShow = () => setCodeModalShow(true);

  const calculateSize = (head: SLHead): number => {
    let headCopy = head;
    let count = 0;
    while (headCopy) {
      count++;
      headCopy = headCopy.next;
    }
    return count;
  };

  const updateSize = () => {
    const newSize = calculateSize(head);
    setSize(newSize);
  };

  useEffect(() => {
    updateSize();
  }, [head]);

  const handlePush = () => {
    const inputValue = parseInt(userInput, 10);
    if (!isNaN(inputValue)) {
      push(head, setHead, inputValue);
    } else {
      console.error("Invalid input. Please enter a valid number.");
    }
  };

  const handlePop = () => {
    pop(head, setHead);
  };

  const handlePushFront = () => {
    const inputValue = parseInt(userInput, 10);

    if (!isNaN(inputValue)) {
      pushFront(head, setHead, inputValue);
    } else {
      console.error("Invalid input. Please enter a valid number.");
    }
  };

  const handleRemove = () => {
    const inputValue = parseInt(userInput, 10);
    if (!isNaN(inputValue)) {
      removeElement(head, setHead, inputValue);
    } else {
      console.error("Invalid input. Please enter a valid number.");
    }
  };

  const handleInsertAfter = () => {
    const targetValue = targetValueInputRef.current?.value;
    const valueToInsert = valueToInsertInputRef.current?.value;

    if (targetValue !== undefined && valueToInsert !== undefined) {
      const parsedTargetValue = parseFloat(targetValue);
      const parsedValueToInsert = parseFloat(valueToInsert);

      if (!isNaN(parsedTargetValue) && !isNaN(parsedValueToInsert)) {
        handleInsertAfterInternal(parsedTargetValue, parsedValueToInsert);
      } else {
        console.error("Invalid input. Please enter valid numbers.");
      }
    } else {
      console.error("Invalid input. Please enter valid numbers.");
    }
  };

  const handleInsertAfterInternal = (
    targetValue: number,
    valueToInsert: number
  ) => {
    if (!isNaN(targetValue) && !isNaN(valueToInsert)) {
      insertAfter(head, setHead, targetValue, valueToInsert);
    } else {
      console.error("Invalid input. Please enter valid numbers.");
    }
  };

  const handlePopFront = () => {
    popFront(head, setHead);
  };

  const handleReverse = () => {
    setHead(reverse(head));
  };

  const handleClear = () => {
    setHead(null);
  };

  const handleAddMultipleValues = (values: number[]) => {
    values.forEach((value) => {
      push(head, setHead, value);
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: [0.68, -0.55, 0.27, 1.55] }}
    >
      <div className="d-flex justify-content-between">
        <h5>Linked List</h5>
        <Button
          onClick={handleCodeModalShow}
          style={{
            textAlign: "center",
            padding: "0",
            paddingLeft: "10px",
            paddingRight: "10px",
            height: "30px",
            borderRadius: "20px",
            border: "none",
            margin: "0",
          }}
        >
          View code
        </Button>
      </div>
      <hr />
      <div className="d-flex col-12">
        <div
          className={`col-${showAlgorithmNavigation ? "10" : "12"}`}
          style={{ height: "20vw" }}
        >
          <div className="d-flex justify-content-between">
            <p>Size of the Linked List: {size}</p>
            <div className="d-flex gap-3">
              <CodeModal
                title="Linked List"
                show={CodeModalShow}
                handleClose={handleModalClose}
                cppFile={cppFileText}
                pyFile={pyFileText}
              />
              <button
                className="gap-3 align-items-center d-flex btn"
                onClick={() =>
                  setShowAlgorithmNavigation((prevState) => !prevState)
                }
              >
                {!showAlgorithmNavigation && <FaArrowLeft />}
                Toggle Sidebar
                {showAlgorithmNavigation && <FaArrowRight />}
              </button>
            </div>
          </div>
          <LinkedListComponent head={head} />
        </div>

        {showAlgorithmNavigation && (
          <div
            className="mw-30 col-2"
            style={{ maxWidth: "400px", minWidth: "150px" }}
          >
            <AlgorithmNavigation
              head={head}
              setHead={setHead}
              insertValue={insertValue}
              setInsertValue={setInsertValue}
              removeValue={removeValue}
              setRemoveValue={setRemoveValue}
              randomValue={randomValue}
              setRandomValue={setRandomValue}
              onPush={handlePush}
              onPop={handlePop}
              onRemove={handleRemove}
              onPushFront={handlePushFront}
              onPopFront={handlePopFront}
              onReverse={handleReverse}
              onClear={handleClear}
              onAddMultipleValues={handleAddMultipleValues}
              onInsertAfter={handleInsertAfter}
              userInput={userInput}
              setUserInput={setUserInput}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
};
