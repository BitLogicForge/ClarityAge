import React from 'react';
import { Box, Typography, LinearProgress, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface ProgressIndicatorProps {
  current: number;
  total: number;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ current, total }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const progress = ((current + 1) / total) * 100;

  return (
    <Box
      sx={{
        mb: 3,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 1,
        }}
      >
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {t('cesd.intro.timeframe')}
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          {current + 1} / {total}
        </Typography>
      </Box>

      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          height: 8,
          borderRadius: 4,
          bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
          '& .MuiLinearProgress-bar': {
            borderRadius: 4,
            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
          },
        }}
      />
    </Box>
  );
};
