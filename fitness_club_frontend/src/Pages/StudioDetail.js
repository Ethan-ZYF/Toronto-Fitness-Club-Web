import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { NavLink } from "react-router-dom";
import { styled } from '@mui/material/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getStudioDetail } from '../api';

const theme = createTheme();

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '200px',
    width: '200px',
    margin: 'auto',
    marginTop: '20px',
    marginBottom: '20px',
}));

export default function StudioDetail() {
    const [detail, setDetail] = useState({});
    const { id } = useParams();
    useEffect(() => {
        getStudioDetail(id)
        .then((response) => {
            setDetail(response.data);
            console.log(response.data)
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box sx={{ flexGrow: 1 }}>
                    <Item>
                        
                    </Item>
                    <Grid container rowSpacing={0} columnSpacing={0} paddingTop={10}>
                        <Grid item xs={6}>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} fontWeight='bold'>
                                Studio Name:
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} align='right'>
                                {detail['name']}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} fontWeight='bold'>
                                Address:
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} align='right'>
                                {detail['address']? detail['address'] : 'Not Provided'}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} fontWeight='bold'>
                                Location:
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} align='right'>
                                {detail['direction_link']? <NavLink to={detail['direction_link']}> Google Map Link</NavLink>: 'Not Provided'}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} fontWeight='bold'>
                                Postcode:
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} align='right'>
                                {detail['postcode']? detail['postcode'] : 'Not Provided'}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} fontWeight='bold'>
                                Phone Number:
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} align='right'>
                                {detail['phone_number']? detail['phone_number'] : 'Not Provided'}
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </ThemeProvider>
    )
}