import * as React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { NavLink } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import { useState, useEffect, useContext } from 'react';
import { getCurrPlan } from '../api';
import { unsubscribe } from '../api';
import moment from 'moment';

const formatDatetime = (datetime) => {
    if (datetime === undefined) { 
        return 'No active subscription'; 
    }
    // //.log(datetime);
    return datetime.slice(0, 10);
}

const PlanDetails = ({ plan }) => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container rowSpacing={0} columnSpacing={0} paddingTop={10}>
                <Grid item xs={6}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} fontWeight='bold'>
                        Plan:
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} align='right'>
                        {plan['plan'] ? plan['plan'] : 'Not Subscribed Currently'}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} fontWeight='bold'>
                        Price:
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} align='right'>
                        {plan['price'] ? "$ " + plan['price'] : 'Not Subscribed Currently'}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} fontWeight='bold'>
                        Expires On:
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} align='right'>
                    {plan['expire_date'] < new Date().toISOString() ? "No active subscription" : formatDatetime(plan['expire_date'])}
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
};

const theme = createTheme();

export default function SubscribePage() {
    const [plan, setPlan] = useState({});
    const [errorMsg, setErrorMsg] = useState('');
    useEffect(() => {
        getCurrPlan()
            .then((response) => {
                setPlan(response.data);
            })
            .catch((error) => {
                //.log("Error", error);
            });
    }, []);
    // //.log(plan);
    if (localStorage.getItem('user') === null) {
        return (
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} align='center' marginTop='100px'>
                        You are not logged in. Please <NavLink to='/login'>signin</NavLink> or <NavLink to='/signup'>signup</NavLink> to view this page.
                    </Typography>
                </Container>
            </ThemeProvider >
        );
    }
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <PlanDetails plan={plan} />
                <Box
                    component="span"
                    m={1}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    marginTop='10px'
                >
                    {localStorage.getItem('plan') ?
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ height: 40 }}
                            onClick={() => {
                                window.location.href = '/edit_plan';
                            }}
                        >
                            Edit Plan
                        </Button>
                        :
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ height: 40 }}
                            onClick={() => {
                                window.location.href = '/plans';
                            }}
                        >
                            View Plans
                        </Button>
                    }
                    <Button
                        variant="contained"
                        color="error"
                        sx={{ height: 40 }}
                        onClick={() => {
                            unsubscribe()
                                .then((response) => {
                                    //.log(response);
                                    if (response.data['detail'] === 'You are not subscribed.') {
                                        setErrorMsg('You are not subscribed.');
                                        return;
                                    }
                                    setPlan({});
                                    localStorage.removeItem('plan');
                                    window.location.href = '/myplan';
                                })
                                .catch((error) => {
                                    //.log("Error", error);
                                });
                        }}
                    >
                        Unsubscribe
                    </Button>
                </Box>
                <Typography variant="h6"
                    component="div"
                    sx={{ flexGrow: 1 }}
                    align='right'
                    color='error'
                    fontSize='12px'>
                    {errorMsg}
                </Typography>
            </Container>
        </ThemeProvider >
    );
}