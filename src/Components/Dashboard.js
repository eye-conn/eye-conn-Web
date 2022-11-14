// import axios from 'axios';
import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { getToken } from '../Utils/Common';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Backdrop  from '@mui/material/Backdrop';
import CircularProgress  from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

require('dotenv').config();



function Dashboard({setAuth: hasAuth, setAuthLoading: hasAuthLoading, Socket: socket, ...props}) {
  const [loading, setLoading] = useState(false)
  // const [allStations, setAllStations] = useState([])
  // const [inCode, setInCode] = useState(null)
  // const [outCode, setOutCode] = useState(null)
  // const user = getUser();
  // console.log(user)

  useEffect(() => {
    setLoading(true)
    axios.post(`${process.env.REACT_APP_HOST}/station/all`, {token: getToken()})
    .then((response) => {
      setLoading(false)
      // setAllStations(response.data.stations)
    }).catch((error) => {
      setLoading(false)
      // setAllStations([])
    })
    return () => {
      
    }
  }, [])
  
  if (loading) {
// return <div className="loadclass"><span className="loader-11"></span></div>;
return <>
<Backdrop
  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
  open={loading}
>
  <CircularProgress color="inherit" />
</Backdrop>
</>;  }  

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={8} lg={6}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 340,
                  }}
                >
                  <Box sx={{
            // marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
                    <Typography component="h1" variant="h5"> Encrypt</Typography>
                  </Box>
                </Paper>
              </Grid>
              
              <Grid item xs={12} md={4} lg={6}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 340,
                  }}
                >
                  <Box sx={{
            // marginTop: ,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
                    <Typography component="h1" variant="h5"> Decrypt</Typography>
                  </Box>
                </Paper>
              </Grid>
              
              {/* <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                </Paper>
              </Grid> */}
            </Grid>
          </Container>
  );
}

export default Dashboard;
