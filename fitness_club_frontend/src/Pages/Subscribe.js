import * as React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import { useState, useEffect, useContext } from 'react';
import { getCurrPlan } from '../api';
import { unsubscribe } from '../api';

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
                        {plan['price'] ? plan['price'] : 'Not Subscribed Currently'}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} fontWeight='bold'>
                        Expires On:
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} align='right'>
                        {plan['expire_date'] ? plan['expire_date'] : 'Not Subscribed Currently'}
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
};

const theme = createTheme();

export default function SubscribePage() {
    const [plan, setPlan] = useState({});
    useEffect(() => {
        getCurrPlan()
            .then((response) => {
                setPlan(response.data);
            })
            .catch((error) => {
                console.log("Error", error);
            });
    }, []);
    console.log(plan);
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <PlanDetails plan={plan} />
                {/* <Grid container style={{ marginTop: '20px' }}>
                    <Button
                        variant="contained"
                        style={{ marginLeft: '0px' }}
                        onClick={() => {
                            window.location.href = '/classes';
                        }}
                    >
                        View Classes
                    </Button>
                    
                    <Button
                        variant="contained"
                        style={{ marginRight: '0px' }}
                        onClick={() => {
                            unsubscribe()
                                .then((response) => {
                                    setPlan({});
                                    localStorage.removeItem('plan');
                                })
                                .catch((error) => {
                                    console.log("Error", error);
                                });
                        }}
                    >
                        Unsubscribe
                    </Button>
                </Grid> */}
                <Box
                    component="span"
                    m={1}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    marginTop='10px'
                >
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ height: 40 }}
                        onClick={() => {
                            window.location.href = '/classes';
                        }}
                    >
                        View Classes
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        sx={{ height: 40 }}
                        onClick={() => {
                            unsubscribe()
                                .then((response) => {
                                    setPlan({});
                                    localStorage.removeItem('plan');
                                })
                                .catch((error) => {
                                    console.log("Error", error);
                                });
                        }}
                    >
                        Unsubscribe
                    </Button>
                </Box>
            </Container>
        </ThemeProvider >
    );
}