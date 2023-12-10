import { motion } from "framer-motion";

export const HomeMenu = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, x: -50 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ duration: 1.1, ease: "easeInOut" }}
      className="fst-normal"
    >
      <h3>Home</h3>
      <hr />
      <div className="d-flex align-items-center">
        <div style={{ flex: 4 }}>
          <p>
            Welcome to Data Structure Playground. You can use this static site
            as a simulator to visualize the Data Structures and Algorithms such
            as{" "}
            <i>
              Linked lists, list ADTs, Sorting Algorithms, binary search trees,
              AVL trees, B+ trees, pathfinding Algorithms, and Hashing
              Algorithms{" "}
            </i>
          </p>
          <p>
            For more references, you can find my classroom notes containing
            content from my engineering syllabus{" "}
            <a href="https://github.com/adimail/classroom">here</a>.
          </p>
          <p>
            To get better experience, you can zoom out using{" "}
            <code>ctrl + -</code> so that all content can fit on single page
            including the nacvigation bar and control panel
          </p>
          <p>
            NOTE: This is not an implementation of the data structure itself in
            TypeScript; it is a visualization of how these data structures work.
          </p>
        </div>
        <div style={{ flex: 1 }}>
          <img src="src\assets\logo.png" alt="" style={{ width: "100%" }} />
          <span style={{ fontSize: "0.6rem", display: "flex" }}>
            Image Source: devgenius (medium)
          </span>
        </div>
      </div>

      <hr />
      <h6>Developers note</h6>
      <p>
        This project my attempt in learning typescript and react framework for
        building interactive web applications.
      </p>
      <p>
        Tools used in building this includes React as the frontend framework,
        bootstrap for UI (modals, tooltips, buttons, and icons), framer motion
        for animations, animejs and immer.
      </p>
      <p>
        You can raise any notable issues{" "}
        <a href="https://github.com/adimail/visual-data-structures/issues">
          here
        </a>{" "}
        and help contribute to this project.
      </p>
      <p></p>
    </motion.div>
  );
};

export default HomeMenu;
