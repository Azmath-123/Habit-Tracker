import { useState } from 'react';
import { 
  Box, 
  Button, 
  Popover, 
  Typography 
} from '@mui/material';
import { SketchPicker } from 'react-color';

const ColorPicker = ({ value, onChange, label }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="body2" color="textSecondary" gutterBottom>
        {label}
      </Typography>
      <Button
        onClick={handleClick}
        sx={{
          backgroundColor: value,
          width: 100,
          height: 40,
          '&:hover': {
            backgroundColor: value,
          },
        }}
      />
    </Box>
  );
};

export default ColorPicker; 