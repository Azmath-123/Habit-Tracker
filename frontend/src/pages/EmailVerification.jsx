import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  CircularProgress,
  Button,
} from '@mui/material';
import { authService } from '../api/services';

const EmailVerification = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying');

  useEffect(() => {
    verifyEmail();
  }, [token]);

  const verifyEmail = async () => {
    try {
      await authService.verifyEmail(token);
      setStatus('success');
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          {status === 'verifying' && (
            <>
              <CircularProgress sx={{ mb: 2 }} />
              <Typography>
                Verifying your email address...
              </Typography>
            </>
          )}

          {status === 'success' && (
            <>
              <Typography variant="h5" color="primary" gutterBottom>
                Email Verified Successfully!
              </Typography>
              <Typography sx={{ mb: 3 }}>
                Your email has been verified. You can now log in to your account.
              </Typography>
              <Button
                variant="contained"
                onClick={() => navigate('/login')}
              >
                Go to Login
              </Button>
            </>
          )}

          {status === 'error' && (
            <>
              <Typography variant="h5" color="error" gutterBottom>
                Verification Failed
              </Typography>
              <Typography sx={{ mb: 3 }}>
                The verification link is invalid or has expired.
              </Typography>
              <Button
                variant="contained"
                onClick={() => navigate('/login')}
              >
                Back to Login
              </Button>
            </>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default EmailVerification; 