import React from 'react';
import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Paper,
  useTheme,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import type { TCESDQuestion } from '../types/all.types';

interface CESDQuestionProps {
  question: TCESDQuestion;
  value: number | undefined;
  onChange: (value: number) => void;
  questionNumber: number;
}

export const CESDQuestion: React.FC<CESDQuestionProps> = ({
  question,
  value,
  onChange,
  questionNumber,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Paper
      elevation={2}
      sx={{
        p: { xs: 3, sm: 4 },
        mb: 3,
        borderRadius: 2,
        bgcolor: theme.palette.mode === 'dark' ? 'background.paper' : 'background.default',
      }}
    >
      {/* Question header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Box
          sx={{
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            width: 40,
            height: 40,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 600,
            fontSize: '1.1rem',
            mr: 2,
          }}
        >
          {questionNumber}
        </Box>
        <Typography
          variant="subtitle2"
          sx={{
            color: 'text.secondary',
            fontSize: '0.9rem',
          }}
        >
          {t('labels.question')} {questionNumber} {t('labels.of')} 20
        </Typography>
      </Box>

      {/* Question text */}
      <Typography
        variant="h6"
        component="h2"
        sx={{
          mb: 3,
          fontWeight: 500,
          lineHeight: 1.4,
        }}
      >
        {t(question.text)}
      </Typography>

      {/* Response options */}
      <RadioGroup
        value={value ?? ''}
        onChange={(e) => onChange(parseInt(e.target.value, 10))}
        sx={{
          '& .MuiFormControlLabel-root': {
            mb: 1,
          },
        }}
      >
        <FormControlLabel
          value={0}
          control={<Radio />}
          label={
            <Typography
              variant="body1"
              sx={{ fontSize: '1rem', fontWeight: value === 0 ? 500 : 400 }}
            >
              {t('cesd.responses.r0')}
            </Typography>
          }
        />
        <FormControlLabel
          value={1}
          control={<Radio />}
          label={
            <Typography
              variant="body1"
              sx={{ fontSize: '1rem', fontWeight: value === 1 ? 500 : 400 }}
            >
              {t('cesd.responses.r1')}
            </Typography>
          }
        />
        <FormControlLabel
          value={2}
          control={<Radio />}
          label={
            <Typography
              variant="body1"
              sx={{ fontSize: '1rem', fontWeight: value === 2 ? 500 : 400 }}
            >
              {t('cesd.responses.r2')}
            </Typography>
          }
        />
        <FormControlLabel
          value={3}
          control={<Radio />}
          label={
            <Typography
              variant="body1"
              sx={{ fontSize: '1rem', fontWeight: value === 3 ? 500 : 400 }}
            >
              {t('cesd.responses.r3')}
            </Typography>
          }
        />
      </RadioGroup>
    </Paper>
  );
};
