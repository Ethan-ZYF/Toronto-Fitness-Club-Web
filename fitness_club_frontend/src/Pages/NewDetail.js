import React, { useState, useEffect } from "react";
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
import { useParams } from 'react-router-dom';
import { getStudioDetail, filterEvents, getUserSchedule, enrollEvent, unenrollEvent, enrollClass, unenrollClass } from '../api';
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

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

// import MapIcon from '@mui/icons-material/Map';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const theme = createTheme();

let itemData = []
let events = []


const PaginatedEvents = () => {
    let [page, setPage] = useState(1);
    const PER_PAGE = 3;

    const count = Math.ceil(events.length / PER_PAGE);
    const _DATA = usePagination(events, PER_PAGE);
    // console.log("data", _DATA.currentData())

    const handleChange = (e, p) => {
        setPage(p);
        _DATA.jump(p);
    };

    return (
        <Box
            p="0"
            sx={{
                width: '100%',
                height: '100%',
                maxWidth: 600,
                marginLeft: 'auto',
                marginRight: 'auto',
            }}
        >
            <Pagination
                sx={{
                    marginLeft: 'auto',
                    marginRight: 'auto',
                }}
                count={count}
                size="sm"
                page={page}
                variant="outlined"
                shape="rounded"
                onChange={handleChange}
            />
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
                // marginBottom: '60px',
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
                <ImageListItem
                    key={item.image}
                >
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

const FilteredEventsTable = ({filteredEvents, userScheduleEvents, handleEnrollEvent, handleUnenrollEvent}) => {
    //pagination
    const [rowsPerPage, setRowsPerPage] = useState(5);  
    const [page, setPage] = useState(0);
    const [rows, setRows] = useState(null);
    useEffect(() => {
        if (filteredEvents !== null) {
            setRowsPerPage(5);
            setPage(0);
            setRows(filteredEvents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage));
        }
        console.log(rows)
    }, [filteredEvents]);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        console.log(newPage);
        setRows(filteredEvents.slice(newPage * rowsPerPage, newPage * rowsPerPage + rowsPerPage));
    };
    const handleChangeRowsPerPage = (event) => {
        let newRowNumber = event.target.value;
        setRowsPerPage(parseInt(newRowNumber, 10));
        setPage(0);
        let newPage = 0;
        setRows(filteredEvents.slice(newPage * newRowNumber, newPage * newRowNumber + newRowNumber));
    };


    const formatTime = (timeString) => {
        const [hourString, minute] = timeString.split(":");
        const hour = +hourString % 24;
        return (hour % 12 || 12) + ":" + minute + (hour < 12 ? "AM" : "PM");
    }
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    return (
        <TableContainer component={Paper}>
            <Table >
                <TableHead>
                    <TableRow>
                        <TableCell>Class</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Weekday</TableCell>
                        <TableCell>Start Time</TableCell>
                        <TableCell>Duration&nbsp;(h)</TableCell>
                        <TableCell>Availabilities</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows !== null && userScheduleEvents !== null && 
                    rows.map((e)=>(
                        <TableRow  key={e.id}>
                        <TableCell>{e.class_name}</TableCell>
                        <TableCell>{e.start_time.split(" ")[0]}</TableCell>
                        <TableCell>{weekday[new Date(e.start_time).getDay()]}</TableCell>
                        <TableCell> {formatTime(e.start_time.split(" ")[1])}</TableCell>
                        <TableCell>{e.class_length_in_hour}</TableCell>
                        <TableCell>{e.class_capacity - e.curr_size}</TableCell>
                        <TableCell>{userScheduleEvents.has(e.id)? 
                                    <Button variant="contained" color='error' onClick={(event)=>handleUnenrollEvent(event, e)}>Unenroll</Button>:
                                    <Button variant="contained" color='primary'onClick={(event)=>handleEnrollEvent(event, e)}>Enroll</Button>}
                        </TableCell>
                        </TableRow>
                    )
                    )}
                </TableBody>
            </Table>
                            <TablePagination
                            // sx={{
                            //     maxWidth: 800,
                            // }}
                                rowsPerPageOptions={[1, 2, 3, 4]}
                                component="div"
                                count={filteredEvents !== null ? filteredEvents.length : 0}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                            </TableContainer>
    )

}


