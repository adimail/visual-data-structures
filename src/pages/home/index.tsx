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
        Welcome to this corner of the Internet, an extension of the second-year
        B.Tech Data Structures and Algorithms course to visualise various data
        structures such as Linked{" "}
        <i>
          lists, list ADTs, trees, graphs, binary search trees, B+ trees, B++
          trees, threaded trees (single and double), AVL trees,{" "}
        </i>
        and their data flow.
      </p>

      <p>
        Additionally, this is also an attempt in learning typescript and react
        framework for building interactive web applications
      </p>
      <p>
        For your reference, you can find my classroom notes containing content
        from my engineering syllabus, covering OOP, DS, ML, Maths, and more{" "}
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
