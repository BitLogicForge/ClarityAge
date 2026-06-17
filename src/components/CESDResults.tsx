import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Alert,
  AlertTitle,
  CircularProgress,
  useTheme,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import type { CESDCategory } from '../types/all.types';
import { CrisisResources } from './CrisisResources';
import { SelfHelpResources } from './SelfHelpResources';

interface CESDResultsProps {
  score: number;
  category: CESDCategory;
  onRestart: () => void;
}

export const CESDResults: React.FC<CESDResultsProps> = ({ score, category, onRestart }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const getCategoryColor = (cat: CESDCategory): string => {
    switch (cat) {
      case 'minimal':
        return 'success';
      case 'mild':
        return 'info';
      case 'moderate':
        return 'warning';
      case 'severe':
        return 'error';
      default:
        return 'info';
    }
  };

  const categoryColor = getCategoryColor(category);

  return (
    <Box
      sx={{
        maxWidth: 900,
        mx: 'auto',
        p: { xs: 2, sm: 4 },
      }}
    >
      {/* Results Header */}
      <Paper
        elevation={3}
        sx={{
          p: { xs: 3, sm: 5 },
          borderRadius: 2,
          textAlign: 'center',
          mb: 3,
          bgcolor: theme.palette.mode === 'dark' ? 'background.paper' : 'background.default',
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ fontWeight: 600 }}
        >
          {t('cesd.results.title')}
        </Typography>

        {/* Score Display */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            my: 4,
          }}
        >
          <Box
            sx={{
              position: 'relative',
              display: 'inline-flex',
            }}
          >
            <CircularProgress
              variant="determinate"
              value={(score / 60) * 100}
              size={120}
              thickness={8}
              sx={{
                color: `${categoryColor}.main`,
                '& .MuiCircularProgress-circle': {
                  strokeLinecap: 'round',
                },
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
              }}
            >
              <Typography
                variant="h3"
                component="div"
                sx={{ fontWeight: 700, lineHeight: 1 }}
              >
                {score}
              </Typography>
              <Typography
                variant="caption"
                component="div"
                sx={{ fontSize: '0.7rem' }}
              >
                {t('cesd.results.outOf')}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Category Badge */}
        <Alert
          severity={categoryColor as any}
          sx={{
            justifyContent: 'center',
            mb: 3,
            '& .MuiAlert-message': {
              width: '100%',
              textAlign: 'center',
            },
          }}
        >
          <AlertTitle sx={{ fontSize: '1.2rem', fontWeight: 600, justifyContent: 'center' }}>
            {t(`cesd.results.${category}.title`)}
          </AlertTitle>
          <Typography variant="body1">
            {t(`cesd.results.${category}.description`)}
          </Typography>
        </Alert>

        {/* Disclaimer */}
        <Alert severity="warning" sx={{ mb: 3 }}>
          <Typography variant="body2">
            {t('cesd.disclaimer.notDiagnostic')}
          </Typography>
        </Alert>
      </Paper>

      {/* Category-specific Interpretation and Recommendations */}
      <Paper
        elevation={2}
        sx={{
          p: { xs: 3, sm: 4 },
          borderRadius: 2,
          mb: 3,
          bgcolor: theme.palette.mode === 'dark' ? 'background.paper' : 'background.default',
        }}
      >
        <Typography
          variant="h6"
          component="h2"
          gutterBottom
          sx={{ fontWeight: 600 }}
        >
          {t('cesd.results.categoryLabel')}
        </Typography>

        <Alert severity={categoryColor as any} sx={{ mb: 3 }}>
          <Typography
            variant="body2"
            component="div"
            sx={{ fontWeight: 500 }}
          >
            {t(`cesd.results.${category}.interpretation`)}
          </Typography>
        </Alert>

        <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600, mt: 3 }}>
          {t('cesd.results.categoryLabel') + ': ' + t(`cesd.results.${category}.title`)}
        </Typography>

        <Typography
          variant="body1"
          component="div"
          sx={{ lineHeight: 1.8 }}
        >
          {t(`cesd.results.${category}.recommendations`)}
        </Typography>
      </Paper>

      {/* Crisis Resources for severe cases */}
      {category === 'severe' && <CrisisResources />}

      {/* Self-help resources for moderate and severe */}
      {(category === 'moderate' || category === 'severe') && <SelfHelpResources />}

      {/* Educational Resources for all categories */}
      <Paper
        elevation={2}
        sx={{
          p: { xs: 3, sm: 4 },
          borderRadius: 2,
          mb: 3,
          bgcolor: theme.palette.mode === 'dark' ? 'background.paper' : 'background.default',
        }}
      >
        <Typography
          variant="h6"
          component="h2"
          gutterBottom
          sx={{ fontWeight: 600 }}
        >
          {t('cesd.resources.education.title')}
        </Typography>

        <Typography variant="body2" sx={{ mb: 2 }}>
          {t('cesd.resources.education.description')}
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography variant="body2">
            • {t('cesd.resources.education.common')}
          </Typography>
          <Typography variant="body2">
            • {t('cesd.resources.education.treatable')}
          </Typography>
          <Typography variant="body2">
            • {t('cesd.resources.education.recovery')}
          </Typography>
        </Box>
      </Paper>

      {/* Action Buttons */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 2,
          flexWrap: 'wrap',
          mt: 4,
        }}
      >
        <Button
          variant="outlined"
          size="large"
          onClick={onRestart}
          sx={{ px: 3, py: 1.5 }}
        >
          {t('cesd.actions.retake')}
        </Button>

        <Button
          variant="contained"
          size="large"
          onClick={() => window.print()}
          sx={{ px: 3, py: 1.5 }}
        >
          {t('cesd.actions.print')}
        </Button>
      </Box>

      {/* Privacy Notice */}
      <Box
        sx={{
          mt: 4,
          p: 2,
          bgcolor: 'text.primary',
          color: 'background.paper',
          borderRadius: 1,
          textAlign: 'center',
        }}
      >
        <Typography variant="caption">
          {t('cesd.privacy.title')}: {t('cesd.privacy.description')}
        </Typography>
      </Box>
    </Box>
  );
};
