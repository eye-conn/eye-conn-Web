import CloudUpload from '@mui/icons-material/CloudUpload'
import { Alert, Backdrop, Button, Checkbox, Chip, CircularProgress, Container, FormControlLabel, Grid, Paper, Slide, Snackbar, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { getToken } from '../Utils/Common'

function Account(props) {
    const [account, setAccount] = useState({name: "", username: "", telegramId: ""})
    const [msgOpen, setMsgOpen] = useState(false)
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        setLoading(false)
        axios.post(`${process.env.REACT_APP_HOST}/fetch/account`, {token: getToken()}).then(response => {
            setLoading(false)
            setAccount(response.data)
        }).catch(error => {
            setLoading(false)
            if (error.response.status === 401) {
                props.history.push('/login')
            } else {
                console.log(error)
            }
        })
    }, [props.history])

    const handleClick = (e) => {
        e.preventDefault()
        setLoading(true)
        axios.post(`${process.env.REACT_APP_HOST}/update/account`, {token: getToken()}).then(response => {
            setLoading(false)
            setMsgOpen(true)
        }).catch(error => {
            setLoading(false)
            if (error.response.status === 401) {
                props.history.push('/login')
            } else {
                console.log(error)
            }
        })
    }


    if (loading) {
        return <>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        </>;  } 


  return (
    <>

        <Box sx={{ padding: 1 }}>
          <Slide direction="left" in={true} mountOnEnter unmountOnExit>

          <Paper
  sx={{
    p: 2,
    display: 'flex',
    flexDirection: 'column',
    height: '78vh',
    alignItems: 'center',
  }}
>
          <Box sx={{ mt: 0,height: '78vh', maxWidth: '80vh' }}>
          <Typography variant="h4" gutterBottom>
        Account
      </Typography>
      <Grid container spacing={3} direction="row"
    marginTop={1}
  alignItems="center"
  justify="center"
>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="name"
            name="name"
            label="Full Name"
            fullWidth
            autoComplete="given-name"
            value={account?.name}
            onChange={e => setAccount({...account, name: e.target.value})}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="username"
            name="username"
            label="Username"
            fullWidth
            autoComplete="username"
            disabled
            value={account?.username}
            onChange={e => setAccount({...account, username: e.target.value})}
          />
        </Grid>
        
        <Grid item xs={8} margin='auto' >
          <TextField
            required
            id="telegramId"
            name="telegramId"
            label="Telegram Chat ID"
            disabled
            fullWidth
            autoComplete="telegram"
            // value={account?.telegramId}
            onChange={e => setAccount({...account, telegramId: e.target.value})}
          /> 
        </Grid>
        <Grid item xs={4} margin='auto' >
            {account?.telegramId ? <Chip label="Connected" color="success" /> : <Chip label="Not Connected" color="error" />}
        </Grid>
        <Grid item xs={12}>
          <Button 
            variant="contained"
            component="label"
            startIcon={<CloudUpload />}
            onClick={handleClick}
            >
                Update
            </Button>
        </Grid>
      </Grid>
                </Box>
                </Paper>
                </Slide>
                </Box>
                <Snackbar open={msgOpen} autoHideDuration={2000} onClose={()=>{setMsgOpen(false)}} >
          <Alert  severity="success" sx={{ width: '100%' }} onClose={()=>{setMsgOpen(false)}}>
            Saved Succesfully
          </Alert>
        </Snackbar >
    </>
  )
}

export default Account;