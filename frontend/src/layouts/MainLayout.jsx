import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const MainLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  return (
    // <Box sx={{ display: 'flex' }}>
    //   <Navbar 
    //     drawerWidth={drawerWidth} 
    //     sidebarOpen={sidebarOpen}
    //     toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
    //   />
    //   <Sidebar 
    //     drawerWidth={drawerWidth} 
    //     open={sidebarOpen}
    //     onClose={() => setSidebarOpen(false)}
    //     variant={isMobile ? 'temporary' : 'persistent'}
    //   />
    //   <Main open={sidebarOpen && !isMobile}>
    //     <Box sx={{ mt: 8 }}>
    //       <Outlet />
    //     </Box>
    //   </Main>
    // </Box>
    <>
    </>
  );
};

export default MainLayout; 