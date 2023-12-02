import "./App.css";
import { Menu } from "antd";
import { Route, Routes, useNavigate } from "react-router-dom";
import PathFinder from "./pages/path";
import BinarySearchTree from "./pages/bst";
import Sorting from "./pages/sort";
import HomeMenu from "./pages/home";
import ListADT from "./pages/list-adt";
import LinkedList from "./pages/ll";
import PageFooter from "./components/pagefooter";

interface MenuItem {
  key: string;
  label: string;
}

function App() {
  return (
    <>
      <h2 className="text-primary py-2 text-center bg-dark">
        Data structure Visualizer
      </h2>

      <div className="d-flex flex-column flex-grow-1">
        <div className="flex-grow-1 d-flex">
          <SideMenu />
          <Content />
        </div>
      </div>

      <PageFooter />
    </>
  );
}

function SideMenu() {
  const navigate = useNavigate();

  const menuItems: MenuItem[] = [
    { key: "/", label: "Home" },
    { key: "sort", label: "Sorting" },
    { key: "list-adt", label: "List ADT" },
    { key: "ll", label: "Linked List" },
    { key: "path", label: "Path finding" },
    { key: "bst", label: "Binary search tree" },
  ];

  return (
    <div>
      <Menu onClick={(e) => navigate(e.key)} mode="vertical" className="gap-5">
        {menuItems.map((item) => (
          <Menu.Item
            key={item.key}
            className={item.key === "/" ? "home-button" : ""}
          >
            {item.label}
          </Menu.Item>
        ))}
      </Menu>
    </div>
  );
}

function Content() {
  return (
    <div className="w-100 mx-4">
      <Routes>
        <Route path="/" element={<HomeMenu />}></Route>
        <Route path="list-adt" element={<ListADT />}></Route>
        <Route path="ll" element={<LinkedList />}></Route>
        <Route path="bst" element={<BinarySearchTree />}></Route>
        <Route path="path" element={<PathFinder />}></Route>
        <Route path="sort" element={<Sorting />}></Route>
      </Routes>
    </div>
  );
}

export default App;
