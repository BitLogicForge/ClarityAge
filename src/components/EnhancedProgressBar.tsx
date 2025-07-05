import CheckIcon from "@mui/icons-material/Check";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import {
  Box,
  Breadcrumbs,
  CircularProgress,
  Link,
  Paper,
  Step,
  StepConnector,
  stepConnectorClasses,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { questions } from "../config/base";
import { useAppSelector } from "../store/hooks";
import { useTheme } from "./ThemeProvider";

const CustomStepConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      background: `linear-gradient(90deg, ${theme.palette.success.main} 0%, ${theme.palette.success.dark} 100%)`,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: theme.palette.grey[300],
    borderRadius: 1,
  },
}));

const CustomStepIcon = styled("div")<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor: ownerState.completed
    ? theme.palette.success.main
    : ownerState.active
    ? theme.palette.primary.main
    : theme.palette.grey[300],
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  transition: "all 0.3s ease",
  fontSize: "0.875rem",
  fontWeight: "bold",
  boxShadow: ownerState.active
    ? `0 0 20px ${theme.palette.primary.main}40`
    : "none",
  "&:hover": {
    transform: "scale(1.1)",
  },
}));

function StepIcon(props: any) {
  const { active, completed, className } = props;

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <CustomStepIcon ownerState={{ completed, active }} className={className}>
        {completed ? (
          <CheckIcon fontSize="small" />
        ) : active ? (
          <RadioButtonUncheckedIcon fontSize="small" />
        ) : (
          props.icon
        )}
      </CustomStepIcon>
    </motion.div>
  );
}

export default function EnhancedProgressBar() {
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();
  const { answers, appState, expandedQuestion } = useAppSelector(
    (state) => state.questions
  );

  // Hide progress bar when questionnaire is completed
  if (appState === "completed") {
    return null;
  }

  const totalQuestions = questions.length;
  const answeredQuestions = Object.keys(answers).length;
  const progress = (answeredQuestions / totalQuestions) * 100;
  const currentStep = expandedQuestion ? expandedQuestion - 1 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Paper
        elevation={3}
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: isDarkMode
            ? "linear-gradient(135deg, rgba(18, 18, 18, 0.95) 0%, rgba(30, 30, 30, 0.95) 100%)"
            : "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(250, 250, 250, 0.95) 100%)",
          backdropFilter: "blur(20px)",
          borderBottom: `1px solid ${
            isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"
          }`,
          borderRadius: 0,
        }}
      >
        <Box sx={{ px: { xs: 2, sm: 3 }, py: 2 }}>
          {/* Main Progress Section */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              maxWidth: "lg",
              mx: "auto",
              mb: 2,
            }}
          >
            {/* Circular Progress */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box sx={{ position: "relative", display: "inline-flex" }}>
                <CircularProgress
                  variant="determinate"
                  value={100}
                  size={60}
                  thickness={4}
                  sx={{
                    color: "grey.300",
                    position: "absolute",
                  }}
                />
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: (progress / 100) * 360 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                >
                  <CircularProgress
                    variant="determinate"
                    value={progress}
                    size={60}
                    thickness={4}
                    sx={{
                      color: progress === 100 ? "success.main" : "primary.main",
                      filter: `drop-shadow(0 0 10px ${
                        progress === 100 ? "#4caf50" : "#2196f3"
                      }40)`,
                    }}
                  />
                </motion.div>
                <Box
                  sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <motion.div
                    key={progress}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Typography
                      variant="caption"
                      component="div"
                      color="text.secondary"
                      sx={{ fontSize: "0.75rem", fontWeight: "bold" }}
                    >
                      {Math.round(progress)}%
                    </Typography>
                  </motion.div>
                </Box>
              </Box>

              <Box>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "primary.main" }}
                >
                  {t("progress.label")}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {answeredQuestions} of {totalQuestions} questions
                </Typography>
              </Box>
            </Box>

            {/* Breadcrumb Navigation */}
            <Box sx={{ display: { xs: "none", md: "block" } }}>
              <Breadcrumbs
                aria-label="questionnaire progress"
                separator="›"
                sx={{
                  "& .MuiBreadcrumbs-separator": {
                    color: "primary.main",
                    fontWeight: "bold",
                  },
                }}
              >
                <Link
                  underline="hover"
                  color={currentStep === 0 ? "primary" : "inherit"}
                  href="#"
                  sx={{ fontWeight: currentStep === 0 ? "bold" : "normal" }}
                >
                  Start
                </Link>
                <Link
                  underline="hover"
                  color={
                    currentStep > 0 && currentStep < totalQuestions
                      ? "primary"
                      : "inherit"
                  }
                  href="#"
                  sx={{
                    fontWeight:
                      currentStep > 0 && currentStep < totalQuestions
                        ? "bold"
                        : "normal",
                  }}
                >
                  Question {Math.min(currentStep + 1, totalQuestions)}
                </Link>
                {progress === 100 && (
                  <Link
                    underline="hover"
                    color="success.main"
                    href="#"
                    sx={{ fontWeight: "bold" }}
                  >
                    Complete
                  </Link>
                )}
              </Breadcrumbs>
            </Box>
          </Box>

          {/* Step Progress (Mobile-friendly) */}
          <Box sx={{ display: { xs: "block", md: "none" } }}>
            <Stepper
              activeStep={currentStep}
              connector={<CustomStepConnector />}
              sx={{
                "& .MuiStepLabel-root": {
                  padding: 0,
                },
              }}
            >
              {questions
                .slice(0, Math.min(5, totalQuestions))
                .map((question, index) => (
                  <Step
                    key={question.id}
                    completed={answers[question.id] !== undefined}
                  >
                    <StepLabel
                      StepIconComponent={StepIcon}
                      sx={{
                        "& .MuiStepLabel-label": {
                          fontSize: "0.75rem",
                          fontWeight: currentStep === index ? "bold" : "normal",
                        },
                      }}
                    >
                      Q{question.id}
                    </StepLabel>
                  </Step>
                ))}
              {totalQuestions > 5 && (
                <Step>
                  <StepLabel>...</StepLabel>
                </Step>
              )}
            </Stepper>
          </Box>
        </Box>
      </Paper>
    </motion.div>
  );
}
