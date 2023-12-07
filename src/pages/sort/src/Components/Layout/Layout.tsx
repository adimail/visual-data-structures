const Layout = ({ children }: { children: JSX.Element }) => {
  return (
    <div className="wrapper">
      <div className="innerWrapper">{children}</div>
    </div>
  );
};

export default Layout;
