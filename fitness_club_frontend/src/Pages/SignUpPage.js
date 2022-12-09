import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import { NavLink, Navigate } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useState, useEffect } from 'react';
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

const normalizeInput = (value, previousValue) => {
    // return nothing if no value
    if (!value) return value;

    // only allows 0-9 inputs
    const currentValue = value.replace(/[^\d]/g, '');
    const cvLength = currentValue.length;

    if (!previousValue || value.length > previousValue.length) {

        // returns: "x", "xx", "xxx"
        if (cvLength < 4) return currentValue;

        // returns: "(xxx)", "(xxx) x", "(xxx) xx", "(xxx) xxx",
        if (cvLength < 7) return `${currentValue.slice(0, 3)}-${currentValue.slice(3)}`;

        // returns: "(xxx) xxx-", (xxx) xxx-x", "(xxx) xxx-xx", "(xxx) xxx-xxx", "(xxx) xxx-xxxx"
        return `${currentValue.slice(0, 3)}-${currentValue.slice(3, 6)}-${currentValue.slice(6, 10)}`;
    }
};

const normalizeCard = (value, previousValue) => {
    // return nothing if no value
    if (!value) return value;

    // only allows 0-9 inputs
    const currentValue = value.replace(/[^\d]/g, '');
    const cvLength = currentValue.length;

    if (!previousValue || value.length > previousValue.length) {

        // returns: "x", "xx", "xxx"
        if (cvLength < 4) return currentValue;

        // returns: "(xxx)", "(xxx) x", "(xxx) xx", "(xxx) xxx",
        if (cvLength < 8) return `${currentValue.slice(0, 4)}-${currentValue.slice(4)}`;

        if (cvLength < 12) return `${currentValue.slice(0, 4)}-${currentValue.slice(4, 8)}-${currentValue.slice(8)}`;

        // returns xxxx-xxxx-xxxx-xxxx
        return `${currentValue.slice(0, 4)}-${currentValue.slice(4, 8)}-${currentValue.slice(8, 12)}-${currentValue.slice(12, 16)}`;
    }
};

const theme = createTheme();

const SignUp = () => {

    const [username, setUserName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [mail, setMail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [avatarMsg, setAvatarMsg] = useState('no file selected');

    const [isFormValid, setIsFormValid] = useState(false);
    const [signUpSuccess, setSignUpSuccess] = useState(false);
    const [errorMsg, setErrorMsg] = useState(false);
    // const [timer, setTimer] = useState(10);


    useEffect(
        () => {
            setIsFormValid(validateSignUpForm({ username, cardNumber, password, password2 }));
        },
        [username, cardNumber, password, password2, setIsFormValid]
    );


    const selectAvatarHandler = (e) => {
        const fname = e.target.files[0];
        setAvatar(fname);
        setAvatarMsg(fname.name + ' uploaded');
    }

    const handleSignUp = async (event) => {
        event.preventDefault();

        const userDetails = {
            username,
            credit_debit_no: cardNumber,
            password,
            password2,
            email: mail,
            first_name: firstName,
            last_name: lastName,
            phone_number: phoneNumber,
            avatar
        }
        // console.log(userDetails)

        register(userDetails)
            .then((response) => {
                // console.log(response)
                setSignUpSuccess(true);
            })
            .catch((error) => {
                setErrorMsg(error.response.data)
            })
    };

    if (localStorage.getItem('user') !== null) {
        return (
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            You have already signed in! Proceed to sign out <NavLink to='/signout'>here</NavLink> to continue!
                        </Typography>
                    </Box>
                </Container>
            </ThemeProvider>
        );
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />

                {signUpSuccess ?
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        {/* <Typography component="h1" variant="h5">
                            You have successfully registered an account! Proceed to sign in <NavLink to='/signin'>here</NavLink>!
                        </Typography> */}
                        <Navigate to='/signin' />
                    </Box>
                    :
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
                            Account Sign Up
                        </Typography>

                        <Box component="form" onSubmit={handleSignUp} sx={{ mt: 2 }}>
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
                                        error={errorMsg.username}
                                        helperText={errorMsg.username}
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
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        value={mail}
                                        onChange={(e) => setMail(e.target.value)}
                                        error={errorMsg.email}
                                        helperText={errorMsg.email}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="phoneNumber"
                                        label="Phone Number"
                                        name="phoneNumber"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(
                                            // e.target.value
                                            normalizeInput(e.target.value)
                                        )}
                                        error={errorMsg.phone_number}
                                        helperText={errorMsg.phone_number}
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
                                        onChange={
                                            (e) => setCardNumber(
                                                normalizeCard(e.target.value)
                                            )
                                        }
                                        error={errorMsg.credit_debit_no}
                                        helperText={errorMsg.credit_debit_no}
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
                                        error={errorMsg.password}
                                        helperText={errorMsg.password}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password2"
                                        label="Re-enter password"
                                        type="password"
                                        id="password2"
                                        value={password2}
                                        onChange={(e) => setPassword2(e.target.value)}
                                        error={errorMsg.password2}
                                        helperText={errorMsg.password2}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        variant="contained"
                                        component="label"
                                    >
                                        Upload Avatar
                                        <input
                                            type="file"
                                            hidden
                                            value={""}
                                            // accept=".png, .jpg"
                                            onChange={selectAvatarHandler} />
                                    </Button>
                                    <p style={{ fontSize: '0.8rem', color: '#D7272D' }}>{errorMsg.avatar}</p>
                                    <p style={{ fontSize: '0.8rem', color: '#D7272D' }}>{avatarMsg}</p>
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
                                    <NavLink variant="body2" to='/signin'>
                                        Already have an account? Sign in
                                    </NavLink>

                                </Grid>
                            </Grid>

                        </Box>
                    </Box>
                }

                <Copyright sx={{ mt: 8 }} />
            </Container>
        </ThemeProvider>
    );
}

export default SignUp;