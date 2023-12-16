import "./App.css";
import { Menu, Button } from "antd";
import PageFooter from "./components/pagefooter";
import { useState } from "react";
import { MenuOutlined } from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";
import { Offcanvas } from "react-bootstrap";

import HomeMenu from "./pages/home";
import ListADT from "./pages/list-adt";
import { LinkedListPage } from "./pages/ll";
import AVLTreePage from "./pages/avl";
import PathFinder from "./pages/path";
import Sorting from "./pages/sort";
import Hashing from "./pages/hashing";
import BinarySearchTreePage from "./pages/bst";
import Dijkstra from "./pages/dijkstra";

interface MenuItem {
  label: string;
}

function App() {
  const [selectedPage, setSelectedPage] = useState<React.ReactNode>(
    <HomeMenu />
  );
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);

  const handleNextPage = () => {
    const newIndex = Math.min(currentPageIndex + 1, menuItems.length - 1);
    handleMenuClick(menuItems[newIndex]);
    setCurrentPageIndex(newIndex);
  };

  const handlePreviousPage = () => {
    const newIndex = Math.max(currentPageIndex - 1, 0);
    handleMenuClick(menuItems[newIndex]);
    setCurrentPageIndex(newIndex);
  };

  const menuItems: MenuItem[] = [
    { label: "Home" },
    { label: "Linked List" },
    { label: "List ADT" },
    { label: "Sorting" },
    { label: "Binary search tree" },
    { label: "Avl Tree" },
    { label: "Dijkstra's algorithm" },
    { label: "Path finding" },
    { label: "Hashing Algorithm" },
  ];

  const handleMenuClick = (item: MenuItem) => {
    switch (item.label) {
      case "Home":
        setSelectedPage(<HomeMenu />);
        break;
      case "List ADT":
        setSelectedPage(<ListADT />);
        break;
      case "Linked List":
        setSelectedPage(<LinkedListPage />);
        break;
      case "Sorting":
        setSelectedPage(<Sorting />);
        break;
      case "Binary search tree":
        setSelectedPage(<BinarySearchTreePage />);
        break;
      case "Avl Tree":
        setSelectedPage(<AVLTreePage />);
        break;
      case "Dijkstra's algorithm":
        setSelectedPage(<Dijkstra />);
        break;
      case "Path finding":
        setSelectedPage(<PathFinder />);
        break;
      case "Hashing Algorithm":
        setSelectedPage(<Hashing />);
        break;
      default:
        setSelectedPage(null);
    }
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }} // Exit animation configuration
        transition={{ duration: 0.5 }}
        className="text-primary align-items-center justifycontent-center text-center bg-dark d-flex"
      >
        <Button
          type="primary"
          icon={<MenuOutlined />}
          onClick={toggleMenu}
          className="menu-toggle-button bg-dark"
          style={{ padding: "0" }}
        />
        <h2 className="text-primary py-2 text-center w-100">
          Data structure visualizer
        </h2>
      </motion.div>

      <div className="d-flex flex-column flex-grow-1" style={{ width: "100%" }}>
        <div className="d-flex">
          {showMenu && (
            <Offcanvas show={showMenu} onHide={toggleMenu} placement="start">
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>Data Structure Visualizer</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Menu mode="vertical" className="gap-5">
                  {menuItems.map((item) => (
                    <Menu.Item
                      key={item.label}
                      className={item.label === "Home" ? "home-button" : ""}
                      onClick={() => {
                        handleMenuClick(item);
                        toggleMenu();
                      }}
                    >
                      {item.label}
                    </Menu.Item>
                  ))}
                </Menu>
              </Offcanvas.Body>
            </Offcanvas>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedPage ? "page" : "empty"}
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              className="mx-4 pt-3"
              style={{ width: "100%" }}
            >
              {selectedPage}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <PageFooter
        onNextPage={handleNextPage}
        onPreviousPage={handlePreviousPage}
        isPreviousDisabled={currentPageIndex === 0}
        isNextDisabled={currentPageIndex === menuItems.length - 1}
      />
    </>
  );
}

export default App;
