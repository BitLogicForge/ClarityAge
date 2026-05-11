import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import {
  Box,
  Button,
  ButtonGroup,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { likertScaleMarks } from "../types/all.types";

interface RadioAnswersProps {
  selectedValue?: string;
  onChange?: (value: string) => void;
}

export default function RadioAnswers({
  selectedValue,
  onChange,
}: RadioAnswersProps) {
  const { t } = useTranslation();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClick = (value: number) => {
    onChange?.(value.toString());
  };

  const selectedLabel = likertScaleMarks.find(
    mark => mark.value.toString() === selectedValue
  )?.label;

  return (
    <Box>
      <ButtonGroup
        variant="outlined"
        fullWidth
        orientation={isSmall ? "vertical" : "horizontal"}
        aria-label={t("labels.answer_scale")}
      >
        {likertScaleMarks.map(mark => {
          const isSelected = selectedValue === mark.value.toString();

          return (
            <Button
              key={mark.value}
              onClick={() => handleClick(mark.value)}
              variant={isSelected ? "contained" : "outlined"}
              aria-pressed={isSelected}
            >
              {t(mark.label)}
            </Button>
          );
        })}
      </ButtonGroup>

      {selectedLabel && (
        <Typography
          variant="body2"
          sx={{
            mt: 1,
            textAlign: "center",
            color: "primary.main",
            fontWeight: 500,
          }}
        >
          {t("labels.selected_answer")}: {t(selectedLabel)}
        </Typography>
      )}
    </Box>
  );
}
