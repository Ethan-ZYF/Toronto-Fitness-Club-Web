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
import { getStudioDetail, filterEvents } from '../api';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import StudioTable from './components/NewTable';
import usePagination from './components/Paginate';
import Pagination from '@mui/material/Pagination';
import Divider from '@mui/material/Divider';
import PhoneIcon from '@mui/icons-material/Phone';
import InputAdornment from '@mui/material/InputAdornment';
import ClassIcon from '@mui/icons-material/Class';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// import MapIcon from '@mui/icons-material/Map';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const theme = createTheme();

let itemData = []
let events = []


const PaginatedEvents = () => {
    let [page, setPage] = useState(1);
    const PER_PAGE = 5;

    const count = Math.ceil(events.length / PER_PAGE);
    const _DATA = usePagination(events, PER_PAGE);
    console.log("data", _DATA.currentData())

    const handleChange = (e, p) => {
        setPage(p);
        _DATA.jump(p);
    };

    return (
        <Box
            p="5"
            sx={{
                width: '100%',
                maxWidth: 500,
                height: 800,
                marginLeft: 'auto',
                marginRight: 'auto',
            }}
        >
            <List p="10" pt="3" spacing={2}>
                {_DATA.currentData().map(v => {
                    return (
                        // <ListItem key={v.id} listStyleType="disc">
                        //     <span>{v.class_name}</span>{" "}
                        //     <Divider display="inline" orientation="vertical" />
                        //     <span> {v.start_time}</span>{" "}
                        //     <Divider display="inline" orientation="vertical" />
                        // </ListItem>
                        renderRow(v)
                    );
                })}
            </List>

            <Pagination
                count={count}
                size="large"
                page={page}
                variant="outlined"
                shape="rounded"
                onChange={handleChange}
            />
        </Box>
    );
}

