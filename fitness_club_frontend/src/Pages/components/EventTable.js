import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Button } from '@mui/material';

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const handleEnrollClass = (e) => { }
    const handleEnrollEvent = (e) => { }

    //pagination
    const [rowsPerPage, setRowsPerPage] = React.useState(3);  
    const [page, setPage] = React.useState(0);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
    const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    };

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
                <TableCell align="left"><Button onClick={handleEnrollClass}>Enroll Class</Button></TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Events
                            </Typography>
                            <TableContainer>
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
                                                    {e.start_time}
                                                </TableCell>
                                                <TableCell>{e.start_time}</TableCell>
                                                <TableCell>{e.start_time}</TableCell>
                                                <TableCell >
                                                    {row.capacity - e.curr_size}
                                                </TableCell>
                                                <TableCell ><Button onClick={handleEnrollEvent}>Enroll Session</Button></TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                    <TableFooter>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={row.events.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableFooter>
                                </Table>
                                
                            </TableContainer>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}


export default function StudioTable({ classes }) {
    // console.log(JSON.stringify(classes))
    const rows = classes
    //pagination
    const [rowsPerPage, setRowsPerPage] = React.useState(2);  
    const [page, setPage] = React.useState(0);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
    const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    };

    return (
        <>
            {typeof (classes) !== 'undefined' &&
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
                                <Row key={row.name} row={row} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                
                <TablePagination
                rowsPerPageOptions={[1, 2]}
                component="div"
                count={rows.length}
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