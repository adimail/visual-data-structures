import { ReactNode } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";

// Define your light and dark themes
const lightTheme = {
  // Define your light theme properties here
  background: "#ffffff",
  text: "#000000",
};

const darkTheme = {
  // Define your dark theme properties here
  background: "#1a1a1a",
  text: "#ffffff",
};

// Define a type for your theme

interface ThemeProviderProps {
  theme: "dark" | "light";
  children: ReactNode;
}

const ThemeProvider = ({ theme, children }: ThemeProviderProps) => {
  const selectedTheme = theme === "dark" ? darkTheme : lightTheme;

  return (
    <StyledThemeProvider theme={selectedTheme}>{children}</StyledThemeProvider>
  );
};

export default ThemeProvider;
