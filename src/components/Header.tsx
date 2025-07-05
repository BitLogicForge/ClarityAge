import { Brightness4, Brightness7, ContactMail } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import ContactPopup from "./ContactPopup";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTheme } from "./ThemeProvider";

export default function Header() {
  const { t } = useTranslation();
  const { isDarkMode, toggleTheme } = useTheme();
  const [contactOpen, setContactOpen] = useState(false);

  const handleContactOpen = () => {
    setContactOpen(true);
  };

  const handleContactClose = () => {
    setContactOpen(false);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: { xs: 1, sm: 2 },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            <IconButton
              onClick={toggleTheme}
              sx={{ color: "primary.main" }}
              aria-label="toggle theme"
            >
              {isDarkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ fontSize: "0.7rem" }}
            >
              {isDarkMode ? t("theme.light") : t("theme.dark")}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            <IconButton
              onClick={handleContactOpen}
              sx={{ color: "primary.main" }}
              aria-label="contact"
            >
              <ContactMail />
            </IconButton>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ fontSize: "0.7rem" }}
            >
              {t("buttons.contact")}
            </Typography>
          </Box>
        </Box>

        <LanguageSwitcher />
      </Box>

      <ContactPopup open={contactOpen} onClose={handleContactClose} />
    </>
  );
}
