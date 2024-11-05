import { useState } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Box,
  LinearProgress,
  Menu,
  MenuItem,
  Chip,
} from '@mui/material';
import {
  Check as CheckIcon,
  Close as CloseIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { habitService } from '../api/services';
import { format } from 'date-fns';

const HabitCard = ({ habit, onUpdate }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleProgressUpdate = async (completed) => {
    try {
      setLoading(true);
      await habitService.updateProgress(habit._id, {
        date: format(new Date(), 'yyyy-MM-dd'),
        completed
      });
      onUpdate();
    } catch (error) {
      console.error('Failed to update progress:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this habit?')) {
      try {
        await habitService.deleteHabit(habit._id);
        onUpdate();
      } catch (error) {
        console.error('Failed to delete habit:', error);
      }
    }
    setAnchorEl(null);
  };

  const progress = (habit.completedDays / habit.totalDays) * 100;

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" component="div">
            {habit.name}
          </Typography>
          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
            <MoreVertIcon />
          </IconButton>
        </Box>

        <Typography color="textSecondary" sx={{ mb: 2 }}>
          {habit.description}
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Chip 
            label={habit.frequency} 
            size="small" 
            sx={{ mr: 1 }}
          />
          <Chip 
            label={`Streak: ${habit.currentStreak || 0} days`}
            size="small"
            color="primary"
          />
        </Box>

        <Box sx={{ mb: 1 }}>
          <LinearProgress 
            variant="determinate" 
            value={progress} 
            sx={{ height: 8, borderRadius: 4 }}
          />
        </Box>
        <Typography variant="body2" color="textSecondary">
          Progress: {Math.round(progress)}%
        </Typography>
      </CardContent>

      <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
        <IconButton 
          color="success" 
          onClick={() => handleProgressUpdate(true)}
          disabled={loading}
        >
          <CheckIcon />
        </IconButton>
        <IconButton 
          color="error" 
          onClick={() => handleProgressUpdate(false)}
          disabled={loading}
        >
          <CloseIcon />
        </IconButton>
      </CardActions>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => {
          setAnchorEl(null);
          // Add edit functionality
        }}>
          <EditIcon sx={{ mr: 1 }} /> Edit
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <DeleteIcon sx={{ mr: 1 }} /> Delete
        </MenuItem>
      </Menu>
    </Card>
  );
};

export default HabitCard; 