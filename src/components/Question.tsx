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
import QuoteBox from "./QuoteBox";
import RadioAnswers from "./RadioAnswers";

interface QuestionProps extends TPhilosophyQuestion {
  isChecked?: boolean;
  selectedAnswer?: string;
  onAnswerChange?: (value: string) => void;
}

export default function Question({
  isChecked = false,
  selectedAnswer,
  onAnswerChange,
  ...question
}: QuestionProps) {
  const { t } = useTranslation();
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
          color={isChecked ? "success" : "primary"}
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
          onChange={onAnswerChange}
        />
      </AccordionDetails>
    </Accordion>
  );
}
