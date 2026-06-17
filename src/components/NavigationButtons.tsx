import React from 'react';
import { Box, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface NavigationButtonsProps {
  currentQuestion: number;
  totalQuestions: number;
  hasAnswer: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

export const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  currentQuestion,
  totalQuestions,
  hasAnswer,
  onPrevious,
  onNext,
  onSubmit,
}) => {
  const { t } = useTranslation();

  const isLastQuestion = currentQuestion === totalQuestions - 1;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: 2,
        mt: 3,
        mb: 4,
      }}
    >
      {/* Previous Button */}
      <Button
        variant="outlined"
        onClick={onPrevious}
        disabled={currentQuestion === 0}
        sx={{
          px: 3,
          py: 1.5,
          minWidth: 120,
        }}
      >
        {t('buttons.previous')}
      </Button>

      {/* Next/Submit Button */}
      {isLastQuestion ? (
        <Button
          variant="contained"
          onClick={onSubmit}
          disabled={!hasAnswer}
          sx={{
            px: 3,
            py: 1.5,
            minWidth: 120,
            bgcolor: 'primary.main',
            '&:hover': {
              bgcolor: 'primary.dark',
            },
            '&:disabled': {
              bgcolor: 'text.disabled',
            },
          }}
        >
          {t('buttons.submit')}
        </Button>
      ) : (
        <Button
          variant="contained"
          onClick={onNext}
          disabled={!hasAnswer}
          sx={{
            px: 3,
            py: 1.5,
            minWidth: 120,
            bgcolor: 'primary.main',
            '&:hover': {
              bgcolor: 'primary.dark',
            },
            '&:disabled': {
              bgcolor: 'text.disabled',
            },
          }}
        >
          {t('buttons.next')}
        </Button>
      )}
    </Box>
  );
};
