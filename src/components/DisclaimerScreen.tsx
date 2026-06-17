import React from 'react';
import { Box, Typography, Button, Alert, Paper, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface DisclaimerScreenProps {
  onAccept: () => void;
}

export const DisclaimerScreen: React.FC<DisclaimerScreenProps> = ({ onAccept }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Box
      sx={{
        maxWidth: 800,
        mx: 'auto',
        p: { xs: 2, sm: 4 },
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: { xs: 3, sm: 5 },
          borderRadius: 2,
          bgcolor: theme.palette.mode === 'dark' ? 'background.paper' : 'background.default',
        }}
      >
        {/* Title */}
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 600,
            color: 'error.main',
            mb: 3,
          }}
        >
          {t('cesd.disclaimer.title')}
        </Typography>

        {/* Main disclaimer text */}
        <Alert
          severity="warning"
          sx={{
            mb: 3,
            '& .MuiAlert-icon': {
              fontSize: '2rem',
            },
          }}
        >
          <Typography variant="body1" component="div">
            {t('cesd.disclaimer.text')}
          </Typography>
        </Alert>

        {/* Additional disclaimers */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 500,
              mb: 1,
              color: 'text.secondary',
            }}
          >
            {t('cesd.disclaimer.notDiagnostic')}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 500,
              mb: 1,
              color: 'text.secondary',
            }}
          >
            {t('cesd.disclaimer.notReplacement')}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 500,
              color: 'error.main',
            }}
          >
            {t('cesd.disclaimer.emergency')}
          </Typography>
        </Box>

        {/* Privacy notice */}
        <Box
          sx={{
            p: 2,
            bgcolor: 'info.main',
            color: 'info.contrastText',
            borderRadius: 1,
            mb: 4,
          }}
        >
          <Typography variant="body2" component="div">
            <strong>{t('cesd.privacy.title')}</strong>
            <br />
            {t('cesd.privacy.description')}
          </Typography>
        </Box>

        {/* Accept button */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: 4,
          }}
        >
          <Button
            variant="contained"
            size="large"
            onClick={onAccept}
            sx={{
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              bgcolor: 'primary.main',
              '&:hover': {
                bgcolor: 'primary.dark',
              },
            }}
          >
            {t('cesd.disclaimer.agree')}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};
