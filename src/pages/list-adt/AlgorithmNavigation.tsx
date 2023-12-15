import { useEffect } from "react";
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
  onEnqueue: () => void;
  onDequeue: () => void;
  addrand: () => void;
  userInput: string;
  setUserInput: React.Dispatch<React.SetStateAction<string>>;
  listType: "Stack" | "Queue";
  setListType: React.Dispatch<React.SetStateAction<"Stack" | "Queue">>;
  size: number;
}

export function AlgorithmNavigation({
  onPushFront,
  onPopFront,
  onPop,
  onClear,
  userInput,
  setUserInput,
  listType,
  setListType,
  size,
  addrand,
}: AlgorithmNavigationProps) {
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
          <label className="btn btn-warning border border-dark">Type</label>
          <select
            className="border border-black form-select"
            id="inputGroupSelect01"
            onChange={(e) => setListType(e.target.value as "Stack" | "Queue")}
          >
            <option value="Stack">Stack</option>
            <option value="Queue">Queue</option>
          </select>
        </div>
        <InfoTooltip text="Select the type of list ADT you would like to simulate" />
      </div>
      <hr />
      <nav className="gap-2 d-flex flex-column">
        {size === 8 ? (
          <>
            <p>Maximum size reached</p>
          </>
        ) : (
          <>
            <p>Items Left {8 - size}</p>
          </>
        )}
        <div className="input-group w-80">
          <input
            className="form-control w-50 border-dark"
            type="number"
            placeholder="Enter an element"
            value={userInput}
            data-bs-toggle="tooltip"
            data-bs-placement="left"
            title="Enter an integer to push on the top of the list."
            onChange={(e) => setUserInput(e.target.value)}
          ></input>
          <button
            className="btn btn-outline-success p-2 flex-fill w-30"
            onClick={onPushFront}
            disabled={size > 7}
          >
            {listType === "Stack" ? "Push" : "Enqueue"}
          </button>
        </div>
        <button
          className="btn btn-success p-2 flex-fill w-30"
          onClick={addrand}
          disabled={size > 7}
        >
          {listType === "Stack" ? "Push" : "Enqueue"} Random Number (1-30)
        </button>
        <button
          className="btn btn-outline-danger p-2 flex-fill"
          onClick={listType === "Stack" ? onPopFront : onPop}
        >
          {listType === "Stack" ? "Pop" : "Dequeue"}
        </button>
        <hr />

        <button className="btn btn-outline-danger" onClick={onClear}>
          Erase List ADT
        </button>
      </nav>
    </div>
  );
}
