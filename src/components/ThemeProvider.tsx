import { createTheme, CssBaseline } from "@mui/material";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { createContext, useContext, useState, type ReactNode } from "react";

const THEME_STORAGE_KEY = "clarityage:theme";

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      return window.localStorage.getItem(THEME_STORAGE_KEY) !== "light";
    } catch {
      return true;
    }
  });

  const toggleTheme = () => {
    setIsDarkMode(currentValue => {
      const nextValue = !currentValue;

      try {
        window.localStorage.setItem(
          THEME_STORAGE_KEY,
          nextValue ? "dark" : "light"
        );
      } catch {
        // Ignore storage failures; the visible theme can still change.
      }

      return nextValue;
    });
  };

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}
