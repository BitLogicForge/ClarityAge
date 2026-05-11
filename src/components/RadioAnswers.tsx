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

  return (
    <Box>
      {/* Button Group for Selection */}
      <ButtonGroup
        variant="outlined"
        fullWidth
        orientation={isSmall ? "vertical" : "horizontal"}
      >
        {likertScaleMarks.map((mark) => (
          <Button
            key={mark.value}
            onClick={() => handleClick(mark.value)}
            variant={
              selectedValue === mark.value.toString() ? "contained" : "outlined"
            }
          >
            {t(mark.label)}
          </Button>
        ))}
      </ButtonGroup>

      {/* Selected Answer Display */}
      {selectedValue && (
        <Typography
          variant="body2"
          sx={{
            mt: 1,
            textAlign: "center",
            color: "primary.main",
            fontWeight: 500,
          }}
        >
          ✓{" "}
          {t(
            likertScaleMarks.find((m) => m.value.toString() === selectedValue)
              ?.label || ""
          )}
        </Typography>
      )}
    </Box>
  );
}
