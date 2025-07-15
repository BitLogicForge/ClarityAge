import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Box, Button, ButtonGroup, Typography } from "@mui/material";
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

  const handleClick = (value: number) => {
    onChange?.(value.toString());
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* Button Group for Selection */}
      <ButtonGroup
        variant="outlined"
        fullWidth
        sx={{
          "& .MuiButton-root": {
            minWidth: "auto",
            flex: 1,
            py: 1.5,
            px: { xs: 1, sm: 2 },
            fontSize: { xs: "0.75rem", sm: "0.875rem" },
            fontWeight: 500,
            borderColor: "divider",
            color: "text.secondary",
            textTransform: "none",
            "&:hover": {
              borderColor: "primary.main",
              backgroundColor: "primary.50",
              color: "primary.main",
            },
            "&.selected": {
              backgroundColor: "primary.main",
              color: "primary.contrastText",
              borderColor: "primary.main",
              "&:hover": {
                backgroundColor: "primary.dark",
                borderColor: "primary.dark",
                color: "primary.contrastText",
              },
            },
          },
        }}
      >
        {likertScaleMarks.map((mark) => (
          <Button
            key={mark.value}
            onClick={() => handleClick(mark.value)}
            className={
              selectedValue === mark.value.toString() ? "selected" : ""
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
