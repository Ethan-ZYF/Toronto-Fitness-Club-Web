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
import { register } from '../api';
import { validateSignUpForm } from './utils/validators';




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

const SignUp = () => {

  const [username, setUserName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [password, setPassword] = useState('');
  const [password2,setPassword2] = useState('');
  const [mail , setMail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [isFormValid, setIsFormValid] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  useEffect(
    () => {
      setIsFormValid(validateSignUpForm({username, cardNumber, password, password2}));
    },
    [username, cardNumber, password, password2, setIsFormValid]
  );

  
  const handleSignUp =  async(event) => {
    event.preventDefault();

    const userDetails = {
      username,
      credit_debit_no: cardNumber,
      password,
      password2,
      mail,
      firstName,
      lastName
    }
    console.log(userDetails)

    register(userDetails)
    .then((response) => {
      console.log(response)
      setSignUpSuccess(true);
    })
    .catch((error) => {
      // TODO: render error message on page
      console.log(error)
    })
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />

        {signUpSuccess ? 
                <Box
                sx={{
                  marginTop: 12,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                 <Typography component="h1" variant="h5">
                  You have successfully registered an account! Proceed to sign in <NavLink to='/signin'>here</NavLink>!
                </Typography>
      
              </Box>
        :
                <Box
                  sx={{
                    marginTop: 12,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    Account Sign Up
                  </Typography>
                  <Box component="form" onSubmit={handleSignUp} sx={{ mt: 2}}>
                    <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          id="username"
                          label="Username"
                          name="username"
                          value={username}
                          onChange={(e) => setUserName(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          id="firstName"
                          label="First Name"
                          name="firstName"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          id="lastName"
                          label="Last Name"
                          name="lastName"
                          autoComplete="family-name"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          id="email"
                          label="Email Address"
                          name="email"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          required
                          id="credit_debit_no"
                          label="Credit/Debit Number"
                          name="credit_debit_no"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
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
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          name="password2"
                          label="Re-enter password"
                          type="password2"
                          id="password2"
                          value={password2}
                          onChange={(e) => setPassword2(e.target.value)}
                        />
                      </Grid>
                    </Grid>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                      <Grid item>
                        <Link href="#" variant="body2">
                          Already have an account? Sign in
                        </Link>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
        }


        <Copyright sx={{ mt: 5}} />
      </Container>
    </ThemeProvider>
  );
}

export default SignUp;