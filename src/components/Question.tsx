import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { type TPhilosophyQuestion } from "../config/base";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setAnswer, setExpandedQuestion } from "../store/questionsSlice";
import QuoteBox from "./QuoteBox";
import RadioAnswers from "./RadioAnswers";
interface QuestionProps extends TPhilosophyQuestion {}

export default function Question(question: QuestionProps) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { answers, hasBeenChecked, expandedQuestion } = useAppSelector(
    (state) => state.questions
  );

  const selectedAnswer = answers[question.id];
  const hasAnswer = !!selectedAnswer;
  const isExpanded = expandedQuestion === question.id;

  // Determine chip color based on state
  const getChipColor = () => {
    if (hasAnswer) {
      return "success"; // Green if answered
    } else if (hasBeenChecked) {
      return "error"; // Red if checked but no answer
    } else {
      return "primary"; // Blue if not checked yet
    }
  };

  const handleAnswerChange = (value: string) => {
    dispatch(setAnswer({ questionId: question.id, value }));
  };

  const handleAccordionChange = (
    _event: React.SyntheticEvent,
    isExpanded: boolean
  ) => {
    dispatch(setExpandedQuestion(isExpanded ? question.id : null));
  };
  const commonPaperSx = {
    p: 2,
    my: 2,
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
    alignItems: "center",
    gap: 1,
  };
  const boxSx = {
    whiteSpace: "nowrap",
    width: "260px",
    display: "flex",
    alignItems: "center",
    gap: 1,
  };
  return (
    <Accordion
      expanded={isExpanded}
      onChange={handleAccordionChange}
      sx={{
        maxWidth: "100%",
        boxShadow: 2,
        borderRadius: "8px !important",
        "&:before": {
          display: "none",
        },
        "&.Mui-expanded": {
          boxShadow: 4,
        },
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`panel-${question.id}-content`}
        id={`panel-${question.id}-header`}
        sx={{
          "& .MuiAccordionSummary-content": {
            alignItems: "center",
            gap: { xs: 1, sm: 2 }, // Reduce gap on mobile
          },
          px: { xs: 2, sm: 3 }, // Reduce padding on mobile
        }}
      >
        <Chip
          label={question.id}
          color={getChipColor()}
          size="medium"
          sx={{ fontWeight: "bold" }}
        />
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: "primary.main",
            flex: 1,
          }}
        >
          {t(question.title)}
        </Typography>
      </AccordionSummary>

      <AccordionDetails sx={{ px: { xs: 2, sm: 3 }, pb: { xs: 2, sm: 3 } }}>
        {/* Description */}
        <Paper elevation={2} sx={{ p: 2, my: 2 }}>
          <Typography variant="body1">{t(question.description)}</Typography>
        </Paper>
        <QuoteBox quote={question.quote} author={question.author} />

        <Divider sx={{ mb: { xs: 2, sm: 3 } }} />

        <Paper elevation={2} sx={commonPaperSx}>
          <Box sx={boxSx}>
            <AssignmentTurnedInIcon color="warning" sx={{ fontSize: 32 }} />
            <Typography variant="h5" color="warning">
              {t("labels.action_item")}
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ flex: 1 }}>
            {t(question.actionItem)}
          </Typography>
        </Paper>

        <Paper elevation={2} sx={commonPaperSx}>
          <Box sx={boxSx}>
            <CheckCircleIcon color="success" sx={{ fontSize: 36 }} />
            <Typography variant="h5" color="green">
              {t("labels.affirmation")}
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ flex: 1 }}>
            {t(question.affirmation)}
          </Typography>
        </Paper>

        <Paper elevation={2} sx={commonPaperSx}>
          <Box sx={boxSx}>
            <ReportProblemIcon color="error" sx={{ fontSize: 32 }} />
            <Typography variant="h5" color="error">
              {t("labels.common_pitfall")}
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ flex: 1 }}>
            {t(question.commonPitfall)}{" "}
          </Typography>
        </Paper>

        <Paper elevation={2} sx={commonPaperSx}>
          <Box sx={boxSx}>
            <HelpOutlineIcon color="secondary" sx={{ fontSize: 32 }} />
            <Typography variant="h5" color="secondary">
              {t("labels.question")}
            </Typography>
          </Box>
          <Typography variant="body1" sx={{ flex: 1 }}>
            {t(question.question)}
          </Typography>
        </Paper>

        <RadioAnswers
          selectedValue={selectedAnswer}
          onChange={handleAnswerChange}
        />
      </AccordionDetails>
    </Accordion>
  );
}
