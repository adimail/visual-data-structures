# Visual Data Structures (visual-code-studio)

visual-code-studio is a Data Structure Playground which can be used as a simulator to visualize the Data Structures and Algorithms such as Linked lists, list ADTs (Stack, queue), Sorting Algorithms, Binary Search Trees, AVL trees, B+ trees, Pathfinding Algorithms, and Hashing Algorithms

NOTE: This is not an implementation of the data structure itself in TypeScript; it is a visualization of how these data structures work.

This project my attempt in learning typescript and react framework for building interactive web applications.

Tools used in building this includes React as the frontend framework, bootstrap for UI (modals, tooltips, buttons, and icons), framer motion for animations, animejs and immer.

Please don't mind the poor structure of the code and components. I am a beginner who's learning-relearning-unlearning lot of things.

## Installation

Required: Node.js Version 18+

## Code snippets

![Home Page](src\assets\ss\home.png)
![Linked List](src\assets\ss\ll.png)
![List ADT](src\assets\ss\l-adt.png)
![Sorting Algorithm](src\assets\ss\sort.png)
![Binary Search Tree](src\assets\ss\bst.png)
![AVL Tree](src\assets\ss\avl.png)

## How to use this site

1. Linked list: You can do CURD operations on a linked list, reverse it
1. List ADT: Stacks and queues can be visualized and we can perform operations like push-pop and enqueue-deque operations
1. Sorting: Adujest the bin size and speed of animation to visualize sorting algorithms. You can also use keyboard keys to control the animations (Space key to toggle play and pause, and use Arrow keys to skip steps forward backwards) Current supported algorithms include
   - Selection Sort
   - Insertin Sort
   - Quick Sort
   - Merge Sort
   - Bubble Sort
1. Binary Search Tree: We can perform CURD operations on the tree, calculate the size, number of leaf nodes, tree height, get its in-order, pre-order, post-order, depth-first and breadth-first traversal. You can also insert multiple elements at one time.
1. _AVL tree: The tree is not yet balanced and I am working on the rotation algorithm. You can still perform CURD operations, but the load factor goes beyond the desired range and tree is unbalanced_
1. _Dijkstra's Path Finding Algorithm: This was the first reason for me to build a data structure visualizer project. I was tired of building adjacency matrix and lists on console using cpp, so my goal is to complete this project before my 3rd semester ends. Currently working on dragable node and canvas_
1. _I came across [visualgo](https://visualgo.net/en) where I was quite attracted to their educational visualizations, and thought hashing algorithms can also be visualized to help better understand them for begineers_

## To Do's

- AVL tree rotations
- DijkstrasAlgorithmCanvas component
- Hashing algorithm
- `Insert after ` function in linked list
- Implement Doubly and circular linked list
- Figure out howler library to add sound effects in sorting visualizer

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