export default function StudioDetail() {
    const [openFilter, setOpenFilter] = useState(false);

    const [detail, setDetail] = useState({});
    const { id } = useParams();

    const [filteredEvents, setFilteredEvents] = useState(null);
    const [userScheduleEvents, setUserScheduleEvents] = useState(null);
    const [userScheduleClasses, setUserScheduleClasses] = useState(null);
        
    const [day, setDay] = useState('')
    const [timeBegin, setTimeBegin] = useState('')
    const [timeEnd, setTimeEnd] = useState('')
    const [className, setClassName] = useState('')
    const [coachName, setCoachName] = useState('')

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

        filterEvents({id, params: null})
            .then((response) => {
                console.log(response.data);
                setFilteredEvents(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

        getUserSchedule()
            .then((response)=>{
                const scheduled_events_id = new Set(response.data.schedule.map((event) => { return event.id; }));
                console.log(scheduled_events_id);
                setUserScheduleEvents(scheduled_events_id);

                const scheduled_classes_name = new Set(response.data.schedule.map((event) => { return event.class_name; }));
                console.log('user schedule classes', scheduled_classes_name);
                setUserScheduleClasses(scheduled_classes_name);
            })
            .catch((error)=>{
                console.log(error);
            });
    }, []);

    function SimpleAccordion() {
        return (
            <Accordion>
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

    function UpcomingAccordon() {
        return (
            <Accordion
                sx={{
                    marginLeft: 'auto',
                    marginRight: 'auto',
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
                    >Upcoming Events</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <PaginatedEvents />
                </AccordionDetails>
            </Accordion >
        );
    }

    const Header = () => {
        return (
            <Container
                maxWidth="sm"
                sx={{
                    pt:8,
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
                    // fontFamily={'Verdana'}
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
                    <ListItem key={amenity.type} listStyleType="disc">
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

    const applyFilter = (event) => {
        const params = {
            ...day !== '' && {'date': day},
            ...timeBegin !== '' && {'time_begin': timeBegin},
            ...timeEnd !== '' && {'time_end': timeEnd},
            'class_name': className,
            'coach_name': coachName
        }
        console.log(params);
        filterEvents({id, params})
            .then((response) => {
                console.log(response);
                setFilteredEvents(response.data);
                console.log(filteredEvents);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleEnrollEvent = async (event, e) => {
        event.preventDefault();
        console.log(e.id);
        enrollEvent({ id: e.id })
            .then((response) => {
                console.log(response);
                console.log('You have successfully enrolled in class ' + e.class_name + ' session' + String(e.id) + ' Time ' + e.start_time);
                // window.location.reload();
                // instead of reload page we send request to get new user schedule 
                getUserSchedule()
                    .then((response)=>{
                        const scheduled_events_id = new Set(response.data.schedule.map((event) => { return event.id; }));
                        console.log(scheduled_events_id);
                        setUserScheduleEvents(scheduled_events_id);
        
                        const scheduled_classes_name = new Set(response.data.schedule.map((event) => { return event.class_name; }));
                        console.log('user schedule classes', scheduled_classes_name);
                        setUserScheduleClasses(scheduled_classes_name);
                    })
                    .catch((error)=>{
                        console.log(error);
                    });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleUnenrollEvent = async (event, e) => {
        event.preventDefault();
        console.log(e.id);
        unenrollEvent({ id: e.id })
            .then((response) => {
                console.log(response);
                console.log('You have successfully unenrolled in class ' + e.class_name + ' session' + String(e.id) + ' Time ' + e.start_time);
                // window.location.reload();
                getUserSchedule()
                    .then((response)=>{
                        const scheduled_events_id = new Set(response.data.schedule.map((event) => { return event.id; }));
                        console.log(scheduled_events_id);
                        setUserScheduleEvents(scheduled_events_id);
        
                        const scheduled_classes_name = new Set(response.data.schedule.map((event) => { return event.class_name; }));
                        console.log('user schedule classes', scheduled_classes_name);
                        setUserScheduleClasses(scheduled_classes_name);
                    })
                    .catch((error)=>{
                        console.log(error);
                    });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleEnrollClass = async (event, row) => {
        event.preventDefault();
        console.log(row.name);
        enrollClass({ id: row.id })
            .then((response) => {
                console.log(response);
                console.log('You have successfully enrolled in class ' + row.name);
                // window.location.reload();
                getUserSchedule()
                .then((response)=>{
                    const scheduled_events_id = new Set(response.data.schedule.map((event) => { return event.id; }));
                    console.log(scheduled_events_id);
                    setUserScheduleEvents(scheduled_events_id);
    
                    const scheduled_classes_name = new Set(response.data.schedule.map((event) => { return event.class_name; }));
                    console.log('user schedule classes', scheduled_classes_name);
                    setUserScheduleClasses(scheduled_classes_name);
                })
                .catch((error)=>{
                    console.log(error);
                });

            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleUnenrollClass = async (event, row) => {
        event.preventDefault();
        console.log(row.name);
        unenrollClass({ id: row.id })
            .then((response) => {
                console.log(response);
                console.log('You have successfully unenrolled in class ' + row.name);
                // window.location.reload();

                getUserSchedule()
                .then((response)=>{
                    const scheduled_events_id = new Set(response.data.schedule.map((event) => { return event.id; }));
                    console.log(scheduled_events_id);
                    setUserScheduleEvents(scheduled_events_id);
    
                    const scheduled_classes_name = new Set(response.data.schedule.map((event) => { return event.class_name; }));
                    console.log('user schedule classes', scheduled_classes_name);
                    setUserScheduleClasses(scheduled_classes_name);
                })
                .catch((error)=>{
                    console.log(error);
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const checkAuthPlan = () => {
        // {localStorage.getItem('user') ?
        //     {localStorage.getItem('plan') ?
        //         <StudioTable classes={detail.classes} userScheduleClasses={userScheduleClasses} 
        //         handleEnrollClass={handleEnrollClass} handleUnenrollClass={handleUnenrollClass}
        //         />
        //         :
        //         <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} align='center' marginTop={10}>
        //             Please <NavLink to="../plans">subscribe</NavLink> to enroll in classes.
        //         </Typography>
        //     }
        //     :
        //     <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} align='center' marginTop={10}>
        //         Please <NavLink to="../signin">sign in</NavLink> or <NavLink to="../signup">sign up</NavLink> to enroll in classes.
        //     </Typography>
        // }
        if (localStorage.getItem('user')) {
            if (localStorage.getItem('plan')) {
                return <StudioTable classes={detail.classes} userScheduleClasses={userScheduleClasses} 
                        handleEnrollClass={handleEnrollClass}
                        handleUnenrollClass={handleUnenrollClass}
                    />;
            } else {
                return <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} align='center' marginTop={10}>
                    Please <NavLink to="../plans">subscribe</NavLink> to enroll in classes.
                </Typography>;
            }
        } else {
            return <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} align='center' marginTop={10}>
                Please <NavLink to="../signin">sign in</NavLink> or <NavLink to="../signup">sign up</NavLink> to enroll in classes.
            </Typography>;
        }
    }
    
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container>
                <Header />
                <StandardImageList />
            </Container>
            <div
                style={{ width:'80%', margin:'auto', display:'flex', flexWrap:'wrap'}}
            >
                <div style={{width: '100%', display:'flex',  padding:'3rem'}}>
                    <Button variant='outlined' onClick={(e)=>{setOpenFilter(!openFilter)}}> Search Sessions Here! </Button>
                </div>
                { openFilter && 
                <>
                    {/* filter */}
                    <div style={{width:'35%', display:'flex', flexDirection:'column', 
                    justifyContent:'center', alignContent:'center', alignItems:'center', padding:'3rem', paddingTop:'1.25rem'}}>
                        <TextField
                            sx={{ m: 1, width: 300 }}
                            label="On Date: xxxx(year)-xx(month)-xx(day)"
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
                            sx={{ m: 1, width: 300 }}
                            label="Start After Time: xx(hour):xx(min):xx(sec)"
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
                            sx={{ m: 1, width: 300 }}
                            label="Start Before Time: xx(hour):xx(min):xx(sec)"
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
                            sx={{ m: 1, width: 300 }}
                            label="Class Name:"
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
                            sx={{ m: 1, width: 300 }}
                            label="Coach Name:"
                            value={coachName}
                            onChange={(e) => setCoachName(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <ClassIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />                   
                        <Button
                            variant="contained"
                            onClick={applyFilter}
                            style={{width: '100%', marginTop:'2rem'}}
                        >
                            Apply Filter
                        </Button>
                    </div>

                    {/* filtered events table */}
                    <div style={{width:'65%'}}>
                        {/* TODO! put the filtered results here */}
                        <FilteredEventsTable filteredEvents={filteredEvents} userScheduleEvents={userScheduleEvents} 
                        handleEnrollEvent={handleEnrollEvent} handleUnenrollEvent={handleUnenrollEvent}
                        />
                    </div>
                </>
                }

                {/* info: amenities */}
                <div style={{width:'35%', padding:'3rem', paddingTop:'1.5rem'}}>   
                    <SimpleAccordion />
                    <UpcomingAccordon />
                </div>
                {/* info: classes */}
                <div style={{width:'65%'}}>
                    <Container>
                        {checkAuthPlan()}
                    </Container>
                </div>
            </div>

        </ThemeProvider>
    )
}