function renderRow(e) {
    return (
        <ListItem
            height={200}
            // width={1000}
            component="div"
            disablePadding
            sx={{
                marginBottom: '10px',
            }}
            key={e.id}
        >
            <ListItemButton sx={{
                borderRadius: '10px',
                border: '1px solid #3c59ff',
                width: '100%',
                height: '100%',
            }}>
                <Grid container rowSpacing={0} columnSpacing={0} >
                    <Grid item xs={6}>
                        <Typography variant="p" component="div" sx={{ flexGrow: 1 }} fontWeight='bold' color='#3c59ff'>
                            Name
                        </Typography>
                    </Grid>
                    <Grid item xs={6} paddingBottom="5px">
                        <Typography
                            variant="p"
                            component="div"
                            sx={{ flexGrow: 1 }}
                            align='right'
                            color='#3c59ff'
                            key={e.id}
                        >
                            {e.class_name}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="p" component="div" sx={{ flexGrow: 1 }}  >
                            Time
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="p" component="div" sx={{ flexGrow: 1 }} align='right' >
                            {e.start_time}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="p" component="div" sx={{ flexGrow: 1 }} >
                            Length
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="p" component="div" sx={{ flexGrow: 1 }} align='right'>
                            {e.class_length_in_hour + " hours"}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="p" component="div" sx={{ flexGrow: 1 }} >
                            Remaining
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="p" component="div" sx={{ flexGrow: 1 }} align='right'>
                            {e.curr_size} / {e.class_capacity}
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
                width: 800,
                height: 164,
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: '20px',
                marginBottom: '40px',
                gridAutoFlow: "column",
                gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr)) !important",
                gridAutoColumns: "minmax(160px, 1fr)",
                overflowY: 'hidden',
                overflowX: 'auto',
            }}
            cols={3}
            rowHeight={164}
        >
            {itemData.map((item) => (
                <ImageListItem key={item}>
                    <img
                        // src={`${item.image}?h=164&fit=crop&auto=format`}
                        // srcSet={`${item.image}?h=164&fit=crop&auto=format&dpr=2 2x`}
                        src={`${item.image}?h=164&fit=crop&auto=format`}
                        srcSet={`${item.image}?h=164&fit=crop&auto=format&dpr=2 2x`}
                        alt="https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png"
                        loading="lazy"
                    />
                </ImageListItem>
            ))}
        </ImageList>
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

    function SimpleAccordion() {
        return (
            <Accordion
                sx={{
                    width: 300,
                    marginTop: '50px',
                    display: 'flex-start',
                }}

            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography
                        variant="h5"
                        component="div"
                        sx={{ flexGrow: 1 }}
                        fontWeight='bold'
                        align='center'
                        color='#3c59ff'
                    >
                        Amenities
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Amenities />
                </AccordionDetails>
            </Accordion>
        );
    };

    const Header = () => {
        return (
            <Container
                maxWidth="sm"
                sx={{
                    marginTop: '20px',
                    marginBottom: '20px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                }}
            >
                <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    color="text.primary"
                    gutterBottom
                    fontFamily={'Verdana'}
                >
                    {detail.name}
                </Typography>

                <Typography variant="h6" align="center" color="text.secondary" paragraph>
                    {
                        detail['direction_link'] ?
                            <a href={detail['direction_link']} target='_blank' rel="noreferrer">
                                <LocationOnIcon
                                    sx={{
                                        width: 20,
                                        height: 20,
                                        marginRight: '5px',
                                        marginBottom: '-2px',
                                    }}
                                    color="primary"
                                />
                            </a> : ''
                    }{
                        detail['address'] ? detail['address'] : ''
                    } {
                        detail['postcode'] ? detail['postcode'] : ''
                    }

                </Typography>
                <Typography variant="h6" align="center" color="text.secondary" paragraph>
                    <PhoneIcon
                        sx={{
                            width: 20,
                            height: 20,
                            marginRight: '5px',
                            marginBottom: '-2px',
                        }}
                        color="primary"
                    />
                    {detail['phone_number'] ? detail['phone_number'] : ''}
                </Typography>
            </Container>
        )
    };


    const Amenities = () => {
        return (
            <Box
                sx={{
                    width: '100%',
                    maxWidth: 500,
                    // display: 'flex',
                    bgcolor: 'background.paper'
                }}
                marginLeft="auto"
                marginRight="auto"
                marginTop="20px"
            >
                {detail.amenities ? detail.amenities.map((amenity) => (
                    <ListItem key={amenity.id} listStyleType="disc">
                        <Grid container spacing={2}>
                            <Grid item xs={8}>
                                <Typography variant="p" component="div" sx={{ flexGrow: 1 }} fontWeight='bold'>
                                    {amenity.type}
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="p" component="div" sx={{ flexGrow: 1 }} align='right'>
                                    {amenity.quantity}
                                </Typography>
                            </Grid>
                        </Grid>
                    </ListItem>
                )) :
                    <Typography variant="p" component="div" sx={{ flexGrow: 1 }} fontWeight='bold'>
                        No amenities
                    </Typography>
                }
            </Box>
        );
    };

    const handleFilter = () => {
        console.log('filter')
    }
    const [day, setDay] = useState('');
    const [timeBegin, setTimeBegin] = useState('');
    const [timeEnd, setTimeEnd] = useState('');
    const [className, setClassName] = useState('');
    const [coach_name, setCoachName] = useState('');

    useEffect(() => {
        console.log(day, timeBegin, timeEnd, className, coach_name)
    }, [day, timeBegin, timeEnd, className, coach_name]);
    
    const FilterForm = () => {
        return (
            <Box
                sx={{
                    bgcolor: 'background.paper',
                    pt: 8,
                    pb: 0,
                    width: '100%',
                }}
                component="form" onSubmit={handleFilter}
            >
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <TextField
                        id="outlined-start-adornment"
                        sx={{ m: 1, width: 300 }}
                        label="On Day"
                        name="filterDay"
                        value={day}
                        onChange={(e) => setDay(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <ClassIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        id="outlined-start-adornment"
                        sx={{ m: 1, width: 300 }}
                        label="After"
                        name="filterTimeBegin"
                        value={timeBegin}
                        onChange={(e) => setTimeBegin(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <ClassIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        id="outlined-start-adornment"
                        sx={{ m: 1, width: 300 }}
                        label="Before"
                        name="filterTimeEnd"
                        value={timeEnd}
                        onChange={(e) => setTimeEnd(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <ClassIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        id="outlined-start-adornment"
                        sx={{ m: 1, width: 300 }}
                        label="Class"
                        name="filterClassName"
                        value={className}
                        onChange={(e) => setClassName(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <ClassIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        id="outlined-start-adornment"
                        sx={{ m: 1, width: 300 }}
                        label="Enter Coach Name"
                        name="filterCoachName"
                        value={coach_name}
                        onChange={(e) => setCoachName(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <ClassIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '2rem' }}>
                    <Button variant="contained" type="submit">Apply Filters</Button>
                </div>
            </Box>
        )
    }



    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container>
                <Header />
                <StandardImageList />
            </Container>
            <Grid container spacing={0}
                sx={{
                    width: 1200,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    minWidth: 1000,
                }}
            >
                <Grid item xs={4} md={6}>
                    <FilterForm />
                </Grid>
                <Grid item xs={8} md={6}>
                    <PaginatedEvents />
                </Grid>
                <Grid item xs={4} md={4}>
                    <SimpleAccordion />
                </Grid>
                <Grid item xs={8} md={8}>
                    <Container
                        sx={{
                            width: 500,
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            marginTop: '0px',
                            minWidth: 1000,
                        }}
                    >
                        {localStorage.getItem('user') ?
                            <StudioTable classes={detail.classes} />
                            :
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} align='center' marginTop={10}>
                                Please <NavLink to="../signin">sign in</NavLink> or <NavLink to="../signup">sign up</NavLink> to enroll in classes.
                            </Typography>
                        }
                    </Container>
                </Grid>
            </Grid>

        </ThemeProvider>
    )
}