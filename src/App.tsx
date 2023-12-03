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
    { key: "list-adt", label: "List ADT" },
    { key: "ll", label: "Linked List" },
    { key: "sort", label: "Sorting" },
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
