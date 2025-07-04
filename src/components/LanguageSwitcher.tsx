import { IconButton, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";

// Language configuration with flags and names
const languages = [
  { code: "en", flag: "🇺🇸", name: "English" },
  { code: "pl", flag: "🇵🇱", name: "Polski" },
] as const;

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // Get current language info
  const currentLanguage =
    languages.find((lang) => lang.code === i18n.language) || languages[0];

  const handleLanguageClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLanguageClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
    handleLanguageClose();
  };

  return (
    <>
      <IconButton
        onClick={handleLanguageClick}
        size="small"
        sx={{ ml: 2, fontSize: "1.5rem" }}
        aria-label="language switcher"
      >
        <span style={{ fontSize: "1.2em" }}>{currentLanguage.flag}</span>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleLanguageClose}
        onClick={handleLanguageClose}
      >
        {languages.map((language) => (
          <MenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            selected={i18n.language === language.code}
          >
            <span style={{ marginRight: "8px", fontSize: "1.1em" }}>
              {language.flag}
            </span>
            {language.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
