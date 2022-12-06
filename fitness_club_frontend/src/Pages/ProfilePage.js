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
import { Navigate } from "react-router-dom";

import { userContext, loggedInState } from '../userContext';

import { useState, useEffect, useContext } from 'react';
import { login } from '../api';
import { validateSignInForm } from './utils/validators';
import { getProfile } from '../api';
// import { withStyles, Card, CardContent, Typography } from '@material-ui/core';
import { Card, CardContent } from '@mui/material';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const UserProfile = (props) => {
    const { username, firstName, lastName, avatar, phoneNumber, email, cardInfo } = props;

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Item>
                {/* avatar */}
                <img src={avatar
                    ? avatar
                    : "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"}
                    alt="avatar"
                    style={{ width: "200px", height: "200px", borderRadius: "50%" }}
                />
            </Item>
            <Grid container rowSpacing={0} columnSpacing={0}>
                {/* squared item */}
                <Grid item xs={6}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} fontWeight='bold'>
                        Username:
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} align='right'>
                        {username}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} fontWeight='bold'>
                        Full name:
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} align='right'>
                        {firstName} {lastName}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} fontWeight='bold'>
                        Email:
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} align='right'>
                        {email}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} fontWeight='bold'>
                        Phone number:
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} align='right'>
                        {phoneNumber}
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} fontWeight='bold'>
                        Card Info:
                    </Typography>
                </Grid>
                <Grid item xs={8}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} align='right'>
                        {cardInfo}
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
};


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
        <ThemeProvider theme={theme}>
            {/* <Container component="main" maxWidth="xs">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Item>
                            <h1>Profile</h1>
                            <img src={profile?.avatar} alt="avatar" />
                            <h2>Username: {profile?.username}</h2>
                            <h2>First Name: {profile?.first_name}</h2>
                            <h2>Last Name: {profile?.last_name}</h2>
                            <h2>Email: {profile?.email}</h2>
                            <h2>Phone Number: {profile?.phone_number}</h2>
                            <h2>Card Info: {profile?.credit_debit_no}</h2>
                        </Item>
                        <Button
                            onClick={() => {
                                // localStorage.removeItem("token");
                                window.location.href = "/edit";
                            }}
                        >Edit</Button>
                    </Grid>
                </Grid>
            </Container> */}
            <Container component="main" maxWidth="xs">
                <UserProfile
                    username={profile?.username}
                    firstName={profile?.first_name}
                    lastName={profile?.last_name}
                    avatar={profile?.avatar}
                    phoneNumber={profile?.phone_number}
                    email={profile?.email}
                    cardInfo={profile?.credit_debit_no}
                />
                <Button
                    onClick={() => {
                        // localStorage.removeItem("token");
                        window.location.href = "/edit";
                    }}
                    variant="contained"
                >Edit</Button>
            </Container>
            
        </ThemeProvider>
    );
}
