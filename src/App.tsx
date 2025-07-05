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
import { useTranslation } from "react-i18next";
import "./App.css";
import LanguageSwitcher from "./components/LanguageSwitcher";
import Question from "./components/Question";
import { questions } from "./config/base";
function App() {
  const { t } = useTranslation();
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
                <Question key={question.title} {...question} />
              ))}
            </Stack>

            <Box sx={{ mt: 4, textAlign: "center" }}>
              <ButtonGroup variant="contained" size="large" sx={{ gap: 2 }}>
                <Button variant="contained" size="large">
                  {t("buttons.checkAnswers")}
                </Button>
                <Button variant="outlined" size="large">
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
