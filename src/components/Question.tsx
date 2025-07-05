import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { type TPhilosophyQuestion } from "../config/base";
import QuoteBox from "./QuoteBox";
import RadioAnswers from "./RadioAnswers";

export default function Question(question: TPhilosophyQuestion) {
  const { t } = useTranslation();
  return (
    <Card
      sx={{
        maxWidth: "100%",
        boxShadow: 3,
        borderRadius: 2,
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: 6,
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        {/* Header with ID and Title */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
          <Chip
            label={question.id}
            color="primary"
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
        </Box>

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
        <RadioAnswers />
      </CardContent>
    </Card>
  );
}
