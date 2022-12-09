import React, {useEffect, useState} from 'react';
import { getUserHistorySchedule } from '../api';

import CssBaseline from '@mui/material/CssBaseline';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';

const ViewHistoryPage = () => {
    //pagination
    const [rows, setRows] = useState(null);
    const [rowsPerPage, setRowsPerPage] = useState(2);  
    const [page, setPage] = React.useState(0);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        //.log(newPage);
        setRows(history.slice(newPage * rowsPerPage, newPage * rowsPerPage + rowsPerPage));
      };
    const handleChangeRowsPerPage = (event) => {
        let newRowNumber = event.target.value;
        setRowsPerPage(parseInt(newRowNumber, 10));
        setPage(0);
        let newPage = 0;
        setRows(history.slice(newPage * newRowNumber, newPage * newRowNumber + newRowNumber));
    };

    // history data
    const [history, setHistory] = useState(null);
    useEffect(()=> {
        getUserHistorySchedule()
        .then((response) => {
            //.log(response);
            const his = response.data.history;
            //.log(his);
            setHistory(his);
            //.log('user schedule', his);
            setRows(his.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage));
        })
        .catch((error)=>{
            //.log(error);
        })
    }, []);

    // format time
    const formatTime = (timeString) => {
        const [hourString, minute] = timeString.split(":");
        const hour = +hourString % 24;
        return (hour % 12 || 12) + ":" + minute + (hour < 12 ? "AM" : "PM");
    }
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];


    const theme = createTheme();
    return (
        <>
        <ThemeProvider theme={theme}>
        <CssBaseline />
        <main>
        { rows !== null && 

            <Container maxWidth="sm" sx={{
                bgcolor: 'background.paper',
                pt: 8,
                pb: 0,
              }}>
                <Container maxWidth="sm" sx={{
                bgcolor: 'background.paper',
                pt: 0,
                pb: 4,
              }}>
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="text.primary"
                gutterBottom
              >
                View Your Schedule History 
              </Typography>
              <Typography variant="h5" align="center" color="text.secondary" paragraph>
                Here is the list of your past sessions! <br/>
                Hope you enjoyed! <br /> 
              </Typography>
            </Container>

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Date</TableCell>
                            <TableCell align="left">Weekday</TableCell>
                            <TableCell align="left">Time</TableCell>
                            <TableCell align="left">Class Name</TableCell>
                            <TableCell align="left">Duration&nbsp;(h)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow>
                                <TableCell align="left">{row.start_time.split(" ")[0]}</TableCell> 
                                <TableCell align="left">{weekday[new Date(row.start_time).getDay()]}</TableCell>
                                <TableCell align="left"> {formatTime(row.start_time.split(" ")[1])}</TableCell>
                                <TableCell align="left">{row.class_name}</TableCell>
                                <TableCell align="left">{row.class_length_in_hour}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
            rowsPerPageOptions={[2, 4]}
            component="div"
            count={history.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            />
            </Container>

        }
        </main>
        </ThemeProvider>
        </>
    );
};

export default ViewHistoryPage;