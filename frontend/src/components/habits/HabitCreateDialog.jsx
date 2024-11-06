import { useState } from 'react';
import { 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Button,
  TextField,
  MenuItem,
  Box,
  Checkbox,
  Chip,
  IconButton,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Add as AddIcon, Close as CloseIcon } from '@mui/icons-material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { createHabit } from '../../api/habits';
import {habitService} from "../../api/services"
// import ColorPicker from '../common/ColorPicker';

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  description: yup.string(),
  frequency: yup.string().required('Frequency is required'),
  // goal: yup.number().positive().required('Goal is required'),
  // color: yup.string(),
  // reminder: yup.bool(),
  // reminderTime: yup.string().when('reminder', {
  //   is: true,
  //   then: yup.string().required('Reminder time is required'),
  // }),
});

const frequencies = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
];

const HabitCreateDialog = ({ open, onClose }) => {
  // const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState('');
  const queryClient = useQueryClient();

  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      description: '',
      frequency: 'daily',
      // goal: 1,
      // color: '#1976d2',
      // reminder: false,
      // reminderTime: '09:00',
    },
  });

  const createMutation = useMutation({
    mutationFn: habitService.createHabit,
    onSuccess: () => {
      queryClient.invalidateQueries(['habits']);
      handleClose();
    },
  });

  const handleClose = () => {
    reset();
    // setTags([]);
    setNewTag('');
    onClose();
  };

  // const handleAddTag = () => {
  //   if (newTag && !tags.includes(newTag)) {
  //     setTags([...tags, newTag]);
  //     setNewTag('');
  //   }
  // };

  // const handleRemoveTag = (tagToRemove) => {
  //   setTags(tags.filter(tag => tag !== tagToRemove));
  // };

  const handleCreateHabit = (data) => {
    console.log(data)
    createMutation.mutate(data);
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-modal={true}>
      <DialogTitle>Create Habit</DialogTitle>
      <DialogContent>
        <Box component="form" noValidate sx={{ mt: 2 }}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Habit Name"
                fullWidth
                error={!!errors.name}
                helperText={errors.name?.message}
                margin="normal"
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Description"
                fullWidth
                margin="normal"
                multiline
                rows={4}
              />
            )}
          />
          <Controller
            name="frequency"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Frequency"
                fullWidth
                margin="normal"
                error={!!errors.frequency}
                helperText={errors.frequency?.message}
              >
                {frequencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
          {/* <Controller
            name="goal"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Goal"
                type="number"
                fullWidth
                margin="normal"
                error={!!errors.goal}
                helperText={errors.goal?.message}
              />
            )}
          /> */}
          {/* <Controller
            name="color"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Color"
                type="color"
                fullWidth
                margin="normal"
              />
            )}
          /> */}
          {/* <Controller
            name="reminder"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox {...field} />}
                label="Set Reminder"
              />
            )}
          /> */}
          {errors.reminder && (
            <TextField
              label="Reminder Time"
              type="time"
              fullWidth
              margin="normal"
              error={!!errors.reminderTime}
              helperText={errors.reminderTime?.message}
            />
          )}
          {/* <Box display="flex" alignItems="center" mt={2}>
            <TextField
              label="Add Tag"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
              fullWidth
              margin="normal"
            />
            <IconButton onClick={handleAddTag} color="primary">
              <AddIcon />
            </IconButton>
          </Box> */}
          {/* <Box mt={1} display="flex" flexWrap="wrap" gap={1}>
            {tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                onDelete={() => handleRemoveTag(tag)}
                color="primary"
              />
            ))}
          </Box> */}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit(handleCreateHabit)} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default HabitCreateDialog; 