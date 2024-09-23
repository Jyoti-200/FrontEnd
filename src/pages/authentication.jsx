import React, { useContext, useState } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from "../contexts/AuthContext";
import { Snackbar } from "@mui/material";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Authentication() {

const [username, setUsername] = useState();
const [password, setPassword] = useState();
const [name, setName] = useState();
const [error, setError] = useState();
const [message, setMessage] = useState();

const [formState, setFormState] = useState(0);

const [open, setOpen ] = useState(false);

const {handleRegister, handleLogin} = useContext(AuthContext);

let handleAuth = async () => {
    try {
        if (formState === 0) { // Login
            let result = await handleLogin(username, password);
            console.log(result);
            setMessage(result);
            setOpen(true);
        }
        if (formState === 1) { // Register
            let result = await handleRegister(name, username, password);
            console.log(result);
            setUsername("");
            setMessage(result);
            setOpen(true);
            setError("");
            setFormState(0);
            setPassword("");
        }
    } catch (err) {
        console.log(err);
        let message = (err.response && err.response.data && err.response.data.message) 
                        ? err.response.data.message 
                        : "An error occurred.";
        setError(message);
    }
};


  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>

            
            <div>
                <Button variant={formState === 0 ? "contained": ""} onClick={ () => {setFormState(0)}}>Sign In</Button>
                <Button variant={formState === 1 ? "contained": ""} onClick={ () => {setFormState(1)}}>Sign Up</Button>
            </div>
            
            <Box component="form" noValidate  sx={{ mt: 1 }}>
                {formState === 1 ? 
            <TextField
                margin="normal"
                required
                fullWidth
                id="fullname"
                label="Full Name"
                name="fullname"
                value={name}
                autoComplete="fullname"
                autoFocus
                onChange={(e)=>setName(e.target.value)}
              /> : <></> }
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                value={username}
                autoComplete="username"
                autoFocus
                onChange={(e)=>setUsername(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                value={password}
                type="password"
                id="password"
                onChange={(e)=>setPassword(e.target.value)}
              />
              
              <p style={{color:"red"}}>{error}</p>

              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleAuth}
              >
                {formState === 0 ? "Login" : "Register"}
        
              </Button>
            </Box>
            </Box>
        </Grid>
      </Grid>

      <Snackbar 
      
      open={open}
      autoHideDuration={4000}
      message={message} 

      />


    </ThemeProvider>
  );
}
//https://github.com/mui/material-ui/blob/v5.15.7/docs/data/material/getting-started/templates/sign-in-side/SignInSide.js