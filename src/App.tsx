import { ThemeProvider } from "@emotion/react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  createTheme,
  CssBaseline,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import "./App.css";
import LanguageSwitcher from "./components/LanguageSwitcher";
import Question from "./components/Question";
import { questions } from "./config/base";
function App() {
  const { t } = useTranslation();
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [checkedQuestions, setCheckedQuestions] = useState<Set<number>>(
    new Set()
  );

  const handleAnswerChange = (questionId: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleCheckAnswers = () => {
    // Mark all answered questions as checked
    const answeredQuestionIds = Object.keys(answers).map(Number);
    setCheckedQuestions(new Set(answeredQuestionIds));
  };

  const handleClearAnswers = () => {
    setAnswers({});
    setCheckedQuestions(new Set());
  };

  const theme = createTheme({
    palette: {
      mode: true ? "dark" : "light",
    },
  });
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Container maxWidth="lg">
          <Box sx={{ py: 4 }}>
            {/* Language Switcher */}
            <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
              <LanguageSwitcher />
            </Box>

            <Typography variant="h2" component="h1" gutterBottom align="center">
              {t("app.title")}
            </Typography>
            <Typography
              variant="h5"
              component="h2"
              gutterBottom
              align="center"
              color="text.secondary"
            >
              {t("app.description")}
            </Typography>

            <Stack direction={{ xs: "column" }} spacing={3} sx={{ mt: 4 }}>
              {questions.map((question) => (
                <Question
                  key={question.title}
                  {...question}
                  isChecked={checkedQuestions.has(question.id)}
                  selectedAnswer={answers[question.id]}
                  onAnswerChange={(value) =>
                    handleAnswerChange(question.id, value)
                  }
                />
              ))}
            </Stack>

            <Box sx={{ mt: 4, textAlign: "center" }}>
              <ButtonGroup variant="contained" size="large" sx={{ gap: 2 }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleCheckAnswers}
                >
                  {t("buttons.checkAnswers")}
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={handleClearAnswers}
                >
                  {t("buttons.clearAnswers")}
                </Button>
              </ButtonGroup>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
