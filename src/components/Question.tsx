import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Chip,
  Divider,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { type TPhilosophyQuestion } from "../config/base";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setAnswer } from "../store/questionsSlice";
import QuoteBox from "./QuoteBox";
import RadioAnswers from "./RadioAnswers";

interface QuestionProps extends TPhilosophyQuestion {}

export default function Question(question: QuestionProps) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { answers, hasBeenChecked } = useAppSelector(
    (state) => state.questions
  );

  const selectedAnswer = answers[question.id];
  const hasAnswer = !!selectedAnswer;

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

  return (
    <Accordion
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
            gap: 2,
          },
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

      <AccordionDetails sx={{ px: 3, pb: 3 }}>
        {/* Description */}
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            mb: 3,
            lineHeight: 1.6,
          }}
        >
          {t(question.description)}
        </Typography>

        {/* Quote Section */}
        <QuoteBox quote={question.quote} author={question.author} />

        <Divider sx={{ mb: 3 }} />

        {/* Main Question */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 500,
            color: "text.primary",
            mb: 3,
            fontSize: "1.1rem",
            lineHeight: 1.4,
          }}
        >
          {t(question.question)}
        </Typography>

        {/* Radio Group */}
        <RadioAnswers
          selectedValue={selectedAnswer}
          onChange={handleAnswerChange}
        />
      </AccordionDetails>
    </Accordion>
  );
}
