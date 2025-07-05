import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { TPhilosophyQuestion } from "../config/base";

type TProps = Pick<TPhilosophyQuestion, "quote" | "author">;

export default function QuoteBox({ quote, author }: TProps) {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        mt: 2,
        mb: 2,
        p: 2,
        backgroundColor: "action.hover",
        borderLeft: 4,
        borderColor: "primary.main",
        borderRadius: 2,
      }}
    >
      <Typography
        variant="body2"
        sx={{
          fontStyle: "italic",
          color: "text.primary",
          mb: 1,
          lineHeight: 1.6,
        }}
      >
        "{t(quote)}"
      </Typography>
      <Typography
        variant="caption"
        sx={{
          color: "text.secondary",
          fontWeight: 500,
          textAlign: "right",
          display: "block",
        }}
      >
        — {t(author)}
      </Typography>
    </Box>
  );
}
