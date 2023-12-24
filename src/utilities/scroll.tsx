import React, { ReactNode } from "react";
import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

// This component is used to scroll to the top of the page when the route changes
export const ScrollToTop: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const location = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return <>{children}</>;
};
