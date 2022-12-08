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
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import { color } from '@mui/system';

function Row( { row, userScheduleClasses, handleEnrollClass, handleUnenrollClass}) {
    const [open, setOpen] = React.useState(false);
    useEffect(() => {
    }, [row, userScheduleClasses]);

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
                <TableCell align="left">{userScheduleClasses.has(row.name) ?
                    <Button variant="contained"
                        color='error'
                        onClick={(event) => handleUnenrollClass(event, row)}>Unenroll Class</Button> :
                    <Button variant="contained"
                        color='primary'
                        onClick={(event) => handleEnrollClass(event, row)}>Enroll Class</Button>}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{
                    paddingBottom: 0, paddingTop: 0,

                }} colSpan={6}>
                    <Collapse
                        sx={{
                            maxWidth: 700,
                            marginLeft: 'auto',
                            marginRight: 'auto',
                        }}
                        in={open} timeout="auto" unmountOnExit>
                        <Box sx={{
                            width: '100%',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            marginTop: 1,
                            marginBottom: 1,
                        }}>
                            <Grid container rowSpacing={0} columnSpacing={2}>
                                <Grid item xs={9}>
                                    <Typography variant="h7" gutterBottom component="div">
                                        {row.description}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3}
                                    sx={{
                                        width: '100%',
                                        wrap: 'wrap'
                                    }}
                                >
                                    <Stack
                                        sx={{
                                            width: '80%',
                                            marginLeft: 'auto',
                                            marginRight: 'auto',
                                        }}
                                        direction="column" spacing={0.5}>
                                        {row.tags.map((t) => (
                                            <Chip
                                                sx={{
                                                    width: '100%',
                                                    color: 'black',
                                                    backgroundColor: 'lightblue',
                                                    margin: 'auto',
                                                }}
                                                label={t}
                                                variant="outlined"
                                            />
                                        ))}
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>

        </React.Fragment>
    );
}

export default function StudioTable({ classes, userScheduleClasses, handleEnrollClass, handleUnenrollClass}) {

    // pagination
    const [rowsPerPage, setRowsPerPage] = React.useState(2);
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

    useEffect(() => {
        if (typeof (classes) !== 'undefined') {
            setRows(classes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage));
        }
        console.log(rows);
    }, [classes]);

    return (
        <>
                <TableContainer
                    component={Paper}>
                    <Table aria-label="collapsible table" >
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
                        {rows !== null && userScheduleClasses !== null &&
                            rows.map((row) => (
                                <Row key={row.name} row={row} userScheduleClasses={userScheduleClasses} 
                                handleEnrollClass={handleEnrollClass} handleUnenrollClass={handleUnenrollClass}/>
                            ))
                        }
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[1, 2, 3]}
                    component="div"
                    count={typeof (classes) !== 'undefined'? classes.length : 0}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />           
        </>

    );
};