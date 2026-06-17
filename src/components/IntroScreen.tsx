import React from 'react';
import { Box, Typography, Paper, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';

interface IntroScreenProps {
  onStart: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onStart }) => {
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
            mb: 3,
            textAlign: 'center',
          }}
        >
          {t('cesd.intro.title')}
        </Typography>

        {/* Description */}
        <Typography
          variant="body1"
          sx={{
            mb: 3,
            lineHeight: 1.8,
            textAlign: 'center',
          }}
        >
          {t('cesd.intro.description')}
        </Typography>

        {/* Timeframe */}
        <Box
          sx={{
            p: 3,
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            borderRadius: 2,
            mb: 3,
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h6"
            component="h2"
            sx={{ fontWeight: 600, mb: 1 }}
          >
            {t('cesd.intro.timeframe')}
          </Typography>
          <Typography variant="body2">
            {t('cesd.intro.instructions')}
          </Typography>
        </Box>

        {/* Assessment Info */}
        <Box
          sx={{
            mb: 4,
            p: 3,
            bgcolor: 'info.main',
            color: 'info.contrastText',
            borderRadius: 2,
          }}
        >
          <Typography variant="body2" component="div">
            <strong>Assessment Information:</strong>
            <ul style={{ margin: '10px 0', paddingLeft: '20px' }}>
              <li>20 questions about how you've felt during the past week</li>
              <li>Each question has 4 response options</li>
              <li>Takes approximately 5-10 minutes to complete</li>
              <li>Completely confidential - no data is stored</li>
            </ul>
          </Typography>
        </Box>

        {/* Start Button */}
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
            onClick={onStart}
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
            {t('cesd.intro.getStarted')}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};
