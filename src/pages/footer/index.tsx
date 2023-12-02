function MyFooter() {
  return (
    <div>
      <footer
        id="sticky-footer"
        className="z-100 flex-shrink-0 py-2 bg-dark text-white-50"
        style={{ position: "fixed", bottom: 0, width: "100%" }}
      >
        <div className="container text-center d-flex justify-content-between">
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
              View Code
            </a>
          </small>
        </div>
      </footer>
    </div>
  );
}

export default MyFooter;
