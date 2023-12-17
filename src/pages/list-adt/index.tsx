import { motion } from "framer-motion";
import { AlgorithmNavigation } from "./AlgorithmNavigation";
import { useState, useRef, useEffect } from "react";
import {
  pop,
  push,
  pushFront,
  popFront,
  reverse,
  removeElement,
  insertAfter,
  getByIndexValue,
} from "./algorithms";
import { ListADTStack, ListADTQueue } from "./listadt";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

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

const ListADT = () => {
  const [listType, setListType] = useState<"Stack" | "Queue">("Stack");
  const [showAlgorithmNavigation, setShowAlgorithmNavigation] = useState(true);
  const [userInput, setUserInput] = useState<string>("");
  const [insertValue, setInsertValue] = useState<number | undefined>(undefined);
  const [removeValue, setRemoveValue] = useState<number | undefined>(undefined);
  const [randomValue, setRandomValue] = useState<number | undefined>(undefined);
  const [size, setSize] = useState<number>(0);

  const [head, setHead] = useState<SLHead>(initialHead);
  const targetValueInputRef = useRef<HTMLInputElement>(null);
  const valueToInsertInputRef = useRef<HTMLInputElement>(null);

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

  const handleAddRandomNumber = () => {
    const randomValue = Math.floor(Math.random() * 30) + 1;
    pushFront(head, setHead, randomValue);
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

  const handleEnqueue = () => {
    const inputValue = parseInt(userInput, 10);
    if (!isNaN(inputValue)) {
      console.log("Enque operation called");
    } else {
      console.error("Invalid input. Please enter a valid number.");
    }
  };

  const handleDequeue = () => {
    const inputValue = parseInt(userInput, 10);
    if (!isNaN(inputValue)) {
      console.log("Deque operation called");
    } else {
      console.error("Invalid input. Please enter a valid number.");
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

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: [0.68, -0.55, 0.27, 1.55] }}
    >
      <h5>List ADT - Abstract Data Type</h5>
      <hr />

      <div className="d-flex col-12">
        <div className={`col-${showAlgorithmNavigation ? "10" : "12"} gap-3`}>
          <div className="d-flex justify-content-between">
            <p className="d-flex gap-5">
              <div>
                {size === 0 ? (
                  <>
                    Data structure is empty.
                    <br />
                    Add elements using the control panel to the right of the
                    page.
                    <br />
                    Max Size: 8 Elements
                  </>
                ) : (
                  <div>
                    <p>Maximum Size: 8 Elements</p>
                    <p>
                      Size of the {listType}: {size}
                    </p>
                  </div>
                )}
              </div>

              {listType === "Stack" ? (
                `Top: ${getByIndexValue(head, 0) ?? "Null Pointer"}`
              ) : (
                <div>
                  <p>
                    Front: {getByIndexValue(head, size - 1) ?? "Null Pointer"}
                  </p>
                  <p>Rear: {getByIndexValue(head, 0) ?? "Null Pointer"}</p>
                </div>
              )}

              <p>
                {size === 8 && (
                  <>
                    <strong>Maximum size reached</strong>
                  </>
                )}
              </p>
            </p>

            <button
              className="gap-3 align-items-center d-flex btn"
              onClick={() =>
                setShowAlgorithmNavigation((prevState) => !prevState)
              }
              style={{ height: "fit-content" }}
            >
              {!showAlgorithmNavigation && <FaArrowLeft />}
              {showAlgorithmNavigation && <FaArrowRight />}
            </button>
          </div>
          <div className="container d-flex aligh-items-center justify-content-center">
            {listType === "Stack" && <ListADTStack head={head} />}
            {listType === "Queue" && <ListADTQueue head={head} />}
          </div>
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
              onInsertAfter={handleInsertAfter}
              userInput={userInput}
              setUserInput={setUserInput}
              onEnqueue={handleEnqueue}
              onDequeue={handleDequeue}
              listType={listType}
              setListType={setListType}
              size={size}
              addrand={handleAddRandomNumber}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ListADT;
