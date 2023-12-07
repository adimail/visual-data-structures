import HomeMenu from "../pages/home";
import ListADT from "../pages/list-adt";
import LinkedList from "../pages/ll";
import BinarySearchTree from "../pages/bst";
import PathFinder from "../pages/path";
import Sorting from "../pages/sort";
import Hashing from "../pages/hashing";

import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

function AnimatedRouts() {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomeMenu />} />
        <Route path="list-adt" element={<ListADT />} />
        <Route path="ll" element={<LinkedList />} />
        <Route path="bst" element={<BinarySearchTree />} />
        <Route path="path" element={<PathFinder />} />
        <Route path="sort" element={<Sorting />} />
        <Route path="hashing" element={<Hashing />} />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRouts;
