import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { Link } from 'react-router-dom';

const Copyright = (props) => {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Toronto Fitness Club
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }


const Footer = () => {
    return (
        <div>
        <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
          <Typography variant="h6" align="center" gutterBottom>
            
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="text.secondary"
            component="p"
          >
            Join Us Today!
          </Typography>

          <Copyright />
        </Box>
        </div>
    );
};

export default Footer;