import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  IconButton, 
  Box,
  LinearProgress,
  Menu,
  MenuItem,
} from '@mui/material';
import { 
  MoreVert as MoreVertIcon,
  Check as CheckIcon,
  Close as CloseIcon 
} from '@mui/icons-material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { updateHabitProgress } from '../../api/habits';

const HabitCard = ({ habit }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: updateHabitProgress,
    onSuccess: () => {
      queryClient.invalidateQueries(['habits']);
    },
  });

  const progress = (habit.completedDays / habit.totalDays) * 100;
  const streak = habit.currentStreak || 0;

  const handleProgress = async (completed) => {
    await updateMutation.mutateAsync({
      habitId: habit._id,
      completed,
      date: new Date(),
    });
  };

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" component="div">
            {habit.name}
          </Typography>
          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
            <MoreVertIcon />
          </IconButton>
        </Box>

        <Typography color="textSecondary" gutterBottom>
          {habit.description}
        </Typography>

        <Box sx={{ mt: 2 }}>
          <LinearProgress variant="determinate" value={progress} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
            <Typography variant="body2" color="textSecondary">
              Progress: {progress.toFixed(1)}%
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Streak: {streak} days
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <IconButton 
            color="success" 
            onClick={() => handleProgress(true)}
          >
            <CheckIcon />
          </IconButton>
          <IconButton 
            color="error" 
            onClick={() => handleProgress(false)}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </CardContent>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => {
          // Handle edit
          setAnchorEl(null);
        }}>
          Edit
        </MenuItem>
        <MenuItem onClick={() => {
          // Handle delete
          setAnchorEl(null);
        }}>
          Delete
        </MenuItem>
      </Menu>
    </Card>
  );
};

export default HabitCard; 