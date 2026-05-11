import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ActionButtons from './ActionButtons';
import './App.css';
import Header from './Header';
import { useNotification } from './NotificationProvider';
import ProgressBar from './ProgressBar';
import QuestionList from './QuestionList';
import ResultsDisplay from './ResultsDisplay';

export default function AppContent() {
  const { t } = useTranslation();
  const { showNotification } = useNotification();

  return (
    <>
      <ProgressBar />

      <Box
        sx={{
          width: '100%',
          maxWidth: 'lg',
          mx: 'auto',
          py: { xs: 2, sm: 4 },
          px: { xs: 2, sm: 3 },
          pt: { xs: 9, sm: 10 }, // Add top padding for floating progress bar
        }}
      >
        <Header />

        <Typography
          variant='h2'
          component='h1'
          gutterBottom
          align='center'
          sx={{ fontSize: { xs: '2rem', sm: '3.75rem' } }}
        >
          {t('app.title')}
        </Typography>

        <Typography
          variant='h5'
          component='h2'
          gutterBottom
          align='center'
          color='text.secondary'
          sx={{
            fontSize: { xs: '1.25rem', sm: '1.5rem' },
            px: { xs: 1, sm: 0 },
          }}
        >
          {t('app.description')}
        </Typography>

        <QuestionList />

        <ResultsDisplay />
        <ActionButtons onShowNotification={showNotification} />
      </Box>
    </>
  );
}
