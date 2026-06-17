import React from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

export const SelfHelpResources: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Paper
      elevation={2}
      sx={{
        p: { xs: 3, sm: 4 },
        mt: 3,
        borderRadius: 2,
        bgcolor: 'info.main',
        color: 'info.contrastText',
      }}
    >
      <Typography
        variant="h6"
        component="h3"
        gutterBottom
        sx={{ fontWeight: 600, mb: 2 }}
      >
        {t('cesd.resources.selfHelp.title')}
      </Typography>

      <Typography variant="body2" sx={{ mb: 3, opacity: 0.9 }}>
        {t('cesd.resources.selfHelp.description')}
      </Typography>

      <List sx={{ opacity: 0.95 }}>
        <ListItem sx={{ pl: 0 }}>
          <ListItemText
            primary={t('cesd.resources.selfHelp.exercise')}
            secondary={null}
          />
        </ListItem>

        <Divider sx={{ my: 1, borderColor: 'rgba(255,255,255,0.2)' }} />

        <ListItem sx={{ pl: 0 }}>
          <ListItemText
            primary={t('cesd.resources.selfHelp.sleep')}
            secondary={null}
          />
        </ListItem>

        <Divider sx={{ my: 1, borderColor: 'rgba(255,255,255,0.2)' }} />

        <ListItem sx={{ pl: 0 }}>
          <ListItemText
            primary={t('cesd.resources.selfHelp.social')}
            secondary={null}
          />
        </ListItem>

        <Divider sx={{ my: 1, borderColor: 'rgba(255,255,255,0.2)' }} />

        <ListItem sx={{ pl: 0 }}>
          <ListItemText
            primary={t('cesd.resources.selfHelp.routine')}
            secondary={null}
          />
        </ListItem>

        <Divider sx={{ my: 1, borderColor: 'rgba(255,255,255,0.2)' }} />

        <ListItem sx={{ pl: 0 }}>
          <ListItemText
            primary={t('cesd.resources.selfHelp.mindfulness')}
            secondary={null}
          />
        </ListItem>

        <Divider sx={{ my: 1, borderColor: 'rgba(255,255,255,0.2)' }} />

        <ListItem sx={{ pl: 0 }}>
          <ListItemText
            primary={t('cesd.resources.selfHelp.journaling')}
            secondary={null}
          />
        </ListItem>

        <Divider sx={{ my: 1, borderColor: 'rgba(255,255,255,0.2)' }} />

        <ListItem sx={{ pl: 0 }}>
          <ListItemText
            primary={t('cesd.resources.selfHelp.limitAlcohol')}
            secondary={null}
          />
        </ListItem>
      </List>

      <Box
        sx={{
          mt: 3,
          p: 2,
          bgcolor: 'rgba(0, 0, 0, 0.2)',
          borderRadius: 1,
        }}
      >
        <Typography
          variant="body2"
          sx={{ fontStyle: 'italic' }}
        >
          {t('cesd.disclaimer.notReplacement')}
        </Typography>
      </Box>
    </Paper>
  );
};
