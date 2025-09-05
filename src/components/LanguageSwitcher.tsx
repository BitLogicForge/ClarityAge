import { IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './LanguageSwitcher.module.less'; // Update to .less import

const languages = [
  { code: 'en', display: 'EN', name: 'English' },
  { code: 'pl', display: 'PL', name: 'Polski' },
] as const;

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

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
        size='small'
        className={styles.languageButton}
        aria-label='language switcher'
        disableRipple={false}
      >
        <Typography variant='body2' className={styles.languageDisplay}>
          {currentLanguage.display}
        </Typography>
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleLanguageClose}>
        {languages.map(language => (
          <MenuItem
            key={language.code}
            onClick={e => {
              e.stopPropagation();
              handleLanguageChange(language.code);
            }}
            selected={i18n.language === language.code}
            className={styles.languageMenuItem}
          >
            <Typography variant='body2' className={styles.languageDisplayMenu}>
              {language.display}
            </Typography>
            {language.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
