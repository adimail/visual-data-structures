import { motion } from "framer-motion";

export const HomeMenu = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, x: -50 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ duration: 1.1, ease: "easeInOut" }}
    >
      <h3>Home</h3>
      <hr />
      <p>
        Welcome to this corner of the Internet. This page is an extension of the
        second-year B.Tech Data Structures and Algorithms course to visualise
        the data structures such as Linked lists, list ADTs trees, graphs,
        binary search trees, B+ trees, B++ trees, threaded trees (single and
        double), AVL trees and their data-flow.
      </p>
      <span>
        NOTE: This is not an implementation of the data structure itself in
        typescript, it is a visualization of how these data structures work.
      </span>

      <p>
        Additionally, this is also an attempt in learning typescript and react
        frameworks for building interactive web applications (मज्जा आली ह्या
        project वरती काम करताना)
      </p>
      <p>
        For your reference, you can find my classroom notes containing content
        from my engineering syllabus, covering OOP, DS, ML, Maths, and more{" "}
        <a href="https://github.com/adimail/classroom">here</a>. I primarily
        work with Python and C++, and currently, I am learning Rust programming
        language to build memory-safe applications.
      </p>
    </motion.div>
  );
};

export default HomeMenu;
