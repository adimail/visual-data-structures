import { motion } from "framer-motion";
import MyCardGrid from "../../components/grid";

const HomeMenu = () => {
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
        Welcome to the Data Structure Playground. Use this static site to
        visualize Data Structures and Algorithms as a simulator.
      </p>
      <h6>
        <i>
          To access the C++ and Python implementations of all concepts from my
          side, click "View Code" in the top-right corner of the page. Feel free
          to contribute by forking the GitHub repository and creating a pull
          request.
        </i>
      </h6>

      <MyCardGrid />
      <hr />
      <div>
        <div>
          <p>
            For a better experience, zoom out using <code>ctrl + -</code> to fit
            all content on a single page, including the navigation bar and
            control panel. Desktop usage is recommended.
          </p>
          <p>
            Find my classroom notes with engineering programs{" "}
            <a href="https://github.com/adimail/classroom">here</a>.
          </p>
          <p>
            NOTE: This is not an implementation of the data structure itself in
            TypeScript; it is a visualization of how these data structures work.
          </p>
        </div>

        <hr />
        <h6>Developer's Note</h6>
        <p>
          This project is my attempt to learn TypeScript and the React framework
          for building interactive web applications.
        </p>
        <p>
          Tools used include React for the frontend, Bootstrap for UI, Framer
          Motion for animations, react-syntax-highlighter for code highlighting
          in plain text, Anime.js, and Immer.
        </p>
        <p>
          Report issues{" "}
          <a href="https://github.com/adimail/visual-data-structures/issues">
            here
          </a>{" "}
          and contribute to this project.
        </p>
        <p></p>
      </div>
    </motion.div>
  );
};

export default HomeMenu;
