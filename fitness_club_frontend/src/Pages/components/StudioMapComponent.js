import React, {useState} from "react";
import GoogleMapReact from 'google-map-react';
import logo from '../images/mapmarker4.png';
import Avatar from '@mui/material/Avatar';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';

const Marker = ({text}) => <>
    <Avatar variant={"rounded"} alt="The image" src={logo} style={{width:20,height: 20,}} />
</>;

const StudioMapComponent = ({studioLst}) => {
    const [center, setCenter] = useState({lat: 43.666663, lng: -79.40233}) // use UofT location as default
    const [zoom, setZoom] = useState(13);
    console.log(studioLst)

  return (
    <div style={{display: "flex", flexDirection: "horizontal", justifyContent: 'space-between',}}>
        <div style={{ height: '25rem', width: '65%', }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyAreRSmfGodYkbaMSZ5NSivWWvblvmXSOU" }}
                defaultCenter={center}
                defaultZoom={zoom}
            >
                {typeof studioLst !== 'undefined' && studioLst.map((s) => 
                    <Marker
                        lat={parseFloat(s.location.split(',')[0])}
                        lng={parseFloat(s.location.split(',')[1])}
                        text={s.name}
                        key={s.id}
                    />
                )}
            </GoogleMapReact>
        </div>
        <Box style={{maxHeight: '25rem', width: '30%', overflow: 'auto'}}>
            <div>
                <Grid container spacing={2}>
                            {typeof studioLst !== 'undefined' && studioLst.map((studio) => (
                            <Grid item key={studio.id} xs={12} >
                            <Card
                                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                            >
                                {/* <CardMedia
                                component="img"
                                sx={{
                                }}
                                image="https://source.unsplash.com/random"
                                alt="random"
                                /> */}
                                <CardContent sx={{ flexGrow: 1 }}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {studio.name}
                                </Typography>
                                <Typography>
                                    Address: {studio.address}
                                </Typography>
                                <Typography>
                                    Postal Code: {studio.postcode}
                                </Typography>
                                <Typography>
                                    Phone Number: {studio.phone_number}
                                </Typography>
                                </CardContent>
                                <CardActions>
                                <Button size="small"> <Link to={"/studios/"+String(studio.id)+"/"}>Details</Link></Button>
                                </CardActions>
                            </Card>
                            </Grid>
                        ))}
                </Grid>
            </div>
        </Box>
    </div>
  );
}

export default StudioMapComponent;