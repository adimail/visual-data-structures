export const cppFileText: string = `// C++ Program for sorting algorithms`;

export const pyFileText: string = `# Python program for sorting algorithms
# Author: Aditya Godse (https://github.com/adimail)

class SortingAlgorithms:

    def BubbleSort(self, arr):
        if len(arr) <= 1:
            return arr

        length = len(arr)

        for i in range(length):
            swapped = False
            for j in range(length - i - 1):
                if arr[j] > arr[j + 1]:
                    arr[j], arr[j + 1] = arr[j + 1], arr[j]
                    swapped = True
            if not swapped:
                break
        return arr

    def InsertionSort(self, arr):
        if len(arr) <= 1:
            return arr

        length = len(arr)

        for i in range(1, length):
            current = arr[i]
            j = i-1
            while (j >= 0 and arr[j] > current):
                arr[j+1] = arr[j]
                j -= 1
            arr[j+1] = current

        return arr

    def SelectionSort(self, arr):
        if len(arr) <= 1:
            return arr

        length = len(arr)

        for i in range(length - 1):
            for j in range(i + 1, length):
                if arr[i] > arr[j]:
                    arr[i], arr[j] = arr[j], arr[i]
        return arr

    def QuickSort(self, arr):
        length = len(arr)

        if length <= 1:
            return arr

        pivot = arr[length//2]
        middle = [x for x in arr if x == pivot]
        left = [x for x in arr if x < pivot]
        right = [x for x in arr if x > pivot]

        arr = self.QuickSort(left) + middle + self.QuickSort(right)
        return arr

    def mergeSort(self, arr):
        if len(arr) <= 1:
            return arr

        if len(arr) > 1:
            mid = len(arr) // 2
            left_half = arr[:mid]
            right_half = arr[mid:]

            self.mergeSort(left_half)
            self.mergeSort(right_half)

            i = j = k = 0

            while i < len(left_half) and j < len(right_half):
                if left_half[i] < right_half[j]:
                    arr[k] = left_half[i]
                    i += 1
                else:
                    arr[k] = right_half[j]
                    j += 1
                k += 1

            while i < len(left_half):
                arr[k] = left_half[i]
                i += 1
                k += 1

            while j < len(right_half):
                arr[k] = right_half[j]
                j += 1
                k += 1
        return arr

    def HeapSort(self, arr):
        if len(arr) <= 1:
            return arr

        return arr


sort = SortingAlgorithms()

arr = [8, 5, 5, 2, 8, 4]

print("Original Array : ", arr)
print("Sorted Array   : ", sort.BubbleSort(arr))  # passed
# print(sort.InsertionSort(arr))    #passed
# print(sort.SelectionSort(arr))    #passed
# print(sort.QuickSort(arr))        # passed
# print(sort.mergeSort(arr))
`;
