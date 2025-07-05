import { ThemeProvider } from "@emotion/react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import {
  Box,
  Button,
  ButtonGroup,
  createTheme,
  CssBaseline,
  Stack,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import "./App.css";
import LanguageSwitcher from "./components/LanguageSwitcher";
import Question from "./components/Question";
import { questions } from "./config/base";
import { useAppDispatch } from "./store/hooks";
import { checkAnswers, clearAnswers } from "./store/questionsSlice";

function App() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const handleCheckAnswers = () => {
    dispatch(checkAnswers());
  };

  const handleClearAnswers = () => {
    dispatch(clearAnswers());
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

        <Box
          sx={{
            width: "100%",
            maxWidth: "lg",
            mx: "auto",
            py: { xs: 2, sm: 4 },
            px: { xs: 2, sm: 3 },
          }}
        >
          {/* Language Switcher */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mb: { xs: 1, sm: 2 },
            }}
          >
            <LanguageSwitcher />
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
        </Box>
      </ThemeProvider>
    </>
  );
}

export default App;
