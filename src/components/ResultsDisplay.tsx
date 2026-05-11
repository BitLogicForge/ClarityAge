import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { questions } from '../config/base';
import { useAppSelector } from '../store/hooks';

const getAverageScore = (answers: Record<number, string>) => {
  const values = Object.values(answers).map(Number);

  if (values.length === 0) {
    return 0;
  }

  return values.reduce((sum, value) => sum + value, 0) / values.length;
};

export default function ResultsDisplay() {
  const { t } = useTranslation();
  const { answers, appState } = useAppSelector(state => state.questions);

  const totalQuestions = questions.length;
  const answeredQuestions = Object.keys(answers).length;
  const completionPercent = Math.round((answeredQuestions / totalQuestions) * 100);
  const averageScore = getAverageScore(answers);
  const reflectionTone =
    averageScore > 0.75
      ? t('results.tone.aligned')
      : averageScore < -0.75
        ? t('results.tone.questioning')
        : t('results.tone.balanced');

  if (appState !== 'completed') {
    return null;
  }

  return (
    <Box
      sx={{
        mt: 4,
        p: 3,
        borderRadius: 2,
        backgroundColor: 'success.light',
        color: 'success.contrastText',
        textAlign: 'center',
      }}
    >
      <Typography variant='h6' gutterBottom>
        {t('results.title')}
      </Typography>
      <Typography variant='body1'>{reflectionTone}</Typography>
      <Typography variant='h4' sx={{ mt: 2, fontWeight: 'bold' }}>
        {completionPercent}%
      </Typography>
      <Typography variant='body2'>{t('results.completion')}</Typography>
    </Box>
  );
}
