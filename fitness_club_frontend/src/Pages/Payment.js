import * as React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';
import List from '@mui/material/List';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getFuturePayments, getPayments } from "../api";
import { Container } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const theme = createTheme();

function renderRow(payment) {
    return (
        <ListItem
            height={400}
            width={500}
            itemSize={46}
            component="div"
            disablePadding
        >
            <ListItemButton >
                <Grid container rowSpacing={0} columnSpacing={0} >
                    {/* squared item */}
                    <Grid item xs={6}>
                        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }} fontWeight='bold' color='#3c59ff'>
                            Time
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
                            {payment.date_and_time}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}  >
                            amount
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} align='right' >
                            {"$ " + payment.amount}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} >
                            Card Info
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} align='right'>
                            {payment.card_info}
                        </Typography>
                    </Grid>
                </Grid>
            </ListItemButton>
        </ListItem>
    );
}

const VirtualizedList = () => {
    const [payments, setPayments] = React.useState([]);
    const [next, setNext] = React.useState([]);
    const [pageCnt, setPageCnt] = React.useState(0);
    const [page, setPage] = React.useState(1);
    useEffect(() => {
        getPayments((page - 1) * 5)
            .then((response) => {
                setPageCnt(response.data.count % 5 == 0 ? response.data.count / 5 : Math.floor(response.data.count / 5) + 1);
                console.log(pageCnt);
                setPayments(response.data.results);
            })
            .catch((err) => {
                console.log(err);
            }
            );
        getFuturePayments()
            .then((response) => {
                console.log(response.data['future_payments']);
                setNext(response.data['future_payments']);
            })
            .catch((err) => {
                console.log(err);
            }
            );
    }, [page]);
    console.log("payments", payments);
    return (
        <Box
            sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper' }}
            marginLeft="auto"
            marginRight="auto"
            marginTop="20px"
        >
            <Typography variant="h4" component="div" sx={{ flexGrow: 1 }} fontWeight='bold' color='#3c59ff'>
                Payment History
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'left', alignItems: 'center', marginTop: '20px' }}>
                <FormControl style={{ width: '12.5%' }}>
                    <InputLabel>Page</InputLabel>
                    <Select
                        value={page}
                        label="Page"
                        onChange={(e) => {
                            setPage(e.target.value);
                        }}
                    >
                        {Array.from({ length: pageCnt }, (_, i) => <MenuItem key={i + 1} value={i + 1}>{i + 1}</MenuItem>)}
                    </Select>
                </FormControl>
            </Box>
            <Box
                sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper' }}
                marginLeft="auto"
                marginRight="auto"
                marginTop="10px"
                marginBottom="10px"
            >
                {payments.map((payment) => (
                    renderRow(payment)
                ))}
            </Box>
            <Typography variant="h4" component="div" sx={{ flexGrow: 1 }} fontWeight='bold' color='#3c59ff'>
                Next Payment
            </Typography>
            <Box
                sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper' }}
                marginLeft="auto"
                marginRight="auto"
                marginTop="10px"
            >
                {next.map((payment) => (
                    renderRow(payment)
                ))}
            </Box>
        </Box>
    );
}


// const MyList = () => {


//     return (
//         <List>
//             {payments.map((payment) => (
//                 <ListItem color='secondary'>
//                     <ListItemText primary={"$" + payment.amount} secondary={payment.date_and_time} />
//                     <ListItemText primary={""} secondary={payment.card_info} />
//                 </ListItem>
//             ))}
//         </List>
//     );
// };

const MyPayments = () => {
    if (localStorage.getItem("user") === null) {
        return (
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            You haven't signed in yet, signin <NavLink to='/signin'>here</NavLink> or signup <NavLink to='/signup'>here</NavLink>!
                        </Typography>
                    </Box>
                </Container>
            </ThemeProvider>
        );
    }
    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper' }}
                marginLeft="auto"
                marginRight="auto"
                marginTop="20px"
            >
                {/* <MyList /> */}
                <VirtualizedList />
            </Box>
        </ThemeProvider>
    );
};

export default MyPayments;