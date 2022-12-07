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
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

// import MapIcon from '@mui/icons-material/Map';
import LocationOnIcon from '@mui/icons-material/LocationOn';

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

let itemData = []
let events = []


function renderRow(e) {
    return (
        <ListItem
            height={400}
            // width={1000}
            component="div"
            disablePadding
            sx={{
                marginBottom: '10px',
            }}
        >
            <ListItemButton sx={{
                borderRadius: '10px',
                border: '1px solid #3c59ff',
                width: '100%',
            }}>
                {/* <ListItemText primary={"$ " + payment.amount} /> */}
                {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} fontWeight='bold'>
                    {"Amount: $ " + payment.amount}<br />
                    {payment.date_and_time}<br />
                    {payment.card_info}
                </Typography> */}
                <Grid container rowSpacing={0} columnSpacing={0} >
                    {/* squared item */}
                    <Grid item xs={6}>
                        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }} fontWeight='bold' color='#3c59ff'>
                            Name
                        </Typography>
                    </Grid>
                    <Grid item xs={6} paddingBottom="5px">
                        <Typography
                            variant="h5"
                            component="div"
                            sx={{ flexGrow: 1 }}
                            align='right'
                            color='#3c59ff'
                        >
                            {e.class_name}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}  >
                            Time
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} align='right' >
                            {e.start_time}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} >
                            Length
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} align='right'>
                            {e.class_length_in_hour + " hours"}
                        </Typography>
                    </Grid>
                </Grid>
            </ListItemButton>
        </ListItem>
    );
}


const StandardImageList = () => {
    // console.log("itemData", itemData);
    return (
        <ImageList
            sx={{
                width: 500,
                height: 328,
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: '20px',
                marginBottom: '40px',
            }}
            cols={3}
            rowHeight={164}
        >
            {itemData.map((item) => (
                <ImageListItem>
                    <img
                        src={`${item.image}?w=164&h=164&fit=crop&auto=format`}
                        srcSet={`${item.image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        alt="https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png"
                        loading="lazy"
                    />
                </ImageListItem>
            ))}
        </ImageList>
    );
}
const Events = () => {
    return (
        <Box
            sx={{
                width: '100%',
                maxHeight: events.length * 400,
                maxWidth: 500,
                // display: 'flex',
                bgcolor: 'background.paper'
            }}
            marginLeft="auto"
            marginRight="auto"
            marginTop="20px"
        >
            {events.map((event) => (
                renderRow(event)
            ))}
        </Box>
    );
}


export default function StudioDetail() {
    const [detail, setDetail] = useState({});
    const { id } = useParams();
    useEffect(() => {
        getStudioDetail(id)
            .then((response) => {
                setDetail(response.data);
                // console.log(response.data)
                itemData = response.data.images;
                events = response.data.event_set;
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    // console.log("details", detail);
    // console.log("images", detail.images);
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" sx={{
                width: 700
            }}>
                <CssBaseline />
                <StandardImageList />
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container rowSpacing={0} columnSpacing={0} paddingTop={0}>
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
                                {detail['address'] ? detail['address'] : 'Not Provided'}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} fontWeight='bold'>
                                Map:
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} align='right'>
                                {
                                    detail['direction_link'] ?
                                        <a href={detail['direction_link']} target='_blank'>
                                            <LocationOnIcon />
                                        </a> :
                                        'Not Provided'
                                }
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} fontWeight='bold'>
                                Postcode:
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} align='right'>
                                {detail['postcode'] ? detail['postcode'] : 'Not Provided'}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} fontWeight='bold'>
                                Phone Number:
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} align='right'>
                                {detail['phone_number'] ? detail['phone_number'] : 'Not Provided'}
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
                <Events />
            </Container>
        </ThemeProvider>
    )
}