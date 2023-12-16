import React from "react";

interface PageFooterProps {
  onNextPage: () => void;
  onPreviousPage: () => void;
  isPreviousDisabled: boolean;
  isNextDisabled: boolean;
}

const PageFooter: React.FC<PageFooterProps> = ({
  onNextPage,
  onPreviousPage,
  isPreviousDisabled,
  isNextDisabled,
}) => {
  return (
    <>
      <footer
        id="sticky-footer"
        className="bg-dark text-white-50"
        style={{
          position: "fixed",
          bottom: 0,
          width: "100vw",
        }}
      >
        <div
          style={{ width: "100%" }}
          className="d-flex justify-content-between bg-white"
        >
          <button
            onClick={onPreviousPage}
            disabled={isPreviousDisabled}
            className="btn btn-primary"
          >
            Previous Page
          </button>
          <button
            onClick={onNextPage}
            disabled={isNextDisabled}
            className="btn btn-primary"
          >
            Next Page
          </button>
        </div>

        <div className="z-index-100 py-3 container text-center d-flex justify-content-between">
          <small className="text-center">Copyright &copy; 2023</small>
          <small>
            Made with love by{" "}
            <a
              className="text-decoration-none"
              href="https://adimail.github.io"
            >
              Aditya Godse
            </a>
          </small>

          <small>
            <a
              className="text-decoration-none"
              href="https://github.com/adimail/visual-data-structures"
            >
              Source Code
            </a>
          </small>
        </div>
      </footer>
    </>
  );
};

export default PageFooter;
