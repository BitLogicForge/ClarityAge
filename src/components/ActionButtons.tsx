import { Box, Button, ButtonGroup } from "@mui/material";
import { useTranslation } from "react-i18next";
import { questions } from "../config/base";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { checkAnswers, clearAnswers } from "../store/questionsSlice";

interface ActionButtonsProps {
  onShowNotification: (
    message: string,
    severity: "success" | "error" | "warning" | "info"
  ) => void;
}

export default function ActionButtons({
  onShowNotification,
}: ActionButtonsProps) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { answers, appState } = useAppSelector((state) => state.questions);

  const totalQuestions = questions.length;
  const answeredQuestions = Object.keys(answers).length;
  const allAnswered = answeredQuestions === totalQuestions;

  const handleCheckAnswers = () => {
    if (!allAnswered) {
      onShowNotification(t("validation.incomplete"), "warning");
      return;
    }

    dispatch(checkAnswers());
    onShowNotification(t("validation.complete"), "success");
  };

  const handleClearAnswers = () => {
    dispatch(clearAnswers());
    onShowNotification(t("validation.cleared"), "info");
  };

  const handleDoItAgain = () => {
    dispatch(clearAnswers());
    onShowNotification(t("validation.restart"), "info");
  };

  // Show different buttons based on app state
  if (appState === "completed") {
    return (
      <Box
        sx={{
          mt: { xs: 3, sm: 4 },
          textAlign: "center",
          px: { xs: 1, sm: 0 },
        }}
      >
        <Button
          variant="contained"
          size="large"
          onClick={handleDoItAgain}
          sx={{
            width: { xs: "100%", sm: "auto" },
            minWidth: 200,
          }}
        >
          {t("buttons.doItAgain")}
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        mt: { xs: 3, sm: 4 },
        textAlign: "center",
        px: { xs: 1, sm: 0 },
      }}
    >
      {allAnswered ? (
        // Show "Do It Again" button when completed
        <Button
          variant="contained"
          size="large"
          onClick={handleDoItAgain}
          sx={{
            width: { xs: "100%", sm: "auto" },
            minWidth: { sm: 200 },
          }}
        >
          🔄 {t("buttons.doItAgain")}
        </Button>
      ) : (
        // Show normal buttons when not completed
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
      )}
    </Box>
  );
}
