import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { enrollEvent, unenrollEvent, enrollClass, unenrollClass, getUserSchedule } from '../../api';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';


function Row(props) {
    const { row, UserScheduleEvents, UserScheduleClasses } = props;
    console.log(UserScheduleEvents);
    console.log(UserScheduleClasses);
    const [open, setOpen] = React.useState(false);

    const handleEnrollClass = async (event, row) => {
        event.preventDefault();
        console.log(row.name);
        enrollClass({ id: row.id })
            .then((response) => {
                console.log(response);
                console.log('You have successfully enrolled in class ' + row.name);
                window.location.reload();
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
                window.location.reload();
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
                console.log('You have successfully enrolled in class ' + e.class_name + ' session' + e.start_time);
                window.location.reload();
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
                console.log('You have successfully unenrolled in class ' + e.class_name + ' session' + e.start_time);
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
            });
    }


    const formatTime = (timeString) => {
        const [hourString, minute] = timeString.split(":");
        const hour = +hourString % 24;
        return (hour % 12 || 12) + ":" + minute + (hour < 12 ? "AM" : "PM");
    }
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

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
                <TableCell align="left">{UserScheduleClasses.has(row.name) ?
                    <Button variant="contained"
                        color='error'
                        onClick={(event) => handleUnenrollClass(event, row)}>Unenroll Class</Button> :
                    <Button variant="contained"
                        color='primary'
                        onClick={(event) => handleEnrollClass(event, row)}>Enroll Class</Button>}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{
                    paddingBottom: 0, paddingTop: 0,

                }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{
                            maxWidth: 700,
                            marginLeft: 'auto',
                            marginRight: 'auto',
                        }}>
                            <Typography variant="h7" gutterBottom component="div">
                                {row.description}
                            </Typography>
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
    useEffect(() => {
        if (typeof (classes) !== 'undefined') {
            setRows(classes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage));
        }
        console.log(rows)
    }, [classes]);

    const [UserScheduleEvents, setUserScheduleEvents] = useState(null);
    const [UserScheduleClasses, setUserScheduleClasses] = useState(null);
    useEffect(() => {
        getUserSchedule()
            .then((response) => {
                console.log(response);
                const scheduled_events_id = response.data.schedule.map((event) => { return event.id; });
                setUserScheduleEvents(new Set(scheduled_events_id));
                console.log('user schedule events', UserScheduleEvents);
                const scheduled_classes_name = response.data.schedule.map((event) => { return event.class_name; });
                setUserScheduleClasses(new Set(scheduled_classes_name));
                console.log('user schedule classes', UserScheduleClasses);

            })
            .catch((error) => {
                console.log(error);
            })
    }, []);


    return (
        <>
            {rows !== null && UserScheduleEvents !== null &&
                <Paper
                    sx={{
                        maxHeight: 440,
                        maxWidth: 800,
                    }}
                >
                    <TableContainer
                        component={Paper}>
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
                                    <Row key={row.name} row={row} UserScheduleEvents={UserScheduleEvents} UserScheduleClasses={UserScheduleClasses} />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        sx={{
                            maxWidth: 800,
                        }}
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