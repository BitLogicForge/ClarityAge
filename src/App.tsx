import { ThemeProvider } from "@emotion/react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Container,
  createTheme,
  CssBaseline,
  Stack,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import "./App.css";
import LanguageSwitcher from "./components/LanguageSwitcher";
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
              {t("app.welcome")}
            </Typography>

            <Stack direction={{ xs: "column" }} spacing={3} sx={{ mt: 4 }}>
              <Card sx={{ flex: 1 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    🎨 {t("features.materialUI.title")}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t("features.materialUI.description")}
                  </Typography>
                </CardContent>
              </Card>

              <Card sx={{ flex: 1 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    ⚡ {t("features.viteReact.title")}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t("features.viteReact.description")}
                  </Typography>
                </CardContent>
              </Card>

              <Card sx={{ flex: 1 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    🚀 {t("features.readyToBuild.title")}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t("features.readyToBuild.description")}
                  </Typography>
                </CardContent>
              </Card>
            </Stack>

            <Box sx={{ mt: 4, textAlign: "center" }}>
              <ButtonGroup variant="contained" size="large" sx={{ gap: 2 }}>
                <Button variant="contained" size="large">
                  {t("buttons.getStarted")}
                </Button>
                <Button variant="outlined" size="large">
                  {t("buttons.learnMore")}
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
