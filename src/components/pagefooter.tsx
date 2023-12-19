import React from "react";
// import { motion } from "framer-motion";
// import styled from "styled-components";

interface PageFooterProps {
  onNextPage: () => void;
  onPreviousPage: () => void;
  isPreviousDisabled: boolean;
  isNextDisabled: boolean;
  menuItems: MenuItem[];
  currentPageIndex: number;
}

interface MenuItem {
  label: string;
}

// const AnimatedButton = styled(motion.button)`
//   opacity: 0;
//   transition: opacity 0.3s ease-in;

//   &:hover {
//     opacity: 1;
//   }
// `;

const PageFooter: React.FC<PageFooterProps> = ({}) => {
  return (
    <>
      {/* <motion.footer
        id="sticky-footer"
        className={`d-flex justify-content-between `}
        style={{
          position: "fixed",
          bottom: 0,
          width: "100vw",
          marginBottom: "50px",
          padding: "6px",
          paddingLeft: "50px",
          paddingRight: "50px",
        }}
        initial="hidden"
        transition={{ duration: 0.5 }}
        onMouseEnter={() => setIsMouseOverFooter(true)}
        onMouseLeave={() => setIsMouseOverFooter(false)}
      >
        {menuItems[currentPageIndex - 1] ? (
          <AnimatedButton
            onClick={onPreviousPage}
            disabled={isPreviousDisabled}
            className="btn btn-primary"
            initial={{ opacity: 0 }}
            animate={{ opacity: isMouseOverFooter ? 1 : 0 }}
          >
            {"<- "}
            {menuItems[currentPageIndex - 1]?.label}
          </AnimatedButton>
        ) : (
          <div></div>
        )}
        {menuItems[currentPageIndex + 1] ? (
          <AnimatedButton
            onClick={onNextPage}
            disabled={isNextDisabled}
            className="btn btn-primary"
            initial={{ opacity: 0 }}
            animate={{ opacity: isMouseOverFooter ? 1 : 0 }}
          >
            {menuItems[currentPageIndex + 1]?.label} {" ->"}
          </AnimatedButton>
        ) : (
          <div></div>
        )}
      </motion.footer> */}

      <footer
        id="sticky-footer"
        className="bg-dark text-white-50"
        style={{
          position: "fixed",
          bottom: 0,
          width: "100vw",
          height: "50px",
        }}
      >
        <div className="z-index-100 py-3 container text-center d-flex justify-content-center">
          <small>
            Made with love by{" "}
            <a
              className="text-decoration-none"
              href="https://adimail.github.io"
            >
              Aditya Godse
            </a>
          </small>
        </div>
      </footer>
    </>
  );
};

export default PageFooter;
