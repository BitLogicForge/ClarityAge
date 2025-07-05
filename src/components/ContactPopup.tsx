import EmailIcon from "@mui/icons-material/Email";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface ContactPopupProps {
  open: boolean;
  onClose: () => void;
}

export default function ContactPopup({ open, onClose }: ContactPopupProps) {
  const { t } = useTranslation();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [emailRevealed, setEmailRevealed] = useState(false);

  // Email protection: Base64 encoded and obfuscated
  const getEmail = () => {
    // This is "mail" encoded and split for protection
    const part1 = atob("Yml0bG9naWNmb3JnZQ=="); // "xxx"
    const part2 = atob("QA=="); // "@"
    const part3 = atob("Z21haWw="); // "gmail"
    const part4 = atob("LmNvbQ=="); // ".com"
    return `${part1}${part2}${part3}${part4}`;
  };

  const handleEmailReveal = () => {
    setEmailRevealed(true);
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(getEmail());
      // You can add a toast notification here if needed
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: { xs: 0, md: 2 },
          mx: { xs: 0, md: 2 },
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <EmailIcon color="primary" />
        {t("contact.title")}
      </DialogTitle>

      <DialogContent sx={{ py: 3 }}>
        <Stack spacing={3}>
          <Typography variant="body1" color="text.secondary">
            {t("contact.description")}
          </Typography>

          <Stack spacing={2} alignItems="center">
            <Typography variant="h6" color="primary">
              {t("contact.emailLabel")}
            </Typography>

            {!emailRevealed ? (
              <Button
                variant="outlined"
                onClick={handleEmailReveal}
                startIcon={<EmailIcon />}
                sx={{ minWidth: 200 }}
              >
                {t("contact.revealEmail")}
              </Button>
            ) : (
              <Stack spacing={1} alignItems="center">
                <Typography
                  variant="body1"
                  sx={{
                    fontFamily: "monospace",
                    fontSize: "1.1rem",
                    fontWeight: "bold",
                    color: "primary.main",
                    p: 2,
                    bgcolor: "action.hover",
                    borderRadius: 1,
                    border: `1px solid ${theme.palette.divider}`,
                  }}
                >
                  {getEmail()}
                </Typography>

                <Button
                  variant="contained"
                  size="small"
                  onClick={handleCopyEmail}
                  sx={{ minWidth: 120 }}
                >
                  {t("contact.copyEmail")}
                </Button>
              </Stack>
            )}
          </Stack>

          <Typography variant="body2" color="text.secondary" align="center">
            {t("contact.responseTime")}
          </Typography>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} variant="outlined" fullWidth>
          {t("buttons.close")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
