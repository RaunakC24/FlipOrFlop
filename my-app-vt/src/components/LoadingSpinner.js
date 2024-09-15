// src/components/LoadingSpinner.js
import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const LoadingSpinner = () => {
  return (
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      minHeight="100vh"  // Ensures it's centered vertically
    >
      <CircularProgress size={60} sx={{ color: '#ff8c00' }} /> {/* Custom color applied here */}
    </Box>
  );
};

export default LoadingSpinner;
