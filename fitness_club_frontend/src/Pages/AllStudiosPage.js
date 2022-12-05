import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

import { getAllStudios } from '../api';
import { Studio } from './utils/constructors';
import { useState, useEffect } from 'react';

import StudioMapComponent from './components/StudioMapComponent';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import ClassIcon from '@mui/icons-material/Class';

import { filterStudios, searchLocationStudios } from '../api';

const theme = createTheme();

const StudiosPage = () => {
  const [studioLst, setStudioLst] = useState([]);

  const [filterName, setFilterName] = useState('');
  const [filterAmenity, setFilterAmenity] = useState('');
  const [filterClassName, setFilterClassName] = useState('');
  const [filterCoachName, setFilterCoachName] = useState('');

  const[showFilter, setShowFilter] = useState(false);
  const[showDistanceInput, setShowDistanceInput] = useState(false);

  const [searchLat, setSearchLat] = useState(43.666663);
  const [searchLng, setSearchLng] = useState(-79.40233);

  useEffect(
    () => {
      getAllStudios().then((response)=> {
        const studios = response.data.results.map((s) => {
          const ns = new Studio(s.id, s.name, s.address, s.location, s.postcode, s.phone_number, s.url);
          console.log(ns);
          return ns;
        });
        console.log(studios);
        setStudioLst(studios);
      });
    },[]);

  console.log(studioLst);

  const handleSearchLocation = async(event) => {
    event.preventDefault();
    const location = {
      latitude: searchLat,
      longitude: searchLng
    }
    searchLocationStudios(location)
      .then((response)=> {
        console.log(response);
        const studios = response.data.results.map((s) => {
          const ns = new Studio(s.id, s.name, s.address, s.location, s.postcode, s.phone_number, "http://127.0.0.1:8000/studios/studio-detail/"+s.id+"/"); // TODO: fix backend, passback url too
          console.log(ns);
          return ns;
        });
        console.log(studios);
        setStudioLst(studios);
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response.data);
      })
  }

  const handleFilter = async(event) => {
    event.preventDefault();
    const params = {
      name: filterName,
      amenities: filterAmenity,
      class_name: filterClassName,
      coach_name: filterCoachName
    }
    filterStudios(params)
      .then((response)=> {
        console.log(response);
        const studios = response.data.map((s) => {
          const ns = new Studio(s.id, s.name, s.address, s.location, s.postcode, s.phone_number, "http://127.0.0.1:8000/studios/studio-detail/"+s.id+"/"); // TODO: fix backend, passback url too
          console.log(ns);
          return ns;
        });
        console.log(studios);
        setStudioLst(studios);
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response.data);
      })
  }

  return (
    <>
      
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <main>
          {/* Hero unit */}
          <Box
            sx={{
              bgcolor: 'background.paper',
              pt: 8,
              pb: 0,
            }}
          >
            <Container maxWidth="sm">
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="text.primary"
                gutterBottom
              >
                View Studios 
              </Typography>
              <Typography variant="h5" align="center" color="text.secondary" paragraph>
                Here is the list of all of  our studios. <br/>
                Click on any to view more details. <br /> 
              </Typography>
              <Stack
                sx={{ pt: 4 }}
                direction="row"
                spacing={2}
                justifyContent="center"
              >
                <Button variant="contained" onClick={(e)=> {setShowFilter(!showFilter); setShowDistanceInput(false);}}>Search</Button>
                <Button variant="outlined" onClick={(e)=> {setShowDistanceInput(!showDistanceInput); setShowFilter(false);}}>View in order of distance</Button>
              </Stack>
            </Container>
          </Box>

          {/* search  */}
          {showFilter && !showDistanceInput && 
          <div>
            <Box
              sx={{
                bgcolor: 'background.paper',
                pt: 8,
                pb: 0,
              }}
              component="form" onSubmit={handleFilter}
            >
              <div style={{display: 'flex', flexWrap: 'wrap', justifyContent:'center'}}>
              <TextField
                id="outlined-start-adornment"
                sx={{ m: 1, width: '25ch' }}
                label="Enter Studio Name"
                name="filterName"
                value={filterName}
                onChange={(e) => setFilterName(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
  id="outlined-start-adornment"
  sx={{ m: 1, width: '25ch' }}
                label="Enter Amenity"
                name="filterAmenity"
                value={filterAmenity}
                onChange={(e) => setFilterAmenity(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FitnessCenterIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
  id="outlined-start-adornment"
  sx={{ m: 1, width: '25ch' }}
                label="Enter Class Name"
                name="filterClassName"
                value={filterClassName}
                onChange={(e) => setFilterClassName(e.target.value)}
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
  sx={{ m: 1, width: '25ch' }}
                label="Enter Coach Name"
                name="filterCoachName"
                value={filterCoachName}
                onChange={(e) => setFilterCoachName(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
              />
              </div>
              <div style={{display: 'flex', flexWrap: 'wrap', justifyContent:'center', marginTop:'2rem'}}>
              <Button variant="contained" type="submit">Apply Filters</Button>
              </div>
            </Box>

          </div>}

          {/* search location */}
          {showDistanceInput && !showFilter && 
          <div>
            <Box
              sx={{
                bgcolor: 'background.paper',
                pt: 8,
                pb: 0,
              }}
              component="form" onSubmit={handleSearchLocation}
            >
              <div style={{display: 'flex', flexWrap: 'wrap', justifyContent:'center'}}>
              <TextField
                id="searchLat"
                sx={{ m: 1, width: '25ch' }}
                label="Enter your latitude"
                name="searchLat"
                value={searchLat}
                onChange={(e) => setSearchLat(e.target.value)}
                InputProps={{
                  inputMode: 'numeric',
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
  id="searchLng"
  sx={{ m: 1, width: '25ch' }}
                label="Enter your longitude "
                name="searchLng"
                value={searchLng}
                onChange={(e) => setSearchLng(e.target.value)}
                InputProps={{
                  inputMode: 'numeric',
                  startAdornment: (
                    <InputAdornment position="start">
                      <FitnessCenterIcon />
                    </InputAdornment>
                  ),
                }}
              />
              </div>
              <div style={{display: 'flex', flexWrap: 'wrap', justifyContent:'center', marginTop:'2rem'}}>
              <Button variant="outlined" type="submit">Find Closest Studios</Button>
              </div>
            </Box>

          </div>
          }

          <Container sx={{ py: 8, width:'100'}}>
            <StudioMapComponent 
              studioLst={studioLst}
            />
          </Container>
        </main>
        
      </ThemeProvider>
      
    </>
  );
}

export default StudiosPage;