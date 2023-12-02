export const PageFooter = () => {
  return (
    <footer
      id="sticky-footer"
      className="bg-dark text-white-50"
      style={{
        position: "fixed",
        bottom: 0,
        width: "100vw",
        padding: "0.68vw",
      }}
    >
      <div className="z-index-100 container text-center d-flex justify-content-between">
        <small className="text-center">Copyright &copy; 2023</small>
        <small>
          Made with love by{" "}
          <a className="text-decoration-none" href="https://adimail.github.io">
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
  );
};

export default PageFooter;
