import "./App.css";
import { Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import PageFooter from "./components/pagefooter";
import AnimatedRouts from "./components/AnimatedRouts";

interface MenuItem {
  key: string;
  label: string;
}

function App() {
  return (
    <>
      <h2 className="text-primary py-2 text-center bg-dark">
        Data structure Playground
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
    { key: "/visual-data-structures/", label: "Home" },
    { key: "/visual-data-structures/ll", label: "Linked List" },
    { key: "/visual-data-structures/list-adt", label: "List ADT" },
    { key: "/visual-data-structures/sort", label: "Sorting" },
    { key: "/visual-data-structures/bst", label: "Binary search tree" },
    { key: "/visual-data-structures/avl", label: "Avl Tree" },
    { key: "/visual-data-structures/dijkstra", label: "Dijkstra's algorithm" },
    { key: "/visual-data-structures/path", label: "Path finding" },
    { key: "/visual-data-structures/hashing", label: "Hashing Algoithm" },
  ];

  return (
    <div>
      <Menu onClick={(e) => navigate(e.key)} mode="vertical" className="gap-5">
        {menuItems.map((item) => (
          <Menu.Item
            key={item.key}
            className={
              item.key === "/visual-data-structures/" ? "home-button" : ""
            }
          >
            {item.label}
          </Menu.Item>
        ))}
      </Menu>
    </div>
  );
}

function Content() {
  const location = useLocation();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [location.pathname]);

  return (
    <div className="w-100 mx-4 fade-transition" ref={contentRef}>
      <AnimatedRouts />
    </div>
  );
}

export default App;
