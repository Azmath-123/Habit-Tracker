import { useState, useEffect } from 'react';
import {
  Paper,
  Switch,
  FormControlLabel,
  Typography,
  Box,
  Divider,
  Alert,
} from '@mui/material';
import { userService } from '../api/services';

const Settings = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    dailyReminder: true,
    reminderTime: '09:00',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const response = await userService.getProfile();
      setSettings(response.data.settings || {});
    } catch (err) {
      setError('Failed to load settings');
    }
  };

  const handleSettingChange = async (setting) => {
    try {
      const newSettings = {
        ...settings,
        ...setting
      };
      await userService.updateSettings(newSettings);
      setSettings(newSettings);
    } catch (err) {
      setError('Failed to update settings');
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Notification Settings
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ mt: 2 }}>
        <FormControlLabel
          control={
            <Switch
              checked={settings.emailNotifications}
              onChange={(e) => handleSettingChange({ emailNotifications: e.target.checked })}
            />
          }
          label="Email Notifications"
        />
        <Typography variant="body2" color="textSecondary" sx={{ ml: 4, mb: 2 }}>
          Receive updates and reminders via email
        </Typography>

        <Divider sx={{ my: 2 }} />

        <FormControlLabel
          control={
            <Switch
              checked={settings.pushNotifications}
              onChange={(e) => handleSettingChange({ pushNotifications: e.target.checked })}
            />
          }
          label="Push Notifications"
        />
        <Typography variant="body2" color="textSecondary" sx={{ ml: 4 }}>
          Receive notifications in your browser
        </Typography>
      </Box>
    </Paper>
  );
};

export default Settings; 