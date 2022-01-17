import { useState, useMemo, useRef } from "react";
import debounce from "lodash.debounce";

import "./Visualizer.css";

import Bar from "./Bar";
import Description from "./Description";
import Slider from "./Slider";
import { useEffect } from "react/cjs/react.development";

const minDelay = 10;
const maxDelay = 1000;
const defaultArrayLength = 50;

// initializing array
const initialArray = [];

for (let i = 0; i < defaultArrayLength; ++i) {
  initialArray[i] = Math.random();
}

const Visualizer = () => {
  const [array, setArray] = useState(initialArray);
  const [primaryIdx, setPrimaryIdx] = useState();
  const [secondaryIdx, setSecondaryIdx] = useState();
  const [sortMethod, setSortMethod] = useState();
  const [sleepDelay, setSleepDelay] = useState(100);
  const [arrayLength, setArrayLength] = useState(defaultArrayLength);
  const [sorting, setSorting] = useState(false);

  const newArrayLength = useRef();

  // Sorting logic

  const swap = (array, a, b) => {
    // TODO: improve animation to make the swap process more apparent

    let temp = array[a];
    array[a] = array[b];
    array[b] = temp;
  };

  const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay)); // from https://blog.devgenius.io/how-to-make-javascript-sleep-or-wait-d95d33c99909

  const bubbleSort = async () => {
    setSorting(true);
    const newArray = [...array];

    for (let i = 0; i < arrayLength - 1; ++i) {
      for (let j = 0; j < arrayLength - i - 1; ++j) {
        setPrimaryIdx(j);
        setSecondaryIdx(j + 1);
        if (newArray[j] > newArray[j + 1]) {
          swap(newArray, j, j + 1);
          setArray(newArray);
          await sleep(sleepDelay);
        }
      }
    }
    setSorting(false);
  };

  const selectionSort = async () => {
    setSorting(true);
    const newArray = [...array];

    for (let i = 0; i < arrayLength; ++i) {
      let minIdx = i;
      setPrimaryIdx(i);
      setSecondaryIdx(minIdx);
      for (let j = i + 1; j < arrayLength; ++j) {
        if (newArray[j] < newArray[minIdx]) {
          minIdx = j;
          setSecondaryIdx(minIdx);
        }
      }
      swap(newArray, minIdx, i);
      setArray(newArray);
      await sleep(sleepDelay);
    }
    setSorting(false);
  };

  const insertionSort = async () => {
    setSorting(true);
    const newArray = [...array];

    for (let i = 1; i < arrayLength; i++) {
      let key = newArray[i];
      let j = i - 1;
      setPrimaryIdx(i);

      // shift all elements after the key to make space for the insertion
      while (j >= 0 && newArray[j] > key) {
        setSecondaryIdx(j);
        newArray[j + 1] = newArray[j];
        setArray(newArray);
        await sleep(sleepDelay);
        j = j - 1;
      }
      newArray[j + 1] = key;
      setArray(newArray);
      await sleep(sleepDelay);
    }
    setSorting(false);
  };

  // onClick handlers

  const handleReset = () => {
    const newArray = [];

    for (let i = 0; i < arrayLength; ++i) {
      newArray[i] = Math.random();
    }
    setArray(newArray);

    // clear the marked indexes from the previous sort
    setPrimaryIdx(-1);
    setSecondaryIdx(-1);
  };

  const handleBubbleSort = () => {
    setSortMethod("Bubble");
    bubbleSort();
  };

  const handleSelectionSort = () => {
    setSortMethod("Selection");
    selectionSort();
  };

  const handleInsertionSort = () => {
    setSortMethod("Insertion");
    insertionSort();
  };

  const handleUpdateSpeed = () => {
    setSleepDelay(
      // low speed -> high delay, high speed -> low delay
      maxDelay - document.getElementById("speedSlider").value + minDelay
    );
  };

  const handleSizeChange = async () => {
    let newSize = newArrayLength.current.value;
    setArrayLength(newSize);

    // TODO: find a better way to force rerender (handleReset doesn't work here because setArrayLength is too slow)
    const newArray = [];

    for (let i = 0; i < newSize; ++i) {
      newArray[i] = Math.random();
    }
    setArray(newArray);
    setPrimaryIdx(-1);
    setSecondaryIdx(-1);
  };

  const debouncedHandleSizeChange = useMemo(
    () => debounce(handleSizeChange, 300),
    [newArrayLength]
  );

  useEffect(() => {
    return () => {
      debouncedHandleSizeChange.cancel();
    };
  }, []);

  return (
    <>
      <button
        onClick={handleBubbleSort}
        className="bubbleSort"
        disabled={sorting}
      >
        Bubble Sort
      </button>
      <button
        onClick={handleSelectionSort}
        className="selectionSort"
        disabled={sorting}
      >
        Selection Sort
      </button>
      <button
        onClick={handleInsertionSort}
        className="insertionSort"
        disabled={sorting}
      >
        Insertion Sort
      </button>
      <button onClick={handleReset} className="resetButton" disabled={sorting}>
        Reset
      </button>
      <Slider
        min={minDelay.toString()}
        max={maxDelay.toString()}
        onChange={handleUpdateSpeed}
        id="speedSlider"
        step="10"
        disabled={sorting}
      />
      <Slider
        min="3"
        max="50"
        step="1"
        id="sizeSlider"
        onChange={debouncedHandleSizeChange}
        ref={newArrayLength}
        disabled={sorting}
      />
      <div
        style={{
          height: "375px",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
        }}
      >
        {array.map((value, index) => {
          return (
            <Bar
              value={value * 350}
              key={index}
              primaryIdx={index == primaryIdx}
              secondaryIdx={index == secondaryIdx}
            />
          );
        })}
      </div>
      <Description sortMethod={sortMethod} />
    </>
  );
};

export default Visualizer;
