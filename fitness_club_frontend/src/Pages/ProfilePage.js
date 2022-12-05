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
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';


import { userContext, loggedInState } from '../userContext';

import { useState, useEffect, useContext } from 'react';
import { login } from '../api';
import { validateSignInForm } from './utils/validators';
import { Navigate } from "react-router-dom";
import { getProfile } from '../api';

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

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const theme = createTheme();

export default function ProfilePage() {
    const [profile, setProfile] = useState();
    useEffect(() => {
        getProfile()
            .then((response) => {
                setProfile(response.data);
            })
            .catch((error) => {
                console.log("Error", error);
            });
    }, []);
    console.log(profile);
    return (
        // <ThemeProvider theme={theme}>
        //     <Container component="main" maxWidth="xs">
        //         <CssBaseline />


        //         <Box
        //             sx={{
        //                 marginTop: 8,
        //                 display: 'flex',
        //                 flexDirection: 'column',
        //                 alignItems: 'center',
        //             }}
        //         >
        //             <Typography component="h1" variant="h5">
        //                 You have successfully registered an account! Proceed to sign in <NavLink to='/signin'>here</NavLink>!
        //             </Typography>
        //         </Box>
        //         :
        //         <Box
        //             sx={{
        //                 marginTop: 8,
        //                 display: 'flex',
        //                 flexDirection: 'column',
        //                 alignItems: 'center',
        //             }}
        //         >
        //             <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        //                 <LockOutlinedIcon />
        //             </Avatar>
        //             <Typography component="h1" variant="h5">
        //                 Account Sign Up
        //             </Typography>

        //             <Box component="form" sx={{ mt: 2 }}>
        //                 <Grid container spacing={2}>
        //                     <Grid item xs={12}>
        //                         <TextField
        //                             required
        //                             fullWidth
        //                             id="username"
        //                             label="Username"
        //                             name="username"
        //                             value={profile.username}
        //                             readOnly
        //                         />
        //                     </Grid>
        //                     <Grid item xs={12} sm={6}>
        //                         <TextField
        //                             fullWidth
        //                             id="firstName"
        //                             label="First Name"
        //                             name="firstName"
        //                             value={firstName}
        //                             onChange={(e) => setFirstName(e.target.value)}
        //                         />
        //                     </Grid>
        //                     <Grid item xs={12} sm={6}>
        //                         <TextField
        //                             fullWidth
        //                             id="lastName"
        //                             label="Last Name"
        //                             name="lastName"
        //                             value={lastName}
        //                             onChange={(e) => setLastName(e.target.value)}
        //                         />
        //                     </Grid>
        //                     <Grid item xs={12}>
        //                         <TextField
        //                             fullWidth
        //                             id="email"
        //                             label="Email Address"
        //                             name="email"
        //                             value={mail}
        //                             onChange={(e) => setMail(e.target.value)}
        //                             error={errorMsg.email}
        //                             helperText={errorMsg.email}
        //                         />
        //                     </Grid>
        //                     <Grid item xs={12}>
        //                         <TextField
        //                             fullWidth
        //                             id="phoneNumber"
        //                             label="Phone Number"
        //                             name="phoneNumber"
        //                             value={phoneNumber}
        //                             onChange={(e) => setPhoneNumber(e.target.value)}
        //                             error={errorMsg.phone_number}
        //                             helperText={errorMsg.phone_number}
        //                         />
        //                     </Grid>
        //                     <Grid item xs={12}>
        //                         <TextField
        //                             fullWidth
        //                             required
        //                             id="credit_debit_no"
        //                             label="Credit/Debit Number"
        //                             name="credit_debit_no"
        //                             value={cardNumber}
        //                             onChange={(e) => setCardNumber(e.target.value)}
        //                             error={errorMsg.credit_debit_no}
        //                             helperText={errorMsg.credit_debit_no}
        //                         />
        //                     </Grid>
        //                     <Grid item xs={12}>
        //                         <TextField
        //                             required
        //                             fullWidth
        //                             name="password"
        //                             label="Password"
        //                             type="password"
        //                             id="password"
        //                             value={password}
        //                             onChange={(e) => setPassword(e.target.value)}
        //                             error={errorMsg.password}
        //                             helperText={errorMsg.password}
        //                         />
        //                     </Grid>
        //                     <Grid item xs={12}>
        //                         <TextField
        //                             required
        //                             fullWidth
        //                             name="password2"
        //                             label="Re-enter password"
        //                             type="password"
        //                             id="password2"
        //                             value={password2}
        //                             onChange={(e) => setPassword2(e.target.value)}
        //                             error={errorMsg.password2}
        //                             helperText={errorMsg.password2}
        //                         />
        //                     </Grid>
        //                     <Grid item xs={12}>
        //                         <Button
        //                             variant="contained"
        //                             component="label"
        //                         >
        //                             Upload Avatar
        //                             <input
        //                                 type="file"
        //                                 hidden
        //                                 value={""}
        //                                 // accept=".png, .jpg"
        //                                 onChange={selectAvatarHandler} />
        //                         </Button>
        //                         <p style={{ fontSize: '0.8rem', color: '#D7272D' }}>{errorMsg.avatar}</p>
        //                     </Grid>
        //                 </Grid>

        //                 <Button
        //                     type="submit"
        //                     fullWidth
        //                     variant="contained"
        //                     sx={{ mt: 3, mb: 2 }}
        //                 >
        //                     Sign Up
        //                 </Button>
        //                 <Grid container justifyContent="flex-end">
        //                     <Grid item>
        //                         <NavLink variant="body2" to='/signin'>
        //                             Already have an account? Sign in
        //                         </NavLink>

        //                     </Grid>
        //                 </Grid>

        //             </Box>
        //         </Box>


        //         <Copyright sx={{ mt: 8 }} />
        //     </Container>
        // </ThemeProvider>
        <>
        </>
    );
}
