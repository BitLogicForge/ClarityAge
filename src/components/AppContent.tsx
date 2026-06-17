import { Box, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { startAssessment, setAnswer, nextQuestion, previousQuestion, calculateAndComplete, reset } from '../store/cesdSlice';
import { cesdQuestions } from '../config/cesd';
import Header from './Header';
import { DisclaimerScreen } from './DisclaimerScreen';
import { CESDQuestion } from './CESDQuestion';
import { ProgressIndicator } from './ProgressIndicator';
import { NavigationButtons } from './NavigationButtons';
import { CESDResults } from './CESDResults';

export default function AppContent() {
  const dispatch = useAppDispatch();
  const { started, currentQuestion, answers, completed, score, category } = useAppSelector(
    (state) => state.cesd
  );

  const currentQuestionData = cesdQuestions[currentQuestion];
  const currentAnswer = answers[currentQuestionData.id];

  const handleAcceptDisclaimer = () => {
    dispatch(startAssessment());
  };

  const handleAnswer = (value: number) => {
    dispatch(setAnswer({ questionId: currentQuestionData.id, value }));
  };

  const handleNext = () => {
    dispatch(nextQuestion());
  };

  const handlePrevious = () => {
    dispatch(previousQuestion());
  };

  const handleSubmit = () => {
    dispatch(calculateAndComplete());
  };

  const handleRestart = () => {
    dispatch(reset());
  };

  const hasAnswer = currentAnswer !== undefined;

  // Not started - show disclaimer
  if (!started) {
    return (
      <Box sx={{ width: '100%', maxWidth: 'lg', mx: 'auto', py: { xs: 2, sm: 4 }, px: { xs: 2, sm: 3 } }}>
        <DisclaimerScreen onAccept={handleAcceptDisclaimer} />
      </Box>
    );
  }

  // Completed - show results
  if (completed && score !== null && category !== null) {
    return (
      <Box sx={{ width: '100%', maxWidth: 'lg', mx: 'auto', py: { xs: 2, sm: 4 }, px: { xs: 2, sm: 3 } }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" sx={{ textAlign: 'center', fontWeight: 600 }}>
            CES-D Assessment Results
          </Typography>
        </Box>
        <CESDResults score={score} category={category} onRestart={handleRestart} />
      </Box>
    );
  }

  // In progress - show questions
  return (
    <Box sx={{ width: '100%', maxWidth: 'lg', mx: 'auto', py: { xs: 2, sm: 4 }, px: { xs: 2, sm: 3 } }}>
      <Box sx={{ mb: 4 }}>
        <Header />
        <Typography
          variant="h5"
          component="h1"
          sx={{
            textAlign: 'center',
            fontWeight: 600,
            mb: 1,
            mt: 2,
          }}
        >
          CES-D Assessment
        </Typography>
        <Typography
          variant="body2"
          sx={{
            textAlign: 'center',
            color: 'text.secondary',
          }}
        >
          Center for Epidemiologic Studies Depression Scale
        </Typography>
      </Box>

      <ProgressIndicator current={currentQuestion} total={cesdQuestions.length} />

      <CESDQuestion
        question={currentQuestionData}
        value={currentAnswer}
        onChange={handleAnswer}
        questionNumber={currentQuestion + 1}
      />

      <NavigationButtons
        currentQuestion={currentQuestion}
        totalQuestions={cesdQuestions.length}
        hasAnswer={hasAnswer}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onSubmit={handleSubmit}
      />
    </Box>
  );
}
