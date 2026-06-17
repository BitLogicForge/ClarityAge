import React from 'react';
import {
  Box,
  Typography,
  Alert,
  AlertTitle,
  List,
  ListItem,
  ListItemText,
  Link,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

export const CrisisResources: React.FC = () => {
  const { t } = useTranslation();
  const isPolish = window.location.pathname.includes('/pl') || document.documentElement.lang.includes('pl');

  return (
    <Alert
      severity="error"
      sx={{
        mt: 3,
        borderRadius: 2,
        '& .MuiAlert-icon': {
          fontSize: '2.5rem',
        },
      }}
    >
      <AlertTitle sx={{ fontSize: '1.3rem', fontWeight: 600 }}>
        {t('cesd.resources.crisis.title')}
      </AlertTitle>

      <Typography variant="body1" sx={{ mb: 2 }}>
        {t('cesd.resources.crisis.description')}
      </Typography>

      <List
        sx={{
          bgcolor: 'rgba(0, 0, 0, 0.05)',
          borderRadius: 1,
          p: 2,
        }}
      >
        {/* US Crisis Resources */}
        <ListItem
          sx={{
            bgcolor: 'background.paper',
            mb: 1,
            borderRadius: 1,
          }}
        >
          <ListItemText
            primary="988 Suicide & Crisis Lifeline (US)"
            secondary={
              <Box sx={{ display: 'flex', gap: 2, mt: 0.5 }}>
                <Link href="tel:988" sx={{ cursor: 'pointer' }}>
                  Call or Text 988
                </Link>
                <Link
                  href="https://988lifeline.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ cursor: 'pointer' }}
                >
                  988lifeline.org
                </Link>
              </Box>
            }
          />
        </ListItem>

        {/* Emergency Services */}
        <ListItem
          sx={{
            bgcolor: 'background.paper',
            mb: 1,
            borderRadius: 1,
          }}
        >
          <ListItemText
            primary="Emergency Services (US)"
            secondary={
              <Link href="tel:911" sx={{ cursor: 'pointer' }}>
                Call 911
              </Link>
            }
          />
        </ListItem>

        {/* Crisis Text Line */}
        <ListItem
          sx={{
            bgcolor: 'background.paper',
            mb: 1,
            borderRadius: 1,
          }}
        >
          <ListItemText
            primary="Crisis Text Line"
            secondary="Text HOME to 741741"
          />
        </ListItem>

        {/* Polish Crisis Resources (if Polish language detected) */}
        {isPolish && (
          <>
            <ListItem
              sx={{
                bgcolor: 'background.paper',
                mb: 1,
                borderRadius: 1,
                mt: 2,
              }}
            >
              <ListItemText
                primary="Antydepresyjny Telefon Zaufania (Polska)"
                secondary={
                  <Box sx={{ display: 'flex', gap: 2, mt: 0.5 }}>
                    <Link href="tel:224848801" sx={{ cursor: 'pointer' }}>
                      22 484 88 01
                    </Link>
                  </Box>
                }
              />
            </ListItem>

            <ListItem
              sx={{
                bgcolor: 'background.paper',
                mb: 1,
                borderRadius: 1,
              }}
            >
              <ListItemText
                primary="Emergency Services (Polska)"
                secondary={
                  <Link href="tel:112" sx={{ cursor: 'pointer' }}>
                    Call 112
                  </Link>
                }
              />
            </ListItem>

            <ListItem
              sx={{
                bgcolor: 'background.paper',
                borderRadius: 1,
              }}
            >
              <ListItemText
                primary="Telefon Zaufania dla Dzieci i Młodzieży (Polska)"
                secondary="116 123"
              />
            </ListItem>
          </>
        )}

        {/* International Resources */}
        <ListItem
          sx={{
            bgcolor: 'background.paper',
            borderRadius: 1,
            mt: 2,
          }}
        >
          <ListItemText
            primary="International Crisis Resources"
            secondary={
              <Link
                href="https://findahelpline.com"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ cursor: 'pointer' }}
              >
                findahelpline.com
              </Link>
            }
          />
        </ListItem>
      </List>

      <Box
        sx={{
          mt: 2,
          p: 2,
          bgcolor: 'error.dark',
          color: 'error.contrastText',
          borderRadius: 1,
          textAlign: 'center',
        }}
      >
        <Typography
          variant="body2"
          sx={{ fontWeight: 600 }}
        >
          {t('cesd.disclaimer.emergency')}
        </Typography>
      </Box>
    </Alert>
  );
};
