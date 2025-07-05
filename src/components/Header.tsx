import { Brightness4, Brightness7 } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTheme } from "./ThemeProvider";

export default function Header() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: { xs: 1, sm: 2 },
      }}
    >
      <IconButton
        onClick={toggleTheme}
        sx={{ color: "primary.main" }}
        aria-label="toggle theme"
      >
        {isDarkMode ? <Brightness7 /> : <Brightness4 />}
      </IconButton>

      <LanguageSwitcher />
    </Box>
  );
}
