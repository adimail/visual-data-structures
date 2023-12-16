import HomeMenu from "../pages/home";
import ListADT from "../pages/list-adt";
import { LinkedListPage } from "../pages/ll";
import AVLTreePage from "../pages/avl";
import PathFinder from "../pages/path";
import Sorting from "../pages/sort";
import Hashing from "../pages/hashing";
import BinarySearchTreePage from "../pages/bst";
import Dijkstra from "../pages/dijkstra";

import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

function NotFound() {
  return (
    <div className="container">
      <h3>Page you are looking for does not exist</h3>
      <br />
      <p>
        Click{" "}
        <a href="https://adimail.github.io/visual-data-structures/"> Here </a>
        to return to home menu
      </p>
    </div>
  );
}

function AnimatedRouts() {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="visual-data-structures/" element={<HomeMenu />} />
        <Route path="visual-data-structures/list-adt" element={<ListADT />} />
        <Route path="visual-data-structures/ll" element={<LinkedListPage />} />
        <Route
          path="visual-data-structures/bst"
          element={<BinarySearchTreePage />}
        />
        <Route path="visual-data-structures/path" element={<PathFinder />} />
        <Route path="visual-data-structures/sort" element={<Sorting />} />
        <Route path="visual-data-structures/dijkstra" element={<Dijkstra />} />
        <Route path="visual-data-structures/hashing" element={<Hashing />} />
        <Route path="visual-data-structures/avl" element={<AVLTreePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRouts;
