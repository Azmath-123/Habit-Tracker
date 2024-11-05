import { useState } from 'react';
import { 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Box,
  Chip,
  IconButton,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Add as AddIcon, Close as CloseIcon } from '@mui/icons-material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createHabit } from '../../api/habits';
import ColorPicker from '../common/ColorPicker';

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  description: yup.string(),
  frequency: yup.string().required('Frequency is required'),
  goal: yup.number().positive().required('Goal is required'),
  color: yup.string(),
  reminder: yup.bool(),
  reminderTime: yup.string().when('reminder', {
    is: true,
    then: yup.string().required('Reminder time is required'),
  }),
});

const frequencies = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
];

const HabitCreateDialog = ({ open, onClose }) => {
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState('');
  const queryClient = useQueryClient();

  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      description: '',
      frequency: 'daily',
      goal: 1,
      color: '#1976d2',
      reminder: false,
      reminderTime: '09:00',
    },
  });

  const createMutation = useMutation({
    mutationFn: createHabit,
    onSuccess: () => {
      queryClient.invalidateQueries(['habits']);
      handleClose();
    },
  });

  const handleClose = () => {
    reset();
    setTags([]);
    setNewTag('');
    onClose();
  };

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleCreateHabit = (data) => {
    createMutation.mutate(data);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create Habit</DialogTitle>
      <DialogContent>
        {/* Add your habit creation form components here */}
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