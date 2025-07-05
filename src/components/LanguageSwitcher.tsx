import { IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";

// Language configuration with short codes instead of flags
const languages = [
  { code: "en", display: "EN", name: "English" },
  { code: "pl", display: "PL", name: "Polski" },
] as const;

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // Get current language info
  const currentLanguage =
    languages.find((lang) => lang.code === i18n.language) || languages[0];

  const handleLanguageClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
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
        sx={{
          ml: 2,
          cursor: "pointer",
          minWidth: 48,
          height: 48,
          border: 1,
          borderColor: "divider",
          "&:hover": {
            backgroundColor: "action.hover",
            borderColor: "primary.main",
          },
        }}
        aria-label="language switcher"
        disableRipple={false}
      >
        <Typography
          variant="body2"
          sx={{
            fontWeight: "bold",
            fontSize: "0.75rem",
            userSelect: "none",
            pointerEvents: "none",
            color: "primary.main",
          }}
        >
          {currentLanguage.display}
        </Typography>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleLanguageClose}
        MenuListProps={{
          onClick: (e) => e.stopPropagation(),
        }}
      >
        {languages.map((language) => (
          <MenuItem
            key={language.code}
            onClick={(e) => {
              e.stopPropagation();
              handleLanguageChange(language.code);
            }}
            selected={i18n.language === language.code}
            sx={{
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "action.hover",
              },
            }}
          >
            <Typography
              variant="body2"
              sx={{
                marginRight: "12px",
                fontWeight: "bold",
                fontSize: "0.75rem",
                userSelect: "none",
                color: "primary.main",
                minWidth: "24px",
                textAlign: "center",
              }}
            >
              {language.display}
            </Typography>
            {language.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
