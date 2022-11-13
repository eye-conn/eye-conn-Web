import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useState,useCallback } from 'react'
import { setUserSession } from '../Utils/Common';
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

const theme = createTheme();

function Login({setAuth: hasAuth, setAuthLoading: hasAuthLoading, Socket: socket, ...props}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("fhvhvhjhjhv hvjycfrsdrftygk bjku");

  const isLogged = useCallback((val) => {
          hasAuthLoading(!val);
          hasAuth(val);
        },
        [hasAuth,hasAuthLoading],
      );

  // handle button click of login form
  const handleLogin = (e) => {
    e.preventDefault();   
    console.log(e.target.remember)
    setError(null);
    setLoading(true);
    axios.post(`${process.env.REACT_APP_HOST}/login`, { username: e.target.username.value, password: e.target.password.value, remember: "ADMIN" }).then(response => {
      setLoading(false);
      setUserSession(response.data?.token, response.data?.username, response.data?.name);
      isLogged(true)
      props.history.push('/dashboard');
    }).catch(error => {
      setLoading(false);
      console.log(error.response?.data)
      if (error.response?.status === 401) setError(error.response?.data.error);
      else setError("Something went wrong. Please try again later.");
    });
  }


  if (loading) {
// return <div className="loadclass"><span className="loader-11"></span></div>;
return <>
<div className="loadclass-new">
  <div className="spinner-box">
<div className="configure-border-1">  
  <div className="configure-core"></div>
</div>  
<div className="configure-border-2">
  <div className="configure-core"></div>
</div> 
</div>
</div>
</>;  }

  return (
    <ThemeProvider theme={theme}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
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
        <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
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
          <FormControlLabel
            control={<Checkbox id="remember" value="remember" color="primary" />}
            label="Remember me"
          /><br/>
          {error && <><div style={{ color: 'red', textAlign: 'center', fontSize: '15px' }}>{error}</div></>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            LogIn
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  </ThemeProvider>
  );
  // return (
  //   <div>
    
  //   <div className="background">
  //       <div className="shape"></div>
  //       <div className="shape"></div>
  //   </div>

  //   <form className='glass-container login'>
  //       <h3 className='brand-titl'>Metro AFC</h3>

  //       <label>Username</label>
  //       <input type="text" placeholder="Email or Phone" id="username" {...username} autoComplete="new-password" />

  //       <label>Password</label>
  //       <input type="password" placeholder="Password" id="password" {...password} autoComplete="new-password" />
  //       {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
  //       <input type="button" value={loading ? 'Loading...' : 'LOGIN'} onClick={handleLogin} disabled={loading} />
        
  //   </form>
  //   </div>
  // );
}

export default Login;