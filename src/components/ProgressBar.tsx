import { Box, LinearProgress, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { questions } from "../config/base";
import { useAppSelector } from "../store/hooks";
import { useTheme } from "./ThemeProvider";

export default function ProgressBar() {
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();
  const { answers, appState } = useAppSelector((state) => state.questions);

  // Hide progress bar when questionnaire is completed
  if (appState === "completed") {
    return null;
  }

  const totalQuestions = questions.length;
  const answeredQuestions = Object.keys(answers).length;
  const progress = (answeredQuestions / totalQuestions) * 100;
  const allAnswered = answeredQuestions === totalQuestions;

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: isDarkMode
          ? "rgba(18, 18, 18, 0.95)"
          : "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(10px)",
        borderBottom: `1px solid ${
          isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"
        }`,
        transition: "all 0.3s ease",
      }}
    >
      <Box sx={{ px: { xs: 2, sm: 3 }, py: 1 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
            maxWidth: "lg",
            mx: "auto",
          }}
        >
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ fontSize: "0.75rem" }}
          >
            {t("progress.label")}
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ fontSize: "0.75rem" }}
          >
            {answeredQuestions}/{totalQuestions}
          </Typography>
        </Box>
        <Box sx={{ maxWidth: "lg", mx: "auto" }}>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 4,
              borderRadius: 2,
              backgroundColor: "action.hover",
              "& .MuiLinearProgress-bar": {
                borderRadius: 2,
                background: allAnswered
                  ? "linear-gradient(90deg, #4caf50 0%, #2e7d32 100%)"
                  : "linear-gradient(90deg, #2196f3 0%, #1976d2 100%)",
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
