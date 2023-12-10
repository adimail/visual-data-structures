import { ReactElement } from "react";

export const algorithmDisplayNames: Record<
  string,
  {
    displayName: string;
    timeComplexity: string;
    description: string;
    algorithm: ReactElement<any, any>;
  }
> = {
  selectionSort: {
    displayName: "Selection Sort",
    timeComplexity: "O(n^2)",
    description:
      "The algorithm repeatedly selects the smallest (or largest) element from the unsorted portion of the list and swaps it with the first element of the unsorted part. This process is repeated for the remaining unsorted portion until the entire list is sorted. ",
    algorithm: (
      <div>
        <ol>
          <li>Find the smallest element in the unsorted portion.</li>
          <li>Swap it with the first element in the unsorted portion.</li>
          <li>Repeat for the remaining unsorted portion.</li>
          <li>Continue until the entire list is sorted.</li>
        </ol>
        <br />
      </div>
    ),
  },

  insertionSort: {
    displayName: "Insertion Sort",
    timeComplexity: "O(n^2)",
    description:
      "To sort an array of size N in ascending order iterate over the array and compare the current element (key) to its predecessor, if the key element is smaller than its predecessor, compare it to the elements before. Move the greater elements one position up to make space for the swapped element.",
    algorithm: (
      <div>
        <ol>
          <li>
            Traverse from left to right, comparing each element to its immediate
            neighbor. If the current element is greater than its neighbor, swap
            them.
          </li>
          <li>
            This process repeatedly moves the largest element to the rightmost
            position in the array.
          </li>
          <li>
            Continue iterating through the remaining unsorted portion, comparing
            and swapping elements as needed.
          </li>
          <li>
            This process continues until the entire array is sorted, with the
            largest element at the right end, the second largest next to it, and
            so on, in descending order.
          </li>
        </ol>
      </div>
    ),
  },
  bubbleSort: {
    displayName: "Bubble Sort",
    timeComplexity: "O(n^2)",
    description:
      "Bubble Sort is the simplest sorting algorithm that works by repeatedly swapping the adjacent elements if they are in the wrong order. This algorithm is not suitable for large data sets as its average and worst-case time complexity is quite high.",
    algorithm: (
      <div>
        <ol>
          <li>
            traverse from left and compare adjacent elements and the higher one
            is placed at right side.
          </li>
          <li>
            In this way, the largest element is moved to the rightmost end at
            first.
          </li>
          <li>
            This process is then continued to find the second largest and place
            it and so on until the data is sorted.
          </li>
        </ol>
      </div>
    ),
  },
  mergeSort: {
    displayName: "Merge Sort",
    timeComplexity: "O(n log n)",
    description:
      "Merge sort is defined as a sorting algorithm that works by dividing an array into smaller subarrays, sorting each subarray, and then merging the sorted subarrays back together to form the final sorted array.",
    algorithm: (
      <div>
        <ol>
          <li>
            Traverse from left to right, comparing each element to its immediate
            neighbor. If the current element is greater than its neighbor, swap
            them.
          </li>
          <li>
            This process repeatedly moves the largest element to the rightmost
            position in the array.
          </li>
          <li>
            Continue iterating through the remaining unsorted portion, comparing
            and swapping elements as needed.
          </li>
          <li>
            This process continues until the entire array is sorted, with the
            largest element at the right end, the second largest next to it, and
            so on, in descending order.
          </li>
        </ol>
      </div>
    ),
  },
  quickSort: {
    displayName: "Quick Sort",
    timeComplexity: "O(n log n)",
    description:
      "QuickSort is a sorting algorithm based on the Divide and Conquer algorithm that picks an element as a pivot and partitions the given array around the picked pivot by placing the pivot in its correct position in the sorted array.",
    algorithm: (
      <div>
        <ol>
          <li>
            Traverse from left to right, comparing each element to its immediate
            neighbor. If the current element is greater than its neighbor, swap
            them.
          </li>
          <li>
            This process repeatedly moves the largest element to the rightmost
            position in the array.
          </li>
          <li>
            Continue iterating through the remaining unsorted portion, comparing
            and swapping elements as needed.
          </li>
          <li>
            This process continues until the entire array is sorted, with the
            largest element at the right end, the second largest next to it, and
            so on, in descending order.
          </li>
        </ol>
      </div>
    ),
  },
};
