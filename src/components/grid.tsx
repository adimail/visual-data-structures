import { Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./cardgrid.css";

const MyCardGrid = () => {
  const cardData = [
    {
      id: 1,
      imageUrl: "https://algofrus.files.wordpress.com/2016/08/list.gif",
      title: "Linked List",
      text: "A linear data structure where elements are linked using pointers. Efficient for dynamic memory allocation.",
    },
    {
      id: 2,
      imageUrl:
        "https://fullyunderstood.com/wp-content/uploads/2020/02/stack.gif",
      title: "List ADT",
      text: "List Abstract Data Type representing a collection of elements with operations like insertion and deletion.",
    },
    {
      id: 3,
      imageUrl: "https://visualgo.net/img/gif/sorting.gif",
      title: "Sorting Algorithms",
      text: "Various algorithms like Bubble Sort, Merge Sort, and QuickSort for arranging elements in a specific order.",
    },
    {
      id: 4,
      imageUrl: "https://visualgo.net/img/gif/bst.gif",
      title: "Binary Search Tree",
      text: "A tree data structure where each node has at most two children, facilitating efficient search and insertion.",
    },
    {
      id: 5,
      imageUrl: "https://visualgo.net/img/gif/heap.gif",
      title: "AVL Tree",
      text: "A self-balancing Binary Search Tree ensuring logarithmic height for efficient search, insert, and delete operations.",
    },
    {
      id: 6,
      imageUrl: "https://visualgo.net/img/gif/dfsbfs.gif",
      title: "Dijkstra's Algorithm",
      text: "A graph search algorithm finding the shortest path between nodes in a weighted graph.",
    },
    {
      id: 7,
      imageUrl: "https://visualgo.net/img/gif/dfsbfs.gif",
      title: "Pathfinding Algorithm",
      text: "Algorithms like A* and Dijkstra's used to find the optimal path between points in a graph or grid.",
    },
    {
      id: 8,
      imageUrl: "https://visualgo.net/img/gif/hashtable.gif",
      title: "Hashing Algorithm",
      text: "Techniques like open addressing and chaining for efficiently mapping data to a fixed-size array.",
    },
  ];

  return (
    <div className="my-5">
      <div className="d-flex gap-5 justify-content-around flex-wrap">
        {cardData.map((card) => (
          <Card
            key={card.id}
            className="d-flex gap-3 my-card"
            style={{ width: "20rem" }}
          >
            <div className="card-image-container">
              <Card.Img
                variant="top"
                src={card.imageUrl}
                className="card-image"
              />
              <div className="overlay"></div>
            </div>
            <Card.Body>
              <h6>{card.title}</h6>
              <p>{card.text}</p>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyCardGrid;
