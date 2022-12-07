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
import { getPayments } from "../api";
import { useState, useEffect, useContext } from 'react';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

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
    useEffect(() => {
        getPayments()
            .then((response) => {
                setPayments(response.data.results);
            })
            .catch((err) => {
                console.log(err);
            }
            );
    }, []);
    console.log("payments", payments);
    return (
        <Box
            sx={{ width: '100%', height: 400, maxWidth: 500, bgcolor: 'background.paper' }}
            marginLeft="auto"
            marginRight="auto"
            marginTop="20px"
        >
            {payments.map((payment) => (
                renderRow(payment)
            ))}
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
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ flexGrow: 1 }}>
                {/* <MyList /> */}
                <VirtualizedList />
            </Box>
        </ThemeProvider>
    );
};

export default MyPayments;