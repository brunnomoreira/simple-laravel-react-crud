import React from 'react';

import { Box, CircularProgress } from '@mui/material';

import { useApp } from '../../contexts/AppContext';

const Loading = (props) => {
  const app = useApp();

  return (
    <Box sx={{
      height: '100vh',
      position: 'relative',
      overflowY: app.loading ? 'hidden' : 'auto',
      paddingRight: app.loading ? '17px' : '0'
    }}>
      <Box sx={{
        position: 'fixed', 
        top: 0, 
        bottom: 0, 
        left: 0, 
        right: 0,
        justifyContent: 'center', 
        alignItems: 'center',
        background: '#000',
        opacity: 0.3,
        zIndex: 9999,
        display: app.loading ? 'flex' : 'none',
      }}>
        <CircularProgress />
      </Box>
      {props.children}
    </Box>
  );
}

export default Loading;