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

import { useState, useEffect } from 'react';
import { Navigate } from "react-router-dom";
import { editProfile, getProfile } from '../api';
import { validateSignUpForm } from './utils/validators';


const theme = createTheme();

const EditProfile = () => {
    const [username, setUserName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [mail, setMail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [avatar, setAvatar] = useState('');
    const [avatarMsg, setAvatarMsg] = useState('');

    const [isFormValid, setIsFormValid] = useState(false);
    const [editSuccess, setEditSuccess] = useState(false);
    const [errorMsg, setErrorMsg] = useState(false);

    useEffect(
        () => {
            if (localStorage.getItem('user') !== null) {
                setIsFormValid(validateSignUpForm({ username, cardNumber, password, password2 }));
                getProfile().then((response) => {
                    // console.log(response.data);
                    setUserName(response.data.username);
                    setCardNumber(response.data.credit_debit_no);
                    setMail(response.data.email);
                    setFirstName(response.data.first_name);
                    setLastName(response.data.last_name);
                    setPhoneNumber(response.data.phone_number);
                }
                );
            }
        },
        []
    );

    const selectAvatarHandler = (e) => {
        const fname = e.target.files[0];
        setAvatar(fname);
        console.log('avatar uploaded');
        setAvatarMsg('Avatar uploaded');
    }

    const EditHandler = async (e) => {
        e.preventDefault();
        const editData = {
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
        console.log(editData);
        await editProfile(editData).then((response) => {
            setEditSuccess(true);
        }).catch((error) => {
            console.log(error);
            setErrorMsg(error.response.data);
        });
    }
    // console.log(username);

    if (localStorage.getItem('user') === null) {
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
                            You haven't signed in yet, signin <NavLink to='/signin'>here</NavLink> or signup <NavLink to='/signup'>here</NavLink>!
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

                {editSuccess ?
                    // <Box
                    //     sx={{
                    //         marginTop: 8,
                    //         display: 'flex',
                    //         flexDirection: 'column',
                    //         alignItems: 'center',
                    //     }}
                    // >
                    //     <Typography component="h1" variant="h5">
                    //         You have updated your profile, continue to dashboard <NavLink to='/dashboard'>here</NavLink>!
                    //     </Typography>
                    // </Box>
                    <Navigate to="/dashboard" />
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
                            Updated Profile
                        </Typography>

                        <Box component="form" onSubmit={EditHandler} sx={{ mt: 2 }}>
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
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        error={errorMsg.phone_number}
                                        helperText={errorMsg.phone_number}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="credit_debit_no"
                                        label="Credit/Debit Number"
                                        name="credit_debit_no"
                                        value={cardNumber}
                                        onChange={(e) => setCardNumber(e.target.value)}
                                        error={errorMsg.credit_debit_no}
                                        helperText={errorMsg.credit_debit_no}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
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
                                    <Typography variant="body2" color="red" component="p">
                                        {avatar ? avatar.name : "No file selected"}
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Update
                            </Button>
                        </Box>
                    </Box>
                }
            </Container>
        </ThemeProvider>
    )
}

export default EditProfile;