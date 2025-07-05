import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { questions } from "../config/base";
import { useAppSelector } from "../store/hooks";

export default function ResultsDisplay() {
  const { t } = useTranslation();
  const { answers } = useAppSelector((state) => state.questions);

  const totalQuestions = questions.length;
  const answeredQuestions = Object.keys(answers).length;
  const allAnswered = answeredQuestions === totalQuestions;

  if (!allAnswered) {
    return null;
  }

  return (
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
      <Typography variant="body1">{t("results.placeholder")}</Typography>
      <Typography variant="h4" sx={{ mt: 2, fontWeight: "bold" }}>
        {Math.round((answeredQuestions / totalQuestions) * 100)}%
      </Typography>
    </Box>
  );
}
