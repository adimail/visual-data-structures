import { useEffect, useRef } from "react";
import { Tooltip, InfoTooltip } from "../../components/tooltip";

interface AlgorithmNavigationProps {
  head: SLHead;
  setHead: React.Dispatch<React.SetStateAction<SLHead>>;
  insertValue: number | undefined;
  setInsertValue: React.Dispatch<React.SetStateAction<number | undefined>>;
  removeValue: number | undefined;
  setRemoveValue: React.Dispatch<React.SetStateAction<number | undefined>>;
  randomValue: number | undefined;
  setRandomValue: React.Dispatch<React.SetStateAction<number | undefined>>;
  onPush: () => void;
  onPop: () => void;
  onPushFront: () => void;
  onPopFront: () => void;
  onReverse: () => void;
  onClear: () => void;
  onRemove: () => void;
  onInsertAfter: (targetValue: number, valueToInsert: number) => void;
  userInput: string;
  setUserInput: React.Dispatch<React.SetStateAction<string>>;
  onAddMultipleValues: (values: number[]) => void;
}

export function AlgorithmNavigation({
  onPush,
  onPop,
  onPushFront,
  onPopFront,
  onReverse,
  onInsertAfter,
  onClear,
  userInput,
  setUserInput,
  onRemove,
  onAddMultipleValues,
}: AlgorithmNavigationProps) {
  const targetValueInputRef = useRef<HTMLInputElement>(null);
  const valueToInsertInputRef = useRef<HTMLInputElement>(null);
  const arrayInputRef = useRef<HTMLInputElement>(null);

  const handleAddMultipleValues = () => {
    const arrayInput = arrayInputRef.current?.value;

    if (arrayInput) {
      const valuesArray = arrayInput
        .split(",")
        .map((value) => parseFloat(value.trim()));

      if (valuesArray.every((value) => !isNaN(value))) {
        onAddMultipleValues(valuesArray);
      } else {
        console.error(
          "Invalid input. Please enter valid numbers separated by commas."
        );
      }
    } else {
      console.error(
        "Invalid input. Please enter valid numbers separated by commas."
      );
    }
  };

  const handleInsertAfter = () => {
    const targetValue = targetValueInputRef.current?.value;
    const valueToInsert = valueToInsertInputRef.current?.value;

    if (targetValue !== undefined && valueToInsert !== undefined) {
      const parsedTargetValue = parseFloat(targetValue);
      const parsedValueToInsert = parseFloat(valueToInsert);

      if (!isNaN(parsedTargetValue) && !isNaN(parsedValueToInsert)) {
        onInsertAfter(parsedTargetValue, parsedValueToInsert);
      } else {
        console.error("Invalid input. Please enter valid numbers.");
      }
    } else {
      console.error("Invalid input. Please enter valid numbers.");
    }
  };

  useEffect(() => {
    var tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new Tooltip(tooltipTriggerEl);
    });

    return () => {
      tooltipList.forEach((tooltip) => tooltip.dispose());
    };
  }, []);

  return (
    <div className="gap-2 d-flex flex-column justify-content-center">
      <div className="d-flex">
        <div className="input-group">
          <button type="button" className="btn btn-warning border border-dark">
            Type
          </button>
          <select
            className="border border-black form-select"
            id="inputGroupSelect01"
            disabled
          >
            <option value="singly-ll">Singly</option>
            <option value="doubly-ll">Doubly</option>
            <option value="circular-ll">Circular</option>
          </select>
        </div>
        <InfoTooltip text="Select the type of linked list you would like to construct" />
      </div>
      <hr />
      <nav className="gap-2 d-flex flex-column">
        <div className="input-group w-80">
          <button
            type="button"
            className="w-50 btn btn-secondary border border-dark"
            onClick={handleAddMultipleValues}
            data-bs-toggle="tooltip"
            data-bs-placement="left"
            title="Enter integers seperated by commas."
          >
            Insert Array
          </button>
          <input
            ref={arrayInputRef}
            className="w-30 form-control border border-dark"
            type="text"
            placeholder="Integers separated by comma"
          />
        </div>
        <input
          className="form-control border-dark"
          type="number"
          placeholder="Enter an element"
          value={userInput}
          data-bs-toggle="tooltip"
          data-bs-placement="left"
          title="Enter an integer and you have options to insert it at the End or Start of the linked list. Also you can delete an element from here."
          onChange={(e) => setUserInput(e.target.value)}
        ></input>
        <div className="d-flex gap-3">
          <button
            className="btn btn-outline-success p-2 flex-fill"
            onClick={onPush}
          >
            Push End
          </button>
          <button
            className="btn btn-outline-success p-2 flex-fill"
            onClick={onPushFront}
          >
            Push Start
          </button>
        </div>
        <button className="btn btn-outline-danger" onClick={onRemove}>
          Remove
        </button>
        <hr />

        <div
          className="d-flex justify-content-between gap-3"
          data-bs-toggle="tooltip"
          data-bs-placement="left"
          title="Target: Element after which you want to insert another element. Data: The value you want to insert after specified"
        >
          <input
            className="form-control border-dark"
            type="number"
            placeholder="Target"
            ref={targetValueInputRef}
          ></input>
          <input
            className="form-control border-dark"
            type="number"
            placeholder="Data"
            ref={valueToInsertInputRef}
          ></input>
        </div>
        <button
          className="btn btn-outline-success"
          onClick={handleInsertAfter}
          disabled
          data-bs-toggle="tooltip"
          data-bs-placement="left"
        >
          Insert After
        </button>
        <hr />
        <button className="btn btn-outline-primary" onClick={onReverse}>
          Reverse
        </button>
        <div className="d-flex justify-content-between gap-3">
          <button
            className="btn btn-outline-danger p-2 flex-fill"
            onClick={onPop}
          >
            Pop End
          </button>
          <button
            className="btn btn-outline-danger p-2 flex-fill"
            onClick={onPopFront}
          >
            Pop Start
          </button>
        </div>
        <button className="btn btn-outline-danger" onClick={onClear}>
          Erase Linked List
        </button>
      </nav>
    </div>
  );
}
