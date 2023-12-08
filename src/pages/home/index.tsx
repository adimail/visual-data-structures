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
      <p>
        Welcome to this simulation site, an extension of Engineering Data
        Structures and Algorithms syllabus to simulate data flow of{" "}
        <i>
          Linked lists, list ADTs, Sorting Algorithms, binary search trees, AVL
          trees, B+ trees, and pathfinding Algorithms{" "}
        </i>
      </p>

      <p>
        Additionally, this is also my attempt in learning typescript and react
        framework for building interactive web applications
      </p>
      <p>
        For your reference, you can find my classroom notes containing content
        from my engineering syllabus{" "}
        <a href="https://github.com/adimail/classroom">here</a>.
      </p>
      <span>
        NOTE: This is not an implementation of the data structure itself in
        typescript, it is a visualization of how these data structures work.
      </span>
    </motion.div>
  );
};

export default HomeMenu;
