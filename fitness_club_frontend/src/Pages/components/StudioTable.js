import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableFooter from '@mui/material/TableFooter';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { enrollEvent, unenrollEvent, enrollClass, unenrollClass, getUserSchedule } from '../../api';


function Row(props) {
    const { row, userSchedule} = props;
    console.log(userSchedule);
    const [open, setOpen] = React.useState(false);

    const handleEnrollClass = async(event, row) => {
        event.preventDefault();
        console.log(row.id);
        enrollClass({id:row.id})
            .then((response) => {
                console.log(response);
                console.log('You have successfully enrolled in class '+row.name);
            })
            .catch((error)=>{
                console.log(error);
            });
    }

    const handleEnrollEvent = async(event, e) => { 
        event.preventDefault();
        console.log(e.id);
        enrollClass({id:e.id})
            .then((response) => {
                console.log(response);
                console.log('You have successfully enrolled in class ' + e.class_name+' session'+e.start_time);
            })
            .catch((error)=>{
                console.log(error);
            });
    }

    // //pagination
    // const [rowsPerPage, setRowsPerPage] = React.useState(3);  
    // const [page, setPage] = React.useState(0);
    // const [events, setEvents] = useState(null);
    // useEffect(()=> {
    //     if (typeof(row)!=='undefined'){
    //     setEvents(row.events.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage));}
    //     console.log(events)
    // }, [row]);

    // const handleChangePage = (event, newPage) => {
    //     setPage(newPage);
    //     setEvents(row.slice(newPage * rowsPerPage, newPage * rowsPerPage + rowsPerPage));
    // };
    // const handleChangeRowsPerPage = (event) => {
    //     let newRowNumber = event.target.value;
    //     setRowsPerPage(parseInt(newRowNumber, 10));
    //     setPage(0);
    //     let newPage = 0;
    //     setEvents(row.slice(newPage * newRowNumber, newPage * newRowNumber + newRowNumber));
    // };
    

    const formatTime = (timeString) => {
        const [hourString, minute] = timeString.split(":");
        const hour = +hourString % 24;
        return (hour % 12 || 12) + ":" + minute + (hour < 12 ? "AM" : "PM");
    }
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    return (
         <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">{row.coach}</TableCell>
                <TableCell align="left">{row.duration}</TableCell>
                <TableCell align="left">{row.capacity}</TableCell>
                <TableCell align="left"><Button variant="contained" onClick={(event) => handleEnrollClass(event, row)}>Enroll Class</Button></TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Events
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Start Time</TableCell>
                                        <TableCell>Weekday</TableCell>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Availabilities</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.events.map((e) => (
                                        <TableRow key={e.id}>
                                            <TableCell component="th" scope="row">
                                                {formatTime(e.start_time.split(" ")[1])}
                                            </TableCell>
                                            <TableCell>{weekday[new Date(e.start_time).getDay()]}</TableCell>
                                            <TableCell>{e.start_time.split(" ")[0]}</TableCell>
                                            <TableCell >
                                                {row.capacity - e.curr_size}
                                            </TableCell>
                                            <TableCell >{userSchedule.has(e.id) ? 
                                             <Button variant="outlined" onClick={(event)=> handleEnrollEvent(event, e)}>Unenroll Session</Button> :
                                            <Button variant="outlined" onClick={(event)=> handleEnrollEvent(event, e)}>Enroll Session</Button>
                                            }</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                                {/* <TableFooter>
                                <TablePagination
                rowsPerPageOptions={[1, 2, 3, 4]}
                component="div"
                count={row.events.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                />
        </TableFooter> */}
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
            
        </React.Fragment>
    );
}


export default function StudioTable({ classes }) {
    console.log(JSON.stringify(classes))
    //pagination
    const [rowsPerPage, setRowsPerPage] = React.useState(1);  
    const [page, setPage] = React.useState(0);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        console.log(newPage);
        setRows(classes.slice(newPage * rowsPerPage, newPage * rowsPerPage + rowsPerPage));
      };
    const handleChangeRowsPerPage = (event) => {
        let newRowNumber = event.target.value;
        setRowsPerPage(parseInt(newRowNumber, 10));
        setPage(0);
        let newPage = 0;
        setRows(classes.slice(newPage * newRowNumber, newPage * newRowNumber + newRowNumber));
    };
    const [rows, setRows] = useState(null);
    console.log(rows)
    useEffect(()=> {
        if (typeof(classes)!=='undefined'){
        setRows(classes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage));}
        console.log(rows)
    }, [classes]);

    const [userSchedule, setUserSchedule] = useState(null);
    useEffect(()=> {
        getUserSchedule()
        .then((response) => {
            console.log(response);
            const scheduled_events_id = response.data.schedule.map((event) => {return event.id;});
            setUserSchedule(new Set(scheduled_events_id));
            console.log('user schedule', userSchedule);
        })
        .catch((error)=>{
            console.log(error);
        })
    }, []);


    return (
        <>
            {rows !== null && userSchedule !== null &&
             <Paper>
                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell align="left">Class Name</TableCell>
                                <TableCell align="left">Coach</TableCell>
                                <TableCell align="left">Duration&nbsp;(h)</TableCell>
                                <TableCell align="left">Capacity</TableCell>
                                <TableCell align="left"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <Row key={row.name} row={row} userSchedule={userSchedule}/>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                rowsPerPageOptions={[1, 2]}
                component="div"
                count={classes.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                />
             </Paper>
            }
        </>

    );
};