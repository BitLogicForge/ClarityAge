import { ThemeProvider } from "@emotion/react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  createTheme,
  CssBaseline,
  IconButton,
  LinearProgress,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import "./App.css";
import LanguageSwitcher from "./components/LanguageSwitcher";
import Question from "./components/Question";
import { questions } from "./config/base";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { checkAnswers, clearAnswers } from "./store/questionsSlice";

function App() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { answers } = useAppSelector((state) => state.questions);

  // Theme state
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Snackbar state
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info" as "success" | "error" | "warning" | "info",
  });

  // Calculate progress
  const totalQuestions = questions.length;
  const answeredQuestions = Object.keys(answers).length;
  const progress = (answeredQuestions / totalQuestions) * 100;
  const allAnswered = answeredQuestions === totalQuestions;

  const handleCheckAnswers = () => {
    if (!allAnswered) {
      setSnackbar({
        open: true,
        message: t("validation.incomplete"),
        severity: "warning",
      });
      return;
    }

    dispatch(checkAnswers());
    setSnackbar({
      open: true,
      message: t("validation.complete"),
      severity: "success",
    });
  };

  const handleClearAnswers = () => {
    dispatch(clearAnswers());
    setSnackbar({
      open: true,
      message: t("validation.cleared"),
      severity: "info",
    });
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
    },
  });
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Box
          sx={{
            width: "100%",
            maxWidth: "lg",
            mx: "auto",
            py: { xs: 2, sm: 4 },
            px: { xs: 2, sm: 3 },
          }}
        >
          {/* Header with Language Switcher and Theme Toggle */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: { xs: 1, sm: 2 },
            }}
          >
            <IconButton
              onClick={toggleTheme}
              sx={{ color: "primary.main" }}
              aria-label="toggle theme"
            >
              {isDarkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>

            <LanguageSwitcher />
          </Box>

          {/* Progress Bar */}
          <Box sx={{ mb: 3 }}>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography variant="body2" color="text.secondary">
                {t("progress.label")}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {answeredQuestions}/{totalQuestions}
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 8,
                borderRadius: 4,
                backgroundColor: "action.hover",
                "& .MuiLinearProgress-bar": {
                  borderRadius: 4,
                },
              }}
            />
          </Box>

          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            align="center"
            sx={{ fontSize: { xs: "2rem", sm: "3.75rem" } }}
          >
            {t("app.title")}
          </Typography>
          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            align="center"
            color="text.secondary"
            sx={{
              fontSize: { xs: "1.25rem", sm: "1.5rem" },
              px: { xs: 1, sm: 0 },
            }}
          >
            {t("app.description")}
          </Typography>

          <Stack
            direction={{ xs: "column" }}
            spacing={{ xs: 2, sm: 3 }}
            sx={{ mt: { xs: 2, sm: 4 } }}
          >
            {questions.map((question) => (
              <Question key={question.title} {...question} />
            ))}
          </Stack>

          <Box
            sx={{
              mt: { xs: 3, sm: 4 },
              textAlign: "center",
              px: { xs: 1, sm: 0 },
            }}
          >
            <ButtonGroup
              variant="contained"
              size="large"
              sx={{
                gap: { xs: 1, sm: 2 },
                flexDirection: { xs: "column", sm: "row" },
                width: { xs: "100%", sm: "auto" },
              }}
            >
              <Button
                variant="contained"
                size="large"
                onClick={handleCheckAnswers}
                sx={{ width: { xs: "100%", sm: "auto" } }}
              >
                {t("buttons.checkAnswers")}
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={handleClearAnswers}
                sx={{ width: { xs: "100%", sm: "auto" } }}
              >
                {t("buttons.clearAnswers")}
              </Button>
            </ButtonGroup>
          </Box>

          {/* Results Placeholder */}
          {allAnswered && (
            <Box
              sx={{
                mt: 4,
                p: 3,
                borderRadius: 2,
                backgroundColor: "success.light",
                color: "success.contrastText",
                textAlign: "center",
              }}
            >
              <Typography variant="h6" gutterBottom>
                🎉 {t("results.title")}
              </Typography>
              <Typography variant="body1">
                {t("results.placeholder")}
              </Typography>
              <Typography variant="h4" sx={{ mt: 2, fontWeight: "bold" }}>
                {Math.round((answeredQuestions / totalQuestions) * 100)}%
              </Typography>
            </Box>
          )}
        </Box>

        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </ThemeProvider>
    </>
  );
}

export default App;
