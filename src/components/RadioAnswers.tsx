import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { useTranslation } from "react-i18next";
import { likertScaleMarks } from "../config/base";

interface RadioAnswersProps {
  selectedValue?: string;
  onChange?: (value: string) => void;
}

export default function RadioAnswers({
  selectedValue,
  onChange,
}: RadioAnswersProps) {
  const { t } = useTranslation();
  return (
    <RadioGroup
      value={selectedValue || ""}
      onChange={(event) => onChange?.(event.target.value)}
      sx={{
        gap: 1,
        "& .MuiFormControlLabel-root": {
          ml: 0,
          mr: 0,
          py: 0.5,
          px: 2,
          borderRadius: 1,
          transition: "all 0.2s ease",
          "&:hover": {
            backgroundColor: "action.hover",
          },
        },
        "& .MuiRadio-root": {
          color: "primary.main",
          "&.Mui-checked": {
            color: "primary.main",
          },
        },
        "& .MuiFormControlLabel-label": {
          fontSize: "0.9rem",
          fontWeight: 500,
        },
      }}
    >
      {likertScaleMarks.map((mark) => (
        <FormControlLabel
          key={mark.value}
          value={mark.value}
          control={<Radio />}
          label={t(mark.label) ?? ""}
        />
      ))}
    </RadioGroup>
  );
}
