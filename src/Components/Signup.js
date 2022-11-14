import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import axios from 'axios';
import { useState } from 'react'
import { Link } from 'react-router-dom';
import { Backdrop, CircularProgress } from '@mui/material';
// import { setUserSession } from '../Utils/Common';
// import logo from './.png'
require('dotenv').config();

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        Eye-conn
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const theme = createTheme();

function Signup(props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modal, setModal] = useState({state: false, data: null});
  

  // validate confirm password
  const validateConfirmPassword = (e) => {
    if (e.target.value !== e.target.form.password.value) {
      // e.target.setCustomValidity("Passwords Don't Match"); 
      setError("Passwords Don't Match") 
    } else {
      // e.target.setCustomValidity('');
      setError(null)
    }
  }

  // handle button click of login form
  const handleSubmit = (e) => {
    e.preventDefault();  
    // console.log(e.target.remember)
    setError(null);
    setLoading(true);
    axios.post(`${process.env.REACT_APP_HOST}/signup`, { name: e.target.name.value ,username: e.target.username.value, password: e.target.password.value }).then(response => {
      setLoading(false);
      setModal({state: true, data: response.data.message});
      // if (!modal.state && modal.data) props.history.push('/login');
    }).catch(error => {
      setLoading(false);
      console.log(error.response?.data)
      if (error.response?.status !== 500) setError(error.response?.data.error);
      else setError("Something went wrong. Please try again later.");
    });
  }



  const handleClose = () => {

    setModal({state:false, data:"push to login"});
    props.history.push('/login')
  };


  if (loading) {
return <>
<Backdrop
  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
  open={loading}
>
  <CircularProgress color="inherit" />
</Backdrop>
</>;  }

  return ( <><Dialog
    open={modal.state}
    TransitionComponent={Transition}
    keepMounted
    onClose={handleClose}
    aria-describedby="alert-dialog-slide-description"
  >
    <DialogTitle>{"Success"}</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-slide-description">
        {modal.data}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Okay</Button>
    </DialogActions>
  </Dialog>
   
    <ThemeProvider theme={theme}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Slide direction="right" in={true} mountOnEnter unmountOnExit>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Eye-conn
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="Name"
            autoComplete="name"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="cpassword"
            label="Confirm Password"
            type="password"
            id="cpassword"
            autoComplete="current-password"
            onChange={validateConfirmPassword}
          />
          <br/>
          {error && <><div style={{ color: 'red', textAlign: 'center', fontSize: '15px' }}>{error}</div></>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Signup
          </Button>
          <Grid container>
          <Grid item xs>
            </Grid>
            <Grid item>
              <Link to="/login" style={{ fontSize: "small", fontWeight: 'bold', color: '#1b86ff'}}>
                {"Already have an account ? Log in"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      </Slide>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  </ThemeProvider>

      
  </>);
  
}

export default Signup;