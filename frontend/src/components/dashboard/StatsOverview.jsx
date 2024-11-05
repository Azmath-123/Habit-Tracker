import { Grid, Paper, Typography, Box } from '@mui/material';
import { 
  Chart as ChartJS, 
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend 
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { format, subDays } from 'date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const StatsOverview = ({ habits }) => {
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    return format(subDays(new Date(), i), 'MMM dd');
  }).reverse();

  const completionData = {
    labels: last7Days,
    datasets: [
      {
        label: 'Completion Rate',
        data: last7Days.map(() => Math.floor(Math.random() * 100)),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const habitDistribution = {
    labels: ['Completed', 'In Progress', 'Not Started'],
    datasets: [
      {
        data: [
          habits.filter(h => h.status === 'completed').length,
          habits.filter(h => h.status === 'in_progress').length,
          habits.filter(h => h.status === 'not_started').length,
        ],
        backgroundColor: ['#4CAF50', '#2196F3', '#f44336'],
        borderColor: ['#4CAF50', '#2196F3', '#f44336'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper elevation={3}>
          <Typography variant="h5" gutterBottom>
            Completion Rate
          </Typography>
          <Line data={completionData} />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper elevation={3}>
          <Typography variant="h5" gutterBottom>
            Habit Distribution
          </Typography>
          <Bar data={habitDistribution} />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default StatsOverview; 