import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import { NavLink } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import {useState, useEffect}from 'react';
import { login } from '../api';
import { validateSignInForm } from './utils/validators';
import {Redirect} from 'react-router-dom';

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

const theme = createTheme();

const SignIn = () => {

  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const [isFormValid, setIsFormValid] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);

  useEffect(
    () => {
      setIsFormValid(validateSignInForm({username, password}));
    },
    [username, password]
  );

  const handleSignUp =  async(event) => {
    event.preventDefault();

    const userLoginInfo = {
      username,
      password,
    }
    console.log(userLoginInfo)

    login(userLoginInfo)
    .then((response) => {
      console.log(response);
      setErrorMsg("");
      const user = {...userLoginInfo, token:response.data.access}
      console.log('user', user)
      localStorage.setItem('user', JSON.stringify(user));
    })
    .catch((error) => {
      setErrorMsg(error.response.data)
    })
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              User Sign In
            </Typography>

            <Box component="form" onSubmit={handleSignUp} sx={{ mt: 2}}>
              <Grid container spacing={2}>
              {errorMsg.detail && <p style={{fontSize:'0.8rem', color:'#D7272D', paddingLeft:'1rem'}}>Please try again: {errorMsg.detail}</p>}
               
              <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                    error={errorMsg.username}
                    helperText={errorMsg.username}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
              </Grid>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              
              <Grid container justifyContent="flex-end">
                <Grid item>
                <NavLink variant="body2" to='/signup'>
                {"Don't have an account? Sign Up"}
                </NavLink>

                </Grid>
              </Grid>

            </Box>
          </Box>

        <Copyright sx={{ mt: 8}} />
      </Container>
    </ThemeProvider>
  );
}

export default SignIn;