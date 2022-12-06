import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import { subscribePlan } from '../api';
import { getPlans } from '../api';
import { useState, useEffect } from 'react';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const tiers = [
    {
        title: 'Monthly',
        price: 0,
        description: [
            'unlimited access to gym',
            'unlimited access to pool',
            'unlimited access to sauna',
            '5 free classes',
        ],
        buttonText: 'Get started',
        buttonVariant: 'outlined',
    },
    {
        title: 'Yearly',
        price: 0,
        description: [
            'unlimited access to gym',
            'unlimited access to pool',
            'unlimited access to sauna',
            'unlimited classes',
        ],
        buttonText: 'Get started',
        buttonVariant: 'contained',
    },
];


function PricingContent() {
    const [monthly, setMonthly] = useState(false);
    const [yearly, setYearly] = useState(false);
    useEffect(() => {
        getPlans()
            .then((response) => {
                const results = response.data.results;
                if (results[0].plan === 'MONTHLY') {
                    setMonthly(results[0]);
                }
                else {
                    setYearly(results[0]);
                }
                if (results[1].plan === 'YEARLY') {
                    setYearly(results[1]);
                }
                else {
                    setMonthly(results[1]);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    tiers[0].price = monthly.price;
    tiers[0].id = monthly.id;
    tiers[1].price = yearly.price;
    tiers[1].id = yearly.id;
    // console.log("Price", tiers)
    return (
        <React.Fragment>
            <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
            <CssBaseline />
            <AppBar
                position="static"
                color="default"
                elevation={0}
                sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
            >
                <Toolbar sx={{ flexWrap: 'wrap' }}>
                    <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                        Toronto Fitness Club
                    </Typography>
                </Toolbar>
            </AppBar>
            {/* Hero unit */}
            <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 4, pb: 3 }}>
                <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    color="text.primary"
                    fontWeight="bold"
                    gutterBottom
                >
                    Pricing
                </Typography>
            </Container>
            {/* End hero unit */}
            <Container maxWidth="md" component="main">
                <Grid container spacing={10} alignItems="flex-center" columns={8}>
                    {tiers.map((tier) => (
                        // Enterprise card is full width at sm breakpoint
                        <Grid
                            item
                            key={tier.title}
                            xs={12}
                            sm={12}
                            md={4}
                        >
                            <Card>
                                <CardHeader
                                    //bold title
                                    title={tier.title}
                                    titleTypographyProps={{
                                        align: 'center',
                                        variant: 'h4',
                                        fontWeight: 'bold',
                                        color: tier.title === 'Monthly' ? 'black' : 'white',
                                    }}
                                    subheaderTypographyProps={{
                                        align: 'center',
                                    }}
                                    sx={{
                                        backgroundColor: tier.title === 'Yearly' ? 'primary.main' : 'grey.200',
                                    }}
                                />
                                <CardContent>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'baseline',
                                            mb: 2,
                                        }}
                                    >
                                        <Typography component="h2" variant="h3" color="text.primary">
                                            ${tier.price}
                                        </Typography>
                                        <Typography variant="h6" color="text.secondary">
                                            /{tier.title.includes('Yearly') ? 'year' : 'month'}
                                        </Typography>
                                    </Box>
                                    <ul>
                                        {tier.description.map((line) => (
                                            <Typography
                                                component="li"
                                                variant="subtitle1"
                                                align="center"
                                                key={line}
                                            >
                                                {line}
                                            </Typography>
                                        ))}
                                    </ul>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        fullWidth variant={tier.buttonVariant}
                                        //set action for button
                                        onClick={() => {
                                            if (localStorage.getItem('plan') !== null) {
                                                window.location.href = '/myplan';
                                                return;
                                            }
                                            const current = new Date();
                                            const subscribeInfo = {
                                                plan: tier.id,
                                                start_date: `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`,
                                            }
                                            subscribePlan(subscribeInfo)
                                                .then((response) => {
                                                    console.log(response);
                                                })
                                                .catch((error) => {
                                                    console.log(error);
                                                });
                                            console.log("subscibeInfo", subscribeInfo);
                                            window.location.href = '/myplan';
                                            localStorage.setItem('plan', tier.id);
                                        }}
                                    >
                                        {tier.buttonText}
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
            {/* Footer */}
            <Container
                maxWidth="md"
                component="footer"
                sx={{
                    borderTop: (theme) => `1px solid ${theme.palette.divider}`,
                    mt: 8,
                    py: [3, 6],
                }}
            >
                <Copyright sx={{ mt: 5 }} />
            </Container>
            {/* End footer */}
        </React.Fragment>
    );
}

export default function Pricing() {
    return <PricingContent />;
